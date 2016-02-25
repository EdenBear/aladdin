<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Admin\Controller;

/**
 * 商品管理控制器
 * @author 麦当苗儿 <glghan@sina.com>
 */

class GoodsController extends AdminController{
	
	//商品列表
	public function index(){
		//实例化模型
		$goods = M('goods');
		//获取商品列表
		$list = $goods->select();
		//分配变量到模板
		$this->assign('list',$list);
		$this->display();
	}
	
	//添加商品
	public function add(){
		if(IS_POST){
			$goods = D('goods');
			if($goods->create()){
				if($goods->add()){
					$this->success('添加商品成功',U('lit'));
					exit();
				}else{
					$this->error('添加商品失败');
				}
			}
		}
		
		//获取分类信息
		$cates = M('category')->select();
		$cates = D('Common/Tree')->toFormatTree($cates);
		$cates = array_merge(array(0=>array('id'=>0,'title_show'=>'顶级分类')),$cates);
		
		$cate_list = array();
		foreach ($cates as $cate){
			$cate_list[$cate['id']] = $cate['title_show'];
		}
		$this->assign('$cates',$cate_list);
		$this->meta_title = '添加商品';
		$this->display();
		
		
	}
	
	//编辑商品
	public function edit($id=0){
		
		if(IS_POST){
			$goods = D('goods');
			if($goods->create()!==false){
				if($goods->save()!==false){
					$this->success('处理成功',U('index'),1);
					exit();
				}else {
					$this->error('处理失败');
				}
			}else{
				$goods->getError();
			}
		}
		
		//获取分类信息
		$cates = M('category')->select();
		$cates = D('Common/Tree')->toFormatTree($cates);
		$cates = array_merge(array(0=>array('id'=>0,'title_show'=>'顶级分类')),$cates);
		
		$cate_list = array();
		foreach ($cates as $cate){
			$cate_list[$cate['id']] = $cate['title_show'];
		}
		$this->assign('$cates',$cate_list);
			
		//获取商品信息
		$list = M('goods')->where('goods_id = '.$id)->select();
		$this->assign('list',$list);
		$this->meta_title = '编辑商品';
		$this->display();
	}
	
}