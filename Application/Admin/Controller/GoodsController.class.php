<?php
// +----------------------------------------------------------------------
// | Date:2016年2月25日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于 商品管理控制器
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Admin\Controller\AdminController;
class GoodsController extends AdminController{
 
    /**
     * 商品列表页
     * date:2016年2月25日
     * author: EK_熊
     */
    public function index(){
        $this->meta_title = '商品管理';
        $this->display();
    }
    
    /**
     * 商品规格
     * date:2016年2月25日
     * author: EK_熊
     */
    public function norms(){
        
        $this->meta_title = '商品规格';
        $this->display();        
    }
    
    public function attr(){
        $values[]= array(
            'id'=>1,
            'name'=>1,
            'checked'=>false,
        );
        $values[]= array(
            'id'=>2,
            'name'=>2,
            'checked'=>false,
        );
//         $values[]= array(
//             'id'=>3,
//             'name'=>3,
//             'checked'=>false,
//         );
//         $values[]= array(
//             'id'=>4,
//             'name'=>4,
//             'checked'=>false,
//         );
        
        $data[] = array(
            'id'=>1,
            'name'=>'小白',
            'value'=>'',
            'values'=>$values,
            
        );
        $data[] = array(
            'id'=>2,
            'name'=>'小白2',
            'value'=>'',
            'values'=>$values,
        
        );
        $attr = '[{"id":1,"name":"小白","value":"","values":[{"id":1,"name":"1","checked":false,"$$hashKey":"008"},{"id":2,"name":"2","checked":false,"$$hashKey":"009"},{"id":3,"name":"3","checked":false,"$$hashKey":"00A"}],"$$hashKey":"006"},{"id":1,"name":"小黑","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false}],"$$hashKey":"006"},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"你好","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"是","checked":false},{"id":3,"name":"的","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"不","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"不","checked":false},{"id":2,"name":"呃","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黑","checked":false},{"id":2,"name":"蓝","checked":false},{"id":3,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":"11","name":"5555","value":"","values":[{"id":3,"name":"12","checked":false}]}]';
        
        $this->ajaxReturn($data);
    }
    public function saveAttr(){
        $sttr = array(
            '1-4' =>array (
                'key' =>  '1-4' ,
                'name' =>  '颜色:白,尺寸:22' ,
                'price' =>  '0.0' ,
                'supply_price' =>  '0.0' ,
                'quantity' =>  '50' 
                ),
            '1-3' =>array(
                'key' => '1-3' ,
                'name' =>  '颜色:白,尺寸:21' ,
                'price' =>  '0.0' ,
                'supply_price' =>  '0.0' ,
                'quantity' =>  '50' ,
            ),
            );

        
        $attrCombin = I('attrCombin');
        $attrVal = I('attrVal');
        dump($attrCombin);
        dump($attrVal);
    }
    
    
    
    
    /**
     * 商品属性入库
     * @author han <glghan@sina.com>
     */
    public function addAttr(){
        //商品id(唯一)
        $productID = 7;
        //操作员id
        $uid = 24;
        //属性及属性值数据
//         $attr = array(
//             '颜色'=>array('白'),
//             '尺寸'=>array(21,22)
//         );
    
//         //sku数据
//         $sttr = array(
//             '1-4' =>array (
//                 'key' =>  '1-4' ,
//                 'name' =>  '颜色:白,尺寸:22' ,
//                 'price' =>  '0.0' ,
//                 'supply_price' =>  '0.0' ,
//                 'quantity' =>  '50'
//             ),
//             '1-3' =>array(
//                 'key' => '1-3' ,
//                 'name' =>  '颜色:白,尺寸:21' ,
//                 'price' =>  '0.0' ,
//                 'supply_price' =>  '0.0' ,
//                 'quantity' =>  '50' ,
//             ),
//         );
        $attr = I('attrVal');
        $sttr = I('attrCombin');
        foreach($sttr as $k=>$v){
            $name = $sttr[$k]['name'];
            $name = explode(',',$name);
            foreach ($name as $k1=>$v1){
                $attrValue = explode(':',$name[$k1]);
                $attrName = $attrValue[0];
                $value1 = $attrValue[1];
                $newAttr[$attrName] = $value1;
            }
            $sttr[$k]['name'] = $newAttr;
        }
    
        //导入属性
        foreach ($attr as $k=>$v){
            //构建数据
            $data['attrName'] = $k;
            $data['productID'] = $productID;
            $data['sortOrder'] = 0;
            $data['uid'] = $uid;
            $data['createTime'] = date('Y-m-d H:i:s',time());
            	
            $attrID = M('Product_attr')->add($data);
            	
            //导入属性值
            if($attrID){
                foreach ($v as $k1=>$v1){
                    //构建数据
                    $value['attrValue'] = $v1;
                    $value['attrID'] = $attrID;
                    $value['uid'] = $uid;
                    $value['sortOrder'] = 1;
                    $value['createTime'] = date('Y-m-d H:i:s',time());
                    	
                    $attrValueID = M('Product_attr_value')->add($value);
    
                    if(!$attrValueID){
                        return  M('Product_attr_value')->getError();
                    }
                }
            }else{
    
                return  M('Product_attr')->getError();
            }
        }
    
        //导入sku
        foreach ($sttr as $k=>$v){
            //构建数据
            $skuData['productID'] = $productID;
            $skuData['uid'] = $uid;
            $skuData['applyPrice'] = $sttr[$k]['supply_price'];
            $skuData['skuPrice'] = $sttr[$k]['price'];
            $skuData['skuStock'] = $sttr[$k]['quantity'];
            $skuData['createTime'] = date('Y-m-d H:i:s',time());
            	
            $skuID = M('Product_sku')->add($skuData);
            	
            //导入sku_attr
            if($skuID){
                foreach ($v['name'] as $k1=>$v1){
                    /*构建数据*/
                    $skuAttr['skuID'] = $skuID;
                    $skuAttr['uid'] = $uid;
                    $skuAttr['sortOrder'] = 3;
                    $skuAttr['createTime'] = date('Y-m-d H:i:s',time());
                    //获取attrID及attrValueID
                    $attriBute = M('Product_attr')->where('productID='.$productID.' and attrName='."'{$k1}'")
                    ->select();
                    $skuAttr['attrID'] = $attriBute[0]['id'];
                    $attriButeValue= M('Product_attr_value')->where('attrID='.$skuAttr['attrID'].' and attrValue='."'{$v1}'")
                    ->select();
                    $skuAttr['attrValueID'] = $attriButeValue[0]['id'];
    
                    $skuAttrID = M('Product_sku_attr')->add($skuAttr);
                    if(!$skuAttrID){
                        $error = M('Product_sku_attr')->getError();
                    }
                }
            }else {
                $error = M('Product_sku')->getError();
            }
        }
       
    }    
    
    
}