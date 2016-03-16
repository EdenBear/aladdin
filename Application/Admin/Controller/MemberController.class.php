<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: han <han@163.com>
// +----------------------------------------------------------------------

namespace Admin\Controller;

/**
 * 管理控制器
 * @author han <glghan@sina.com>
 */
class MemberController extends AdminController{
	
	/**
	 * 会员列表
	 * @author han <glghan@sina.com>
	 */
	public function index(){
		$nickname = I('nickname');
        if(!empty($nickname)){
            $map['u.nickName']    =   array('like', '%'.(string)$nickname.'%');
        }
        $mobile_num = I('mobile');
        if(!empty($mobile_num)){
            $map['u.mobileNum']    =   array('like', '%'.(string)$mobile_num.'%');
        }
        $sort = I('sort');
        if($sort != 'all'&&$sort != ''){
        	var_dump($sort);exit;
        	$map['u.sort'] = array('like','%'.(string)$sort.'%');
        }
        

        $prefix = C('DB_PREFIX');
        $model = M()->db(2,'DB_CONFIG2')->table($prefix.'user u')
                    ->join($prefix.'wx_user ua on ua.mqID = u.id','left');
        $list   = $this->lists($model, $map,'','u.*,ua.openid,ua.country');
        $this->assign('_list', $list);
        //$this->assign('detail',$detail);
        $this->meta_title = '会员列表';
        $this->display();
	}
	
	/**
	 * 我的团队
	 * @author ghan <glghan@sina.com>
	 */
	public function myTeam(){
		$tree = D('fxyq_vertical_relation')->getTree(0,'id,distributionUserId,parentDistributionUserId,insertTime');
		//var_dump($tree);exit();
		$request    =   (array)I('request.');
		$total      =   $tree? count($tree) : 1 ;
		$listRows   =   C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
		$page       =   new \Think\Page($total, $listRows, $request);
		$tree       =   array_slice($tree, $page->firstRow, $page->listRows);
		$p          =   $page->show();
		//var_dump($tree);exit();
		$this->assign('_page', $p? $p: '');
		$this->assign('tree', $tree);
        C('_SYS_GET_CATEGORY_TREE_', true); //标记系统获取分类树模板
        $this->meta_title = '我的团队';
        $this->display();
	}
	
	public function team($pid=0){
		if(IS_POST){
			$pid = I('post.pid');
			//var_dump($pid);exit();
		}
		$data = M('fxyq_vertical_relation','','DB_CONFIG3')->table('t_fxyq_vertical_relation f,aladdin_product_sku_user.t_user u')
        ->field('f.id,f.level,f.isleaf,f.distributionUserId,f.parentDistributionUserId,f.insertTime,u.mobileNum,u.nickName')
        ->where('u.mqID=f.distributionUserId and parentDistributionUserId='.$pid)->select();
		
		$request    =   (array)I('request.');
		$total      =   $data? count($data) : 1 ;
		$listRows   =   C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
		$page       =   new \Think\Page($total, $listRows, $request);
		$lists       =   array_slice($data, $page->firstRow, $page->listRows);
		$p          =   $page->show();
		//var_dump($lists);exit();
		$this->assign('_page', $p? $p: '');
		$this->assign('lists', $lists);
		
		$this->display();
	}
	
	public function getChild(){
		if(IS_POST){
			$pid = I('post.pid');
			$lastid = I('post.lastid');
			//var_dump($lastid);exit();
		}
		$data = M('fxyq_vertical_relation','','DB_CONFIG3')->table('t_fxyq_vertical_relation f,aladdin_product_sku_user.t_user u')
		->field('f.id,f.level,f.isleaf,f.distributionUserId,f.parentDistributionUserId,f.insertTime,u.mobileNum,u.nickName')
		->where('u.mqID=f.distributionUserId and parentDistributionUserId='.$pid)->limit($lastid.',5')->select();
		//var_dump($data);exit();
		echo json_encode($data);
	
	}
	
}