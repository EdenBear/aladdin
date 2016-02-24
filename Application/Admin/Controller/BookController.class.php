<?php
// +----------------------------------------------------------------------
// | Date:2016年2月23日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 订单控制器
// +----------------------------------------------------------------------

namespace Admin\Controller;

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
	public function config(){
	    $label = 'book_cfg';
	    
	    if ($_POST){
	       $configAry = array(
	           'auto_rece_time' => I('post.auto_rece_time'),
	           'auto_close_time' => I('post.auto_close_time'),
	           'return_condi' => I('post.return_condi'),
	           'return_time' => I('post.return_time'),
	           'exchange_condi' => I('post.exchange_condi'),
	           'exchange_time' => I('post.exchange_time'),
	           'commission_rate'=>I('post.commission_rate')
	       ); 
	       $setRet = set_config_common($label,$configAry);
	       if ($setRet) {
	           $this->success('保存成功！',U(''));
	       }
	    }
	    
	    /*订单自动关闭时间 选项*/
	    $type['auto_close_time'] = array(
	        '1小时' =>switchToSecond('hour',1),
	        '1天' =>switchToSecond('day',1),
	        '3天' =>switchToSecond('day',3),
	        '7天' =>switchToSecond('day',7),
	        '30天' =>switchToSecond('day',30),
	        '永不关闭' =>'no',
	    );
	    /*自动收货时间 选项*/
	    $type['auto_rece_time'] = array(
	        '3天' =>switchToSecond('day',3),
	        '5天' =>switchToSecond('day',5),
	        '7天' =>switchToSecond('day',7),
	        '15天' =>switchToSecond('day',15),
	        '30天' =>switchToSecond('day',30),
	    );
	    $condi = C('STU_BOOK');
	    $bookCfg = get_config_common($label);
	    $this->meta_title = '订单设置';
	    $this->assign('bookCfg',$bookCfg);
	    $this->assign('type',$type);
	    $this->assign('condi',$condi);
	    $this->display();
	}
	
}
