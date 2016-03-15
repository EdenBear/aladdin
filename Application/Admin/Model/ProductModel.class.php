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
            /*获取供应商*/
            //TODO
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

            return $product;
        } 
        
        /**
         * 更新商品基础信息
         * @param unknown $proInfo
         * @return boolean
         * date:2016年3月12日
         * author: EK_熊
         */
        function updateProInfo($proInfo){
            
            $proCateModel = M('ProductCategory','','DB_PRODUCT');
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
                    'price'         =>mony_format($proInfo['price']),   //TODO转换单位分
                    'applyPrice'    =>mony_format($proInfo['applyprice']),   //TODO转换单位分
                    'weight'        =>weight_format($proInfo['weight'],'g'),//TODO转换单位克存放
                    'limitCount'    =>$proInfo['limitCount'],
                    'platform'      =>$proInfo['platform'],
                    'updateTime'    =>CURTIME,
                    'categoryID'    =>$proInfo['cateid'],
                );
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
        

   
        
    }
