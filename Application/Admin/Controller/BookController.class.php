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
 * 订单控制器
 * @author 麦当苗儿 <glghan@sina.com>
 */

class BookController extends AdminController {
	
	 //订单列表
     public function index(){
            $list = $this->lists('Book',array('module'=>'book','status'=>['egt',0]),'id asc');
            $list = int_to_string($list);
            
            $this->assign( '_list', $list );
            $this->assign( '_use_tip', true );
            $this->meta_title = '订单管理';
            $this->display();
        }
    
    /**
     * 订单设置页面
     * 
     * date:2016年2月23日
     * author: EK_熊
     */
	public function shezhi(){
	    
	    if ($_POST){
	        
	    }
	    
	    $this->meta_title = '订单设置';
	    $this->display();
	}
	
}
