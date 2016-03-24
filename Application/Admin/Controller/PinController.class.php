<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;
// +----------------------------------------------------------------------
// | Date:2016年3月23日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class PinController extends AdminController{
 
    protected $db_pin,$db_pin_detail,$db_pin_open;
    public function _initialize(){
        parent::_initialize();
        $this->db_pin = M('PinInfo','','DB_PIN');
        $this->db_pin_detail = M('PinDetail','','DB_PIN');
        $this->db_pin_open = M('PinOpen','','DB_PIN');
    }
    
    
    public function index(){
        $select_time = I('select_time');
        $select_status = I('select_status');
        
        $where['pin.status'] = array('NEQ',"DEL");
        if ($select_time) {
            $dateStat = I('date_stat');
            $dateEnd = I('date_end');
            $where["pin.{$select_time}"] = array('between',array($dateStat." 00:00:00",$dateEnd." 23:59:59"));

        }
        if($select_status) $where['pin.status'] = $select_status;
        
        
        $join = array(
            'LEFT JOIN aladdin_product_sku_user.t_product pro ON pin.productID=pro.ID',
        );
        $field = 'pin.*,pro.productName,pro.productCode';
        $model = M('PinInfo','','DB_PIN')->alias('pin')->join($join);
        $list = $this->lists($model,$where,$order='pin.ID DESC',$field);
        foreach ($list as $key => $val) {
            $list[$key]['imgpath'] = D('ProductImg')->amjImgbyPorid($val['productid']);
        }

        $this->assign('list',$list);
        $this->meta_title = '拼团列表';
        $this->display();
    }
    
    public function index_open(){
        //团长，开团人数，参与人数，时间，产品信息，开团价

         $join = array(
            'LEFT JOIN aladdin_product_sku_user.t_product pro ON open.productID=pro.ID',
        );
        $field = 'open.*,pro.productName,pro.productCode';
        $model = $this->db_pin_open->alias('open')->join($join);
        $list = $this->lists($model,$where,$order='open.ID DESC',$field);
        foreach ($list as $key => $val) {
            $list[$key]['imgpath'] = D('ProductImg')->amjImgbyPorid($val['productid']);
        }
        dump($list);
        $this->meta_title = '已开团列表';
        $this->display();        
    }
    
    //修改状态
    public function setStatus(){
        parent::set_status($this->db_pin, I('id'), I('status'),U('index'));
    }
    
    //新增，编辑，操作
    public function edit(){
        $pinId = I('pinid');
        
        if (IS_POST) {
 
            $desc = I('pinDesc');
            $data = $this->db_pin->create();
            $data['uid'] = UID;
            $data['pinPrice'] = mony_format($data['pinPrice'],'ten');
            if (empty($data['productID'])) $this->error('请选择拼团的商品！'); 
            if (empty($data['pinImg'])) $this->error('请上传拼团的图片！'); 
            if (empty($desc)) $this->error('请填写拼团介绍！'); 

            $this->db_pin->startTrans();
   
            if ($data['ID']) {//进行更新
                unset($data['beginTime']);
                unset($data['endTime']);
                $data['updateTime'] = CURTIME;
                
                $pin_update = $this->db_pin->where(array('ID'=>$data['ID']))->save($data);
                $save['updateTime']= CURTIME;
                $save['pinDesc']= $desc;
                $pin_detail_update = $this->db_pin_detail->where(array('pinID'=>$data['ID']))->save($save);
                $ret = !$pin_update || !$pin_detail_update ? false : true;
            }else{//新增
                $data['createTime'] = CURTIME;
                $pin_add = $this->db_pin->add($data);
                if ($pin_add) {
                    $desc_add = array(
                        'pinID'=>$pin_add,
                        'pinDesc'=>$desc,
                        'supplyID'=>$data['supplyID'],
                        'uid'=>UID,
                        'createTime'=>CURTIME
                    );
                    $desc_add = $this->db_pin_detail->add($desc_add);
                }
                $ret = !$desc_add ? false :true; 
            }
            
            if($ret){
                $this->db_pin->commit();
                $this->success('操作成功！');
            }else{
                $this->db_pin->rollback();
                $this->error('网络异常，操作失败！！');
            }
            
        }
        
        if ($pinId) {
            
            /*获取拼单数据*/
            $join = array(
                't_pin_detail detail ON detail.pinID = info.ID'
            );
            $pin = $this->db_pin->alias('info')->where('info.ID='.$pinId)->join($join)->find();
           
            $proInfo = M('Product','','DB_PRODUCT')->where('ID='.$pin['productid'])->field('productName,productCode')->find();
            $proInfo['imgpath'] = D('ProductImg')->amjImgbyPorid($pin['productid']);
            $this->assign('pin',$pin);
            $this->assign('proinfo',$proInfo);
        }
        $this->meta_title = '编辑列表';
        $this->display();
        
    }

    /**
     * 选择商品列表
     * 
     * date:2016年3月23日
     * author: EK_熊
     */
    public function product_list(){


        $select = I('select');
        $keyword = I('keyword');
        switch ($select){
            case 'select_name': $where['productName'] = $keyword; break;
            case 'select_code': $where['productCode'] = $keyword; break;
        }
            
        

        
        $productModel = D('Product','','DB_PRODUCT');
        $imgModel = D('ProductImg');
        $list = $this->lists($productModel,$where,$order='ID DESC','ID,productCode,productName,supplyID,price');
        foreach ($list as $key => $val){
            $list[$key]['img'] = $imgModel->amjImgbyPorid($val['id']);
        }
        $this->assign('list',$list);
        $this->display();
    }
    
    

    
}