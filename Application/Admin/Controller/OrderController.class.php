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
        unset($_SESSION[APP_NAME]['ord_map']);//页面加载，需要清空缓存里的查询条件
        $search_day = I('search_day');
        $search_status = I('search_status');
        $search_supplier = I('search_supplier');
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
        if ($search_supplier) $where['supID'] = $search_supplier;
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
            $_SESSION[APP_NAME]['ord_select_procode'] = $keyword;
        }
        $_SESSION[APP_NAME]['ord_map'] = $where;//每次查询都把查询条件保存到session,方便执行导出
       
        $parentOrderData = $this->lists($orderModel,$where,$order='createTime DESC',$field=true);//获取父订单的编号信息
       
        $list = $orderModel->getInfoList($parentOrderData);
        

//TODO查询供应商,参考商品编号做法
        
        $supplier = D('Supplier')->getAllSupplier();
        $this->assign('supplier',$supplier);
        $this->assign('list',$list);
        $this->display();
    }
    
    
    /**
     * 订单详情
     * 
     * date:2016年3月19日
     * author: EK_熊
     */
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
           $parent_ord_info['addressall'] = $parent_ord_info['country'].$parent_ord_info['province'].$parent_ord_info['city'].$parent_ord_info['district'].$parent_ord_info['address'];
        }
        
        $userInfo = get_mpdetail_one($parent_ord_info['mqid']);//获取下单人的麦圈id和昵称
        
        $this->assign('user_info',$userInfo);
        $this->assign('ord_parent',$parent_ord_info);
        $this->assign('ord_son',$son_ord_info);
        $this->meta_title = '订单详情';
        $this->display();
    }
    
    
    //订单导出excel ,根据查询条件
    public function ordExcelOutput(){

        $ordModel = D('Order');
        $userModel = M('User','','DB_PRODUCT_USER');
        $payModel = M('OrderPayment','','DB_ORDER');
        $proModel = M('Product','','DB_PRODUCT');
        $where['parentID']  = array('neq','0');//只查子订单
        
        $select_map = $_SESSION[APP_NAME]['ord_map'];
        if (isset($select_map['ID'])) unset($select_map['ID']);
        $where = array_merge($select_map,$where);
        $join = array(
            't_order_product ordpro ON ordpro.orderID = ord.ID',
        );
        $ord_data = $ordModel->alias('ord')->where($where)->join($join)->select();

//         $parentId = $ordModel->where($where)->getField('id',true);
//         $ord_data = $ordModel->getSunOrd_joinPro($parentId);
//         $ord_data = push_field_fromTable($ord_data,$userModel,'mqID','mqID','nickName,mobileNum');
        $ord_data = push_field_fromTable($ord_data,$payModel,'orderCode','orderCode','payNum');
        $ord_data = push_field_fromTable($ord_data,$proModel,'productID','ID','productCode');
      
        foreach ($ord_data as $key => $val){
            $ordStatus = $ord_data[$key]['orderstatus'];
            $ord_data[$key]['orderstatus'] = get_status($ordStatus, 'order');
            $ord_data[$key]['addressall'] = $val['country'].$val['province'].$val['city'].$val['district'].$val['address'];
            if ($val['paystatus'] == 'PAY') {
                
                $ord_data[$key]['paytype'] = $ordModel->getPayType($val['ordercode']);
            }else{
                $ord_data[$key]['paytype'] = '未支付';
            }
        }
        $fieldVal = array(
            '供应商'=>'supname',
            '父订单编号'=>'parentcode',
            '子订单编号'=>'ordercode',
            '支付单号'=>'paynum',
            '订单状态'=>'orderstatus',
            '商品编号'=>'productid',
            '商品自编号'=>'productcode',
            '商品名称'=>'productname',
            '商品规格'=>'skuname',
            '商品数量'=>'buynum',
            '订单金额'=>'ordersum',
            '供货价'=>'supprice',
            '运费'=>'postfee',
            '姓名'=>'recname',
            '电话'=>'recmobile',
            '地址'=>'addressall',
            '客户留言'=>'notes',
            '支付方式'=>'paytype',
            '客服备注'=>'servicenote',
            '物流公司'=>'logistics',
            '运单号'=>'logisticsnum',
        );
        $title = date('Y-m-d')."订单导出.xlsx";
        excel_output($ord_data,$fieldVal,$title);

    }
    
    /**
     * 订单回填
     * 
     * date:2016年3月20日
     * author: EK_熊
     */
    public function ordExcelInput(){
        
       
        $setting = array(
            'savePath'   =>    './OrdExcel/',    
            'saveName'   =>    array('time',''),    
            'exts'       =>    array('xls', 'xlsx','csv'),    
            'autoSub'    =>    false,
            'replace'    =>    true,
        );
        $upload = new \Think\Upload($setting);
        $uploadInfo = $upload->upload($_FILES);
        if ($uploadInfo){

            $fileName= $uploadInfo['huitian']['savename'];
            $fileNameShort= $uploadInfo['huitian']['md5'];//没带后缀的文件名
        }else{
            $this->error($upload->getError());
        }

        $filePath = SITE_PATH.'/Uploads/OrdExcel/'.$fileName;
//         $filePath = $_SERVER['DOCUMENT_ROOT']. dirname(__ROOT__).$filepath;
        
        $excelData = excel_input($filePath);
        $ordModel = D('Order');
        $ordModel->startTrans();
        $i = 1;//计数器
        $ret['status'] = true;
        foreach ($excelData as $key => $val) {
            $orderCode = trim($val[5]);//订单号
            $logisticsNum = trim($val[12]);//物流单号
            $logistics = trim($val[11]);//物流公司名称
            /* 重新构建数据，写入excel输出*/
            $errorData[$key] = array(
                'recname'=>trim($val[0]),
                'addressall'=>trim($val[1]),
                'invoicename'=>trim($val[2]),
                'recmobile'=>trim($val[3]),
                'supname'=>trim($val[4]),
                'ordercode'=>trim($val[5]),
                'productname'=>trim($val[6]),
                'skuname_num'=>trim($val[7]),
                'notes'=>trim($val[8]),
                'servicenote'=>trim($val[9]),
                'postfee_type'=>trim($val[10]),
                'logistics'=>trim($val[11]),
                'logistics_num'=>trim($val[12]),
            );
            if ($orderCode) {
                if (empty($logisticsNum)) {
                    $errorData[$key]['error'] = '尚未填写物流单号，停止导入！';
                    $ret['info'] = "订单号：【{$orderCode}】,尚未填写物流单号，停止导入！";
                    $ret['status'] = false;
                    break;
                }
                if (empty($logistics)) {
                    $errorData[$key]['error'] = '尚未填写物流公司，停止导入！';
                    $ret['info'] = "订单号：【{$orderCode}】,尚未填写物流公司，停止导入！";
                    $ret['status'] = false;
                    break;
                }
                $save['logistics'] = $logistics;
                $save['logisticsNum'] = $logisticsNum;
                $map['orderCode'] = $orderCode;
                
                $updateOrd = $ordModel->where($map)->save($save);
                if (!$updateOrd) {
                    $errorData[$key]['error'] = '订单数据格式错误！！';
                    $ret['info'] = "订单号：【{$orderCode}】数据出错，或者重复导入了，停止导入！！";
                    $ret['status'] = false;
                    break;
                }
                $i++;
            }
        }
        if (!$ret['status']){
            $fieldVal = array(
                '姓名'=>'recname',
                '地址'=>'addressall',
                '单位名称'=>'invoicename',
                '手机号码'=>'recmobile',
                '供应商'=>'supname',
                '订单号'=>'ordercode',
                '商品名称'=>'productname',
                '商品[自编号]规格(数量)'=>'skuname_num',
                '客户留言'=>'notes',
                '订单备注'=>'servicenote',
                '运费类型'=>'postfee_type',
                '快递公司'=>'logistics',
                '快递单号'=>'logistics_num',
                '错误说明'=>'error',
        
            );
            $title = $fileNameShort."-bak.xlsx";
            excel_output($errorData,$fieldVal,$title);
        }        
        if ($ret['status']){
            $ordModel->commit();
            $ret['info'] = "成功导入{$i}条记录";
            $this->success($ret['info']);
        }else{
            $ordModel->rollback();
            $this->error($ret['info']);
        }
        
        
        
        dump($ret);
        dump($excelData);
    }
    
    //根据查询条件获取订单数据导出excel,默认条件是已付款，未发货
    public function feidouOutPut(){

        $ordModel = D('Order');
        $proModel = M('Product','','DB_PRODUCT');
        $where['payStatus'] = 'PAY';
        $where['shippingStatus'] = 'NOT';
        $where['parentID']  = array('neq','0');//只查子订单
        
        $select_map = $_SESSION[APP_NAME]['ord_map'];
        $where = array_merge($select_map,$where);

        $join = array(
            't_order_product ordpro ON ordpro.orderID = ord.ID', 
        );
        $info = $ordModel->alias('ord')->where($where)->join($join)->select();
        foreach ($info as $key=>$val){
            $info[$key]['addressall'] = $val['country'].$val['province'].$val['city'].$val['district'].$val['address'];
            $productCode = $proModel->where('ID='.$val['productid'])->getField('productCode');
            $info[$key]['skuname_num'] ="[{$productCode}]{$val['skuname']}({$val['buynum']})" ;//拼凑
            $info[$key]['postfee_type'] ='' ;//拼凑

        }
        //TODO缺少运费类型
        $fieldVal = array(
            '姓名'=>'recname',
            '地址'=>'addressall',
            '单位名称'=>'invoicename',
            '手机号码'=>'recmobile',
            '供应商'=>'supname',
            '订单号'=>'ordercode',
            '商品名称'=>'productname',
            '商品[自编号]规格(数量)'=>'skuname_num',
            '客户留言'=>'notes',
            '订单备注'=>'servicenote',
            '运费类型'=>'postfee_type',
            '快递公司'=>'',
            '快递单号'=>'',

        );
        $title = date('Y-m-d')."飞豆运单导出.xlsx";
        excel_output($info,$fieldVal,$title);  
dump($info);
        
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