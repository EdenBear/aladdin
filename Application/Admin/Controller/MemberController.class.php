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
		$type = I('type');
		if(!empty($type)){
			$status = 1;
			$map[$type]    =   array('like', '%'.(string)$status.'%');
		}
		
		$nickname = I('nickname');
        if(!empty($nickname)){
            $map['u.nickName']    =   array('like', '%'.(string)$nickname.'%');
        }
        $mobile_num = I('mobile');
        if(!empty($mobile_num)){
            $map['u.mobileNum']    =   array('like', '%'.(string)$mobile_num.'%');
        }
        

        $prefix = C('DB_PREFIX');
        $model = M()->db(2,'DB_PRODUCT')->table($prefix.'user u')
                    ->join($prefix.'wx_user ua on ua.mqID = u.mqID','left')
                    ->join('aladdin_account.t_account_cash a on a.mqId=u.mqID','left')
        			->join('aladdin_other.t_fxyq_vertical_relation f on f.distributionUserId=u.mqID','left');
        $list   = $this->lists($model, $map,'','u.*,ua.openid,ua.country,f.parentDistributionUserId,f.level,a.remainingSum,a.frozenSum');
        //var_dump($li.st);exit();
        $this->assign('_list', $list);
        
        $this->meta_title = '会员列表';
        $this->display();
	}
	
	/**
	 * 获取上一级
	 * @author ghan <glghan@sina.com>
	 */
	public function getParent(){
		$pid = I('post.pid');
			if($pid!=0){
			$data= M('fxyq_vertical_relation','','DB_CONFIG3')->field('distributionUserId')
			->where('id='.$pid)->select();			
			$mqID = $data[0]['distributionuserid'];			
			$parent = M('user','','DB_PRODUCT')->field('nickName')->where('mqID='.$mqID)->select();
			echo json_encode($parent);
		}else{
			echo json_encode(null);
		}
	}
	
	/**
	 * 我的团队
	 * @author ghan <glghan@sina.com>
	 */
	public function team($pid=0){
		if(IS_POST){
			$pid = I('post.pid');
		}
		$data = M('fxyq_vertical_relation','','DB_CONFIG3')->table('t_fxyq_vertical_relation f,aladdin_product_sku_user.t_user u')
        ->field('f.id,f.level,f.isleaf,f.distributionUserId,f.parentDistributionUserId,f.insertTime,u.mobileNum,u.nickName')
        ->where('u.mqID=f.distributionUserId and parentDistributionUserId='.$pid)->select();
		//var_dump($data);exit();
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
	
	/**
	 * 分页读取会员记录
	 * @author ghan <glghan@sina.com>
	 */
	public function getChild(){
		if(IS_POST){
			$pid = I('post.pid');
			$page = I('post.page');
		}
		$data = M('fxyq_vertical_relation','','DB_CONFIG3')->table('t_fxyq_vertical_relation f,aladdin_product_sku_user.t_user u')
		->field('f.id,f.level,f.isleaf,f.distributionUserId,f.parentDistributionUserId,f.insertTime,u.mobileNum,u.nickName')
		->where('u.mqID=f.distributionUserId and parentDistributionUserId='.$pid)->page($page.',10')->select();
		//var_dump($data);exit();
		echo json_encode($data);
	
	}
	
}