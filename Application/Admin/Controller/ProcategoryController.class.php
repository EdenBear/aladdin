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
        
        $checkId = I('checkid');

        $proCateModel = M('ProductCategory','','DB_PRODUCT_CATEGORY');
        $map['status'] = 'OK#';
        $allData = $proCateModel->where($map)->select();
        foreach ($allData as $key=>$value){
            $cateID[] = $value['id'];
            $data[$key]=array(
                'id'=>$value['id'],
                'name'=>$value['classname'],
                'pId'=>$value['parentid'],
                'open'=>true      //展开节点
            );
            if ($checkId && $checkId == $value['id']){
                $data[$key]['checked'] = true;
            }
            
        }
        
        $img_map['categoryID'] = array('in',$cateID);
       //获取节点的图片信息
       $cateImg = M('ProductCategoryImg','','DB_PRODUCT')->where($img_map)->getField('categoryID,attrValueImg'); 
       foreach ($data as $key=>$val){
           $curNodeImg = $cateImg[$val['id']];
           $data[$key]['imgurl'] = $curNodeImg ? qiniu_private_url($curNodeImg) : '';
       } 
        $this->ajaxReturn($data);
    }

    //保存分类树
    public function addCateNode($nodes){

        $updateNodes = D('ProductCategory')->updateNode($nodes);

        $this->ajaxReturn($updateNodes);

    }
    
    
    public function updateNodeImg(){
        $nodeId = I('nodeid');
        $imgUrl = I('imgurl');
         
        $updateNodeImg = D('ProductCategory')->updateNodeImg($nodeId,$imgUrl);
        if ($updateNodeImg) {
            $this->success('图片保存成功！');
        }else{
            $this->error('图片保存失败！！');
        }
    }
    
    /**
     * 根据分类，展示数据表格
     * 
     * date:2016年3月14日
     * author: EK_熊
     */
    public function protable(){
        $cateid = I('cateid');
        if ($cateid) {
            $where['categoryID'] = $cateid;
            $proModel = M('Product','','DB_PRODUCT');;
            $proImgModel = M('ProductImg','','DB_PRODUCT');
            $_REQUEST['r'] = 1;
            $list = $this->lists ($proModel,$where,$order='createTime DESC',$field=true);
            //循环拼接供应商supplyname，图片主图{$item.imgmaj},分类categoryname
            $list = R('Goods/filterProData',array($list));
            $this->assign('_list',$list);
        }
        $this->display();
    }
}