<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月17日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class OrderModel extends Model{
    protected $connection = 'DB_ORDER';
    var $db_ord_product;
    var $db_product;
    var $db_product_img;
    public function __construct(){
        
        $this->db_ord_product = M('OrderProduct','','DB_ORDER');
        $this->db_product = M('Product','','DB_PRODUCT');
        $this->db_product_img = D('ProductImg');
        parent::__construct();
    }
    
    /**
     * 逻辑处理数据
     * @param unknown $orderData
     * @return $list = array (size=1)
  0 => 
    array (size=2)
      'parent_ord' => 
        array (size=29){
          'id' => string '348' (length=3)
          'parentid' => string '0' (length=1)
            ..........
          }
      'order' => 
        array (size=2)
          0 => 
            array {
                'ord_info'=>array()
                'pro_info'=>array()
                'pro_ord_info'=>array()
            }

     * date:2016年3月18日
     * author: EK_熊
     */
    function getInfoList($orderData){
        if (!$orderData) return null;
        
            /* 1.传入父订单数据,取出id，获取子订单数据 */
        $parent_ord = data_shift($orderData); // 父订单id数组
        $sun_ord = $this->getSunOrd($parent_ord['id_list']);
        if (!$sun_ord) return null;
        
        $sun_ord = data_shift($sun_ord,'id'); // 子订单订单数据
        $pro_ord = $this->getProByOrdid($sun_ord['id_list']);
        if (!$pro_ord) return null;
        
        $pro_ord = data_shift($pro_ord,'productid','orderid');// 商品-订单关联数据,使用订单id做索引
        $product_data = $this->productInfo($pro_ord['productid_list']);
        if (!$pro_ord) return null;
        
        $product_data = data_shift($product_data,'id','id');//商品基本数据

        //把子订单数据和商品数据拼在一起，使用订单id做索引
        foreach ($pro_ord['data'] as $key=>$val){
            $productList[$val['orderid']] = $product_data['data'][$val['productid']];
        }
        
        //不管了，循环查询吧，再写下去头晕了
        foreach ($productList as $key => $val){
            $productList[$key]['img'] =  $this->db_product_img->amjImgbyPorid($val['id']);
        }

        /* 整合数据*/
        //TODO 考虑一张父订单多个子订单（商品）的情况
        
        foreach ($orderData as $key => $val){
            $parentId = $val['id'];
            $proNum = 0;
            for($i=0; $i<count($sun_ord['data']);$i++){
                $sun_ord_data = $sun_ord['data'][$i];
                
                if ($sun_ord_data['parentid'] == $parentId){
                    $ordAry[$proNum]['ord_info'] = $sun_ord_data;
                    $ordAry[$proNum]['pro_info'] = $productList[$sun_ord_data['id']];
                    $ordAry[$proNum]['pro_ord_info'] = $pro_ord['data'][$sun_ord_data['id']];
                    
                    $proNum++;
                }
            }
            $data[$key] = array(
                'parent_ord' => $val,
                'order'=>$ordAry,
                
            );
            
        }
        return $data;

    }
    
    
    /**
     * 获取子订单数据，根据父订单的id批量获取
     * @param unknown $parentIdList   返回数据
     * @return $data['data']
     *         $data['id_list']
     * date:2016年3月17日
     * author: EK_熊
     */
    function getSunOrd($parentIdList){
        $where['parentID'] = array('in',$parentIdList);
        $data = $this->where($where)->select(); 
        return $data;
        
    }
    
    /**
     * 根据父订单id，获取完成的子订单数据，join ord报表和ord
     * 返回单条数据
     * date:2016年3月18日
     * author: EK_熊
     */
    function getSunOrd_joinPro($parentId){
        $map_ord['parentID'] = $parentId;
        $join = array(
            't_order_product ordpro  ON ordpro.orderID = ord.ID'
        );
        $ret = $this->alias('ord')->where($map_ord)->field('*,ordpro.ID as ordproid')->join($join)->select();
        return $ret;
    }
    
    
    //根据子订单id，获取商品数据
    function getProByOrdid($ordId){
        $where['orderID'] = array('in',$ordId);
        $data = $this->db_ord_product->where($where)->select();
        return $data;
    }
    //获取商品基础信息
    function productInfo($proId){
        $where['ID'] = array('in',$proId);
        $data = $this->db_product->where($where)->field('id,productname,productcode,price,status')->select();
        return $data;
    }
    
    //根据商品自编号获取订单信息，只查一条，直接用join,返回父订单的id
    function getDataByProCode($proCode){
        
        $pro_map['productCode'] = $proCode;        
        $proId = $this->db_product->where($pro_map)->getField('ID');
        $ord_map['productID'] = $proId; 
        $join = array(
            't_order_product ON t_order_product.orderID = t_order.ID', 
        );
        $ordId = $this->where($ord_map)->join($join)->getField('parentid');
        return $ordId;
    }
    

    
    //获取订单号，根据订单号
    function getPayNum($ordCode){
        $map['orderCode'] = $ordCode;
        return M('OrderPayment','','DB_ORDER')->where($map)->getField('payNum');
    }
    //获取支付类型
    function getPayType($ordCode){
        $map['orderCode'] = $ordCode;
        $type= M('OrderPayment','','DB_ORDER')->where($map)->field('payChannel')->select();
        return get_status($type[0]['paychannel'],'pay')."+".get_status($type[1]['paychannel'],'pay');
    }
    
}