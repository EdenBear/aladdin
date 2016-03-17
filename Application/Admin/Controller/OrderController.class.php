<?php
// +----------------------------------------------------------------------
// | Date:2016年3月16日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于 订单控制器
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Admin\Controller\AdminController;
class OrderController extends AdminController{
    public function index(){
        
        $this->meta_title = '订单列表';
        $this->display();
    }
    
    //普通订单
    public function index_normal(){
        
        $orderModel = D('Order');

        $where['parentID'] = 0;
//         $where['orderCode'] = '20160315033415532256';
        $parentOrderData = $this->lists($orderModel,$where,$order='createTime DESC',$field=true);//获取父订单的编号信息
        
        $list = $orderModel->getInfoList($parentOrderData);
// dump($list[0]['order'][0]['pro_ord_info']);

//分两种查询：1.条件是order主表存在的；2.商品自编号，数据只有一条，不需要分页；3.查询供应商姓名，由order_pro表入手，取orderid，作为条件
        $this->assign('list',$list);
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
            $commission_rate = I('post.commission_rate');
            $return_day = I('post.return_day');
            $exchange_day =I('post.exchange_day');
    
            if (!is_numeric($commission_rate) || empty($commission_rate)) $this->error('请输入订单佣金比例（格式是数字类型！）');
            if (!is_numeric($return_day) || empty($return_day)) $this->error('请输入可退货时间（格式是数字类型！）');
            if (!is_numeric($exchange_day) || empty($exchange_day)) $this->error('请输入可换货时间（格式是数字类型！）');
    
            $configAry = array(
                'auto_rece_time' => I('post.auto_rece_time'),
                'auto_close_time' => I('post.auto_close_time'),
                'return_condi' => I('post.return_condi'),
                'return_day' => $return_day,
                'exchange_condi' => I('post.exchange_condi'),
                'exchange_day' => $exchange_day,
                'commission_rate'=>$commission_rate
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