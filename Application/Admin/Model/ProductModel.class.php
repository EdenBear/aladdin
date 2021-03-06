<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月8日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于商品模型，相关的逻辑处理
// +----------------------------------------------------------------------
class ProductModel extends Model{
    protected $connection = 'DB_PRODUCT';


    /**
     * 获取商品基础信息，单条记录
     * @param unknown $proid
     * @return Ambigous <boolean, mixed, NULL, string, unknown, multitype:, object>
     * date:2016年3月12日
     * author: EK_熊
     */
    function getOneProByid($proid){
        
            $map_pro['ID'] = $proid;
            $product = $this->where($map_pro)->find();
        
            /*获取图片*/
            $map_img['productID'] = $proid;
            $map_img['status'] = 'OK#';
            $product['img'] = M('ProductImg','','DB_PRODUCT')->where($map_img)->field('ID,imgPos,imgPath')->select();
            foreach ($product['img'] as $key=>$val){
                $product['img'][$key]['qiniurul'] = qiniu_private_url($val['imgpath']);
                
            }

            /*获取分类*/
            $map_cate['ID'] = $product['categoryid'];
            $product['category'] = M('ProductCategory','','DB_PRODUCT')->where($map_cate)->field('ID,className')->find();
        
            /* 商品描述*/
            $map_detail['productID'] = $proid;
            $product['detail'] = M('ProductDetail','','DB_PRODUCT')->where($map_detail)->getField('productDesc');
            
            /*上架平台*/
            $product['platform'] = explode(',',$product['platform']);
            foreach ($product['platform'] as $key =>$val){
                $platform[$val] = true; 
                $product['platform'] = $platform;
            }
            
            /* 运费模板 */
            $product['freight'] = $this->freightByProid($proid);

            return $product;
        } 
        
        /**
         * 根据商品id，获取运费模板id
         * @param unknown $proId
         * @return NULL|string
         * date:2016年3月16日
         * author: EK_熊
         */
        function freightByProid($proId){
            $map['productID'] = $proId;
            $join = array('t_freight_tpl ON t_freight_tpl.ID = t_product_freight.freightTplID');
            $freight = M('ProductFreight','','DB_PRODUCT')->join($join)->where($map)->field('freighttplid,freighttype')->find();//运费模板id
            if (!$freight) {
                return null;
            }
            if ($freight['freighttype'] == 'NOT') {//包邮
                $ret = 'NOT';
            }else{
                $ret = $freight['freighttplid'];
            }
            return $ret;
        }
        
        /**
         * 更新商品基础信息
         * @param unknown $proInfo
         * @return boolean
         * date:2016年3月12日
         * author: EK_熊
         */
        function updateProInfo($proInfo){
            
            $proCateModel = M('ProductCategory','','DB_PRODUCT_CATEGORY');
            $proImgModel = D('ProductImg');
            $proDetailModel = M('ProductDetail','','DB_PRODUCT');

            $proId = $proInfo['id'];
            
            $ret['status'] = false;
            $this->startTrans();
            do{
                /* 更新product表*/
                $pro_map['ID'] = $proId;
                $update_info = array(
                    'productCode'   =>$proInfo['procode'],
                    'sellDesc'      =>$proInfo['selldesc'],
                    'shortName'     =>$proInfo['shortname'],
                    'productName'   =>$proInfo['fullname'],
                    'supplyID'      =>$proInfo['supplier'],
                    'price'         =>mony_format($proInfo['price'],'ten'),   //TODO转换单位分
                    'applyPrice'    =>mony_format($proInfo['applyprice'],'ten'),   //TODO转换单位分
                    'weight'        =>weight_format($proInfo['weight'],'g'),//TODO转换单位克存放
                    'limitCount'    =>$proInfo['limitCount'],
                    'status'        =>$proInfo['status'],
                    'platform'      =>$proInfo['platform'],
                    'updateTime'    =>CURTIME,
                    'categoryID'    =>$proInfo['cateid'],
                    'freightTpl'    =>$proInfo['freightTpl'],//运费
                );
//                 dump($update_info);
//                 dump($pro_map);
//                 exit();
                $updatePro = $this->where($pro_map)->save($update_info);
                
                if (!$updatePro) {
                    $ret['info'] = 'product表更新失败！';
                    break;
                }
                /* 更新detail表*/
                $where['productID'] = $proId;
                $update_detail = array(
                    'productDesc'  => $proInfo['desc'],
                    'updateTime'   => CURTIME,
                );
                $updateDetail =$proDetailModel->where($where)->save($update_detail);
                if (!$updateDetail) {
                    $ret['info'] = 'productDetail表更新失败！';
                    break;                  
                }
                
                /* 更新img 表*/
                $updateImg = $proImgModel->updateProImg($proInfo['img'],$proId);
                if (!$updateImg) {
                    $ret['info'] = '商品图片更新出错';
                    break;
                }
                //保存运费信息
                $proFreight = $this->updateFreightTpl($proInfo['freightTpl'],$proId,$proInfo['supplier']);
                if (!$proFreight) {
                    $ret['info'] = '运费模板数据处理异常！';
                    break;
                }                
                $ret['info'] = '商品更新成功！';
                $ret['status'] = true;
            }while(false);
            if ($ret['status']) {
                $this->commit();
            }else{
                $this->rollback();
            }
            return $ret;
        }
        
        /**
         * 更新商品属性，操作过滤器，区分哪些是需要创建，哪些是需要更新字段
         * @param unknown $attr
         * @param unknown $sku
         * @param unknown $proId
         * @return boolean
         * date:2016年3月12日
         * author: EK_熊
         */
        function updateProAttr($attr,$sku,$proId){
            $skuModel = M('ProductSku','','DB_PRODUCT');
            $attrModel = D('ProductAttr');
            unset($_SESSION['updateProAttr']);//由于开启了事务，一些已经操作过的attr的数据没能及时入库，必须借用session来存放

            $ret['status'] = true;
            $attrModel->deleteSku($proId);//屏蔽过期的sku数据操作
            /* 过滤整理来源sku数据*/
            foreach ($sku as $key => $value) {
                
                $sku_map['key'] = $key;
                $skuIsExist = $skuModel->where($sku_map)->find();
                if (!$skuIsExist) {
                    
                    $createAttr = $attrModel->createProAttr($value,$proId);
                    if (!$createAttr['status']) {//不存在该key值，进行新增sku数据
                        $ret['info'] = '【更新商品属性】创建attr数据出错：'.$createAttr['info'];
                        $ret['status'] = false;
                        break;
                    }
                    $skuIdList_new[] = $key;
                }else{//页面传进来的key对应的数据都存在，即进入更新字段环节
                    $updateProAttr = $attrModel->updateProAttr($key,$proId,$value);
                    
                    if (!$updateProAttr['status']) {//存在该key，进行更新sku数据
                        $ret['info'] ='【更新商品属性】字段更新出错：' .$updateProAttr['info'];
                        $ret['status'] = false;
                        break;
                    }                    
                }
            }
            
            return $ret;
        }
        /**
         * 更新运费模板，包含新增和更新字段操作
         * @param string $tplValue
         * @param string $proId
         * @param string $supplyId
         * date:2016年3月16日
         * author: EK_熊
         */
         function updateFreightTpl($tplValue,$proId,$supplyId){
            $freightTplModel = M('FreightTpl','','DB_PRODUCT');
            $proFretightModel = M('ProductFreight','','DB_PRODUCT');
            if ($tplValue == 'NOT') {//包邮
                $freTpl_map['freightType'] ='NOT';
                $freightTplId = $freightTplModel->where($freTpl_map)->getField('ID');
        
            }else{
                $freightTplId = $tplValue;//非包邮模式，记录模板id
            }
        
        
            //添加前，检查profreight表，该商品的运费记录是否存在
            $proFe_map['productID'] = $proId;
            $proFreightData = $proFretightModel->where($proFe_map)->find();
            if ($proFreightData['freighttplid'] !== $freightTplId) { //进来的数据和在库的freight id 不一致才进行表操作
                if ($proFreightData){//存在进行更新
                    $save_profe['freightTplID']=$freightTplId;
                    $save_profe_map['ID'] = $proFreightData['id'];
        
                    $ret = $proFretightModel->where($save_profe_map)->save($save_profe);
        
                }else{//不存在，新增
                    $add = array(
                        'productID' => $proId,
                        'freightTplID'=>$freightTplId,
                        'status'      =>'OK#',
                        'uid'=>UID,
                        'supplyID'=>$supplyId,
                        'createTime'=>CURTIME,
                    );
                    $ret = $proFretightModel->add($add);
                }
            }else{
                return true;
            }
            return $ret;
        
        }       

   
        
    }
