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

        
        $attr = I('attrobj');
        dump($attr);
    }
    
}