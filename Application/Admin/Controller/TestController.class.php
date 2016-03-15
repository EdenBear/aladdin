<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;
// +----------------------------------------------------------------------
// | Date:2016年2月23日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class TestController extends AdminController{
    
    public function index(){
//         $db1 = M('action')->limit(1)->select();
//         dump($db1);
        
//         $db2 = M('product','','DB_PRODUCT')->limit(2)->select();
//         dump($db2);
        
//         dump(weight_format('kg', 12));
//         dump(mony_format('yuan', 12));
        
//             $sql = "SELECT
//                     attr.productID,
//                     attr.attrName,
//                     attrValue.attrValue,
//                     attrValue.attrID,
//                     attrValue.ID as attrValueID,
//                     skuAttr.skuID
//                     FROM
//                     aladdin_product_sku_user.t_product_attr_value as attrValue
//                     LEFT JOIN aladdin_product_sku_user.t_product_attr as attr ON attr.ID = attrValue.attrID
//                     LEFT JOIN aladdin_product_sku_user.t_product_sku_attr as skuAttr ON attrValue.ID = skuAttr.attrValueID
//                     WHERE attrValue.ID IN (117,119,118,120,1111) AND attr.productID = 1
//                 ";
//             $ret = M('')->query($sql);
//             dump($ret);
//             $join = array('t_product_attr ON t_product_attr.ID = attrvalue.attrID');
//             $m = M('ProductAttrValue','','DB_PRODUCT')->alias('attrvalue')->table('t_product_attr')->join($join)->where('')->select();
//             dump($m);
        
//         $sku_AttrValueID_ary = M('ProductSkuAttr','','DB_PRODUCT')->where("skuID=97")->field('attrValueID')->select();
//         dump($sku_AttrValueID_ary);
//         for ($h=0;$h<count($sku_AttrValueID_ary);$h++) {
//             $skuKey .= $sku_AttrValueID_ary[$h]['attrvalueid']."-";
//         }

        $a1 = array('1','2','3');
        $a2 = array('2','3');
        dump(array_diff($a1,$a2));

    }
    
}