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
        $search_day = I('search_day');
        $search_status = I('search_status');
        $dateStat = I('date_stat');
        $dateEnd = I('date_end');
        $keyword = I('keyword');
        $select = I('select');
        $where['parentID'] = 0;
        $orderModel = D('Order');
        
        switch ($search_status){
            case 'stu_all':       $where = array(); break;
            case 'stu_waitsend':  $where['shippingStatus'] = 'NOT'; break;
            case 'stu_waitpay':   $where['payStatus'] = 'NOT'; break;
            case 'stu_waitrece':  $where['shippingStatus'] = 'HAV'; break;
            case 'stu_complete':  $where['orderStatus'] = 'COM';break;
            case 'stu_close':     $where['orderStatus'] = 'CAN';break;
        }
        if ($dateStat && $dateEnd) $where['createTime'] = array('between',array($dateStat." 00:00:00",$dateEnd." 23:59:59"));

        if ($search_day){
            $search_day_stat = $search_day;
            $search_day_end = date('Y-m-d');
            $where['createTime'] = array('between',array($search_day_stat." 00:00:00",$search_day_end." 23:59:59"));
        }
        
        switch ($select){
            case 'ord_code' :      $where['orderCode'] = $keyword; break;
            case 'ord_rename' :    $where['recName'] = array('like',"%{$keyword}%"); break;
            case 'ord_remobile' :  $where['recMobile'] = $keyword; break;
            case 'pro_code' :     $selectProCode = true; break;

        }
        if ($selectProCode) {
            $where = array();
            $where['ID'] = $orderModel->getDataByProCode($keyword);
        }
        
        $parentOrderData = $this->lists($orderModel,$where,$order='createTime DESC',$field=true);//获取父订单的编号信息
        $list = $orderModel->getInfoList($parentOrderData);

//TODO查询供应商
        
        $supplier = D('Supplier')->getAllSupplier();
        $this->assign('supplier',$supplier);
        $this->assign('list',$list);
        $this->display();
    }
    
    
    //获取订单详情数据
    function detail(){
        $ordId = I('ordId');
        $map_par['ID'] = $ordId;
        $ordModel = D('Order');
        $imgModel = D('ProductImg');
        $parent_ord_info = $ordModel->where($map_par)->find();//父订单信息
        $parent_ord_info['addressall'] = $parent_ord_info['country'].$parent_ord_info['province'].$parent_ord_info['city'].$parent_ord_info['district'].$parent_ord_info['address'];
        $parent_ord_info['ordetype'] = '普通商品';
        if ($parent_ord_info['paystatus'] == 'PAY') {
            $parent_ord_info['paynum'] = $ordModel->getPayNum($parent_ord_info['ordercode']);
            $parent_ord_info['paytye'] = $ordModel->getPayType($parent_ord_info['ordercode']);
        }else{
            $parent_ord_info['paynum'] = '';
        }
        
        $son_ord_info = $ordModel->getSunOrd_joinPro($parent_ord_info['id']);
        foreach ($son_ord_info as $key => $val) {
           $son_ord_info[$key]['img'] = $imgModel->amjImgbyPorid($val['productid']);


           $son_ord_info[$key]['postfee'] = intval($val['postfee']) == 0 ? '包邮' : "￥".mony_format($val['postfee'],'yuan');
           
        }
        
        $userInfo = get_mpdetail_one($parent_ord_info['mqid']);//获取下单人的麦圈id和昵称
        
        $this->assign('user_info',$userInfo);
        $this->assign('ord_parent',$parent_ord_info);
        $this->assign('ord_son',$son_ord_info);
        $this->meta_title = '订单详情';
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