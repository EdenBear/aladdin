<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;
// +----------------------------------------------------------------------
// | Date:2016年3月5日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class ProcategoryController extends AdminController{
    public function index(){
        
        $this->meta_title = '编辑分类';
        $this->display();
    }
    
    //获取目录树的节点数据
    public function getCateTree(){
        $proCateModel = M('ProductCategory','','DB_PRODUCT');
        $allData = $proCateModel->select();
        foreach ($allData as $key=>$value){

            $data[$key]=array(
                'id'=>$value['id'],
                'name'=>$value['classname'],
                'pId'=>$value['parentid'],
                'open'=>true
            );
            
        }

        $this->ajaxReturn($data);
    }

    public function addCateNode($addNodes){
        dump($addNodes);
    }
}