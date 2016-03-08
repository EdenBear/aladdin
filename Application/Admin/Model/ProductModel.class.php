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
    function getOneProByid($proid){
        
            $map_pro['ID'] = $proid;
            $product = $this->where($map_pro)->find();
        
            /*获取图片*/
            $map_img['productID'] = $proid;
            $map_img['status'] = 'OK#';
            $product['img'] = M('ProductImg','','DB_PRODUCT')->where($map_img)->field('imgPos,imgPath')->select();
            foreach ($product['img'] as $key=>$val){
                $product['img'][$key]['imgpath'] = qiniu_private_url($val['imgpath']);
            }
            /*获取供应商*/
            //TODO
            /*获取分类*/
            $map_cate['ID'] = $product['categoryid'];
            $product['category'] = M('ProductCategory','','DB_PRODUCT')->where($map_cate)->field('ID,className')->find();
        
            /*获取sku*/
            
            /* 商品描述*/
            $map_detail['productID'] = $proid;
            $product['detail'] = M('ProductDetail','','DB_PRODUCT')->where($map_detail)->getField('productDesc');
            
            /*上架平台*/
            $product['platform'] = explode(',',$product['platform']);
            foreach ($product['platform'] as $key =>$val){
                $platform[$val] = true; 
                $product['platform'] = $platform;
            }
//             dump($product);exit();
            return $product;
        }      
    }
