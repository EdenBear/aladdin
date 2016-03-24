<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;
use Think\Model;
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
//             $join = array('t_freight_tpl_except except ON except.freightTplID = tpl.ID');
//             $m = M('FreightTpl','','DB_PRODUCT')->alias('tpl')->join($join)->field('except.id,tpl.freightname')->select();
//             dump($m);
//         $data=array(
//             array(
//                 'name'=>'nanaa',
//                 'id'=>'1',
//             ),

//         );
//         $field 		= array('name','id');
//         $cellfield 	= array('姓名','编号');
//         $title 		= "_卡券数据.xlsx";
//         excel_output($data, $field, $cellfield, $title);

//         $where["ID"] = 0;

//             $j = 50001;
//             for ($i=0;$i<50000;$i++){
//                 $add[$i] = array(
//                     'name'=>'傻逼-'.$j++,
//                 );
//             }
//             $data = $orModel->addAll($add);


            
    }

    
}