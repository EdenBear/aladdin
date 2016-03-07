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
        $cateid = I('cateid');
        
        $this->meta_title = '编辑分类';
        $this->display();
    }
    
    //获取目录树的节点数据
    public function getCateTree(){
        $proCateModel = M('ProductCategory','','DB_PRODUCT');
        $map['status'] = 'OK#';
        $allData = $proCateModel->where($map)->select();
        foreach ($allData as $key=>$value){

            $data[$key]=array(
                'id'=>$value['id'],
                'name'=>$value['classname'],
                'pId'=>$value['parentid'],
                'open'=>true      //展开节点
            );
            
        }

        $this->ajaxReturn($data);
    }

    //保存分类树
    public function addCateNode($nodes){

        $updateNodes = D('ProductCategory')->updateNode($nodes);

        $this->ajaxReturn($updateNodes);

    }
    
    
    public function protable(){
        $cateid = I('cateid');
        if ($cateid) {
            $where['categoryID'] = $cateid;
            $proModel = M('Product','','DB_PRODUCT');;
            $proImgModel = M('ProductImg','','DB_PRODUCT');
        
            $list = $this->lists ($proModel,$where,$order='createTime DESC',$field=true);
            //循环拼接供应商supplyname，图片主图{$item.imgmaj},分类categoryname
            $list = R('Goods/filterProData',array($list));
            $this->assign('_list',$list);
        }
        $this->display();
    }
}