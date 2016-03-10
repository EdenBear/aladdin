<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月8日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class ProductModel extends Model{
    protected $connection = 'DB_PRODUCT';

    //获取商品基础信息，单条记录
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
        
        //更新商品信息
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
        
        //更新商品属性
        function updateProAttr($attr,$sku,$proId){
            $skuModel = M('ProductSku','','DB_PRODUCT');
            $skuAttrModel = M('ProductSkuAttr','','DB_PRODUCT');
            $attrModel = D('ProductAttr');
            $attrValueModel = M('ProductAttrValue','','DB_PRODUCT');
            
            $ret['status'] = false;
            dump($attr);
            dump($sku);
            do{
                /* 更新attr表*/
                
                foreach ($attr as $key => $value){
                    //先检查属性名称是否存在，如果不存在要新增
                    $attrName = trim($key);
                    $attr_id = $attrModel->where(array('productID'=>$proId,'attrName'=>$attrName))->getField('ID');
                    if ($attr_id) {
                        $attrModel->updateAttr($attr_id,$attrName);
                    }else{
                        $attrModel->addAttr();
                    }
                }
                
                /* 更新attr value表*/
                
                /* 更新sku表*/
                foreach ($sku as $key => $value){
                    $map_sku['ID'] = $value['id'];
                    $save_sku = array(
                        'name' => $value['name'],
                        'skuPrice'=>$value['price'],
                        'applyPrice'=>$value['supply_price'],
                        'skuStock'=>$value['quantity'],
                        'updateTime'=>CURTIME,
                    );
                    $updateSku = $attrValueModel->where($map_sku)->save($save_sku);
                    
                    $attrValueIdAry = explode('-',$key);//attrValue id数组
                    
                    

                }
                
                
                /* 更新stock表 库存表*/
            }while(false);
            return $ret;
        }
        
   
        
    }
