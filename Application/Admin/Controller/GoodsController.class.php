<?php
// +----------------------------------------------------------------------
// | Date:2016年2月25日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于 商品管理控制器
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Admin\Controller\AdminController;
use Think\Model;
class GoodsController extends AdminController{
 
    /**
     * 商品列表页
     * date:2016年2月25日
     * author: EK_熊
     */
    public function index(){
        if (IS_POST) {
            
        }
        $id = I('proid');
        $dateStat = I('date_stat');
        $dateEnd = I('date_end');
        $procode = I('procode');
        $proname = I('proname');
        $where = array();
        if ($id)      $where['ID'] = $id;
        if ($procode) $where['productCode'] = $procode;
        if ($proname) $where['productNme'] = array('like',"%$proname%");
        if ($dateStat && $dateEnd) $where['createTime'] = array('between',array($dateStat." 00:00:00",$dateEnd." 23:59:59"));
        $proModel = M('Product','','DB_PRODUCT');;
        $proImgModel = M('ProductImg','','DB_PRODUCT');
        //TODO 到底是显示商品表数据，还是sku数据
        $list = $this->lists ($proModel,$where,$order='createTime DESC',$field=true);
        
        //循环拼接供应商supplyname，图片主图{$item.imgmaj},分类categoryname
        if ($list) {
            foreach ($list as $key => $value) {
                $proidList[] = $value['id'];
            }
            $imgMaj_map['productID'] = array('in',$proidList);
            $imgMaj_map['imgPos'] = "MAJ";
            $imgMaj_map['status'] = "OK#";
            $imgMajList = $proImgModel->where($imgMaj_map)->getField('productID,imgPath'); //获取图片数据
             
            foreach ($list as $key => $value ){
                $imgPath = $imgMajList[$value['id']];
                $list[$key]['imgmaj'] = $imgPath ? qiniu_private_url($imgPath): '';
            }
        }

//         dump($list);

        $this->assign('_list',$list);
        $this->meta_title = '商品管理';
        $this->display();
    }
    
    /**
     * 修改状态
     * 
     */
    public function setStatus($id,$status){
        $model = M('Product','','DB_PRODUCT');
        $this->set_status($model, $id, $status);
    }
    
    
    /**
     * 商品添加：主页面，商品确认提交
     * date:2016年2月25日
     * author: EK_熊
     */
    public function add(){
        if (IS_POST) {
            $sttr = I('attrCombin');//sku数据
            $attr = I('attrVal');//规格sttr属性数据
            $proInfo = I('$proInfo');
//             dump($sttr);
//             dump($attr);
//             dump($proInfo);
            if (!$proInfo) $this->error('请完善商品基础信息');
            if (!$sttr || !$attr) $this->error('请填写商品规格信息');
            
            
            do{
                /*开启事务*/
                $productModel = M('Product','','DB_PRODUCT');
                $productModel->startTrans();
            
                /*保存商品数据*/
                $addInfo = $this->addInfo($proInfo);
                if (!$addInfo['status']) {
                    $ret = $addInfo;
                    break;
                }
                /* 保存 sku属性数据*/
                $addAttr = $this->addAttr($addInfo['proid'], $attr, $sttr);
                if (!$addAttr['status']) {
                    $ret = $addAttr;
                    break;
                }
            }while(false);
            
            if (!$ret['status']) {
                $productModel->rollback($ret['info']);
                $this->error();
            }else{
                $productModel->commit();
                $this->success('商品添加成功！');
            }   
        }
        $this->meta_title = '添加商品';
        $this->display();
    }   

    /**
     * 商品添加：基本信息展示页
     *
     * date:2016年3月2日
     * author: EK_熊
     */
    public function addInfo(){
        $this->display();
    }
    
    public function proCate($proid) {
        
        $this->display();
    }
    
   /**
    * 保存商品基本信息控制器
    * 
    * date:2016年3月3日
    * author: EK_熊
    */
    public function addProInfo($proInfo){

        //TODO 处理运费
        do{
            
            $ret['status'] = false;
            //添加商品基础信息
            $data_pro_info = array(
                'productCode'=>$proInfo['procode'],
                'sellDesc'=>$proInfo['selldesc'],
                'shortName'=>$proInfo['shortname'],
                'productName'=>$proInfo['fullname'],
                'supplyID'=>$proInfo['supplier'],
                'price'=>mony_format($proInfo['price']),   //TODO转换单位分
                'weight'=>weight_format('g', $proInfo['weight']),//TODO转换单位克存放
                'productName'=> $proInfo['fullname'],
                'limitCount'=>$proInfo['limitCount'],
                'status'=>$proInfo['status'],
                'platform'=>$proInfo['platform'],
                'uid'=>UID,
                'createTime'=>date('Y-m-d H:i:s'),
            );
            $productModel = M('Product','','DB_PRODUCT');
            
            $proId = $productModel->add($data_pro_info);
            if (!$proId) {
                $ret['info'] = '商品基础信息添加错误！';
                break;
            }

            //保存描述html
            $proDetailModel = M('ProductDetail','','DB_PRODUCT');
            $data_pro_detail = array(
                'productID'=>$proId,
                'productDesc'=>$proInfo['desc'],
                'uid'=>UID,
                'createTime'=>date('Y-m-d H:i:s')
            );
            $addDetail = $proDetailModel->add($data_pro_detail);
            if (!$addDetail) {
                $ret['info'] = '商品描述详情添加异常！'; 
                break;
            }
            
            //保存图片
            $proImgModel = M('ProductImg','','DB_PRODUCT');
            foreach ($proInfo['img'] as $k => $v){
                $data_pro_Img[$k] = array(
                    'productID'=>$proId,
                    'imgPath'  =>$v,
                    'uid'      =>UID,
                    'createTime'=>date('Y-m-d H:i:s'),
                    'status'    =>'OK#'
                );
                if ($k == 0) {
                    $data_pro_Img[$k]['imgPos'] = 'MAJ';
                }else{
                    $data_pro_Img[$k]['imgPos'] = 'SEC';
                }
            }
           
            $addProImg = $proImgModel->addAll($data_pro_Img);
            $ret['status'] = true;
            $ret['info'] = '商品添加成功';
            $ret['proid'] = $proId;
        }while(false);
        
        return $ret;
        dump($ret);
    }
    

    
    //TODO获取商品规格属性
    public function attr(){
        $values[]= array(
            'id'=>1,
            'name'=>1,
            'checked'=>false,
        );
        $values[]= array(
            'id'=>2,
            'name'=>2,
            'checked'=>false,
        );

        
        $data[] = array(
            'id'=>1,
            'name'=>'小白',
            'value'=>'',
            'values'=>$values,
            
        );
        $data[] = array(
            'id'=>2,
            'name'=>'小白2',
            'value'=>'',
            'values'=>$values,
        
        );
        $attr = '[{"id":1,"name":"小白","value":"","values":[{"id":1,"name":"1","checked":false,"$$hashKey":"008"},{"id":2,"name":"2","checked":false,"$$hashKey":"009"},{"id":3,"name":"3","checked":false,"$$hashKey":"00A"}],"$$hashKey":"006"},{"id":1,"name":"小黑","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false}],"$$hashKey":"006"},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"你好","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"是","checked":false},{"id":3,"name":"的","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"不","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"不","checked":false},{"id":2,"name":"呃","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黑","checked":false},{"id":2,"name":"蓝","checked":false},{"id":3,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":"11","name":"5555","value":"","values":[{"id":3,"name":"12","checked":false}]}]';
        
        $this->ajaxReturn($data);
    }
    
//     /**
//      * 
//      * 添加商品触发控制器
//      * date:2016年2月28日
//      * author: EK_熊
//      */
//     public function addProduct(){
//         $sttr = I('attrCombin');//sku数据
//         $attr = I('attrVal');//规格sttr属性数据
//         $proInfo = I('proinfo');
//         dump($proInfo);
        
//         do{
//             /*开启事物*/
//             $productModel = M('Product','','DB_PRODUCT');
//             $productModel->startTrans();
            
//             /*保存商品数据*/
//             $addInfo = $this->addInfo($proInfo);
//             if (!$addInfo['status']) {
//                 $ret = $addInfo;
//                 break;
//             }
//             /* 保存 sku属性数据*/
//             $addAttr = $this->addAttr($addInfo['proid'], $attr, $sttr);
//             if (!$addAttr['status']) {
//                 $ret = $addAttr;
//                 break;
//             }
//         }while(false);
        
//         if (!$ret['status']) {
//             $productModel->rollback();
//         }else{
//             $productModel->commit();
//             $this->success('商品添加成功！');
//         }
//     }

    
    /**
     * 商品规格
     * @param unknown $productID
     * @param unknown $attr
     * @param unknown $sttr
     * date:2016年3月3日
     * author: EK_熊
     */
	public function addAttr($productID,$attr,$sttr){
	    
        $uid = UID;
        $ret['status'] = false;
        $createTime = date('Y-m-d H:i:s');
        do{
            if (!is_array($sttr)) {
                $ret['info'] = 'sku数据参数错误！';
                break;
            }
            if (!is_array($attr)) {
                $ret['info'] = 'attr数据参数错误！';
                break;
            }
            
            $attrModel = M('ProductAttr','','DB_PRODUCT');
            $attrValueModel = M('ProductAttrValue','','DB_PRODUCT');
            $skuModel = M('ProductSku','','DB_PRODUCT');
            $skuAttrModel = M('ProductSkuAttr','','DB_PRODUCT');
            $stockModel = M('ProductStock','','DB_PRODUCT');
            
            $attrModel->startTrans();
            /*添加attr数据*/
            foreach ($attr as $key => $value){
                
                $add_data_attr=array(
                    'attrName'  => $key,
                    'productID' =>$productID,
                    'uid'       =>UID,
                    'createTime'=>$createTime,
                );
                $attrId = $attrModel->add($add_data_attr);
                $idList_attr[$key] = $attrId;//保存attr id对应列表
                if (!$attrId) {
                    $ret['info'] = '商品attr数据添加失败!';
                    break;
                }

                /* 添加attr_value数据*/
                for($i=0;$i<count($value);$i++){
                    $add_data_attrValue = array(
                        'attrID'    => $attrId,
                        'attrValue' => $value[$i],
                        'uid'       =>UID,
                        'createTime'=>$createTime,
                    );
                    $attrValueId = $attrValueModel->add($add_data_attrValue); 
                    $idList_attrValue[$value[$i]] = $attrValueId;//保存attrValue id对应列表
                    if (!$attrValueId) {
                        $ret['info'] = '商品attrvalue添加错误';
                        break;
                    }
                }
            }
            $sortOrder = 1;
            /* 添加suk数据*/
            foreach ($sttr as $key => $value){
            
                $add_data_sku = array(
                    "uid" => UID,
                    "productID"=>$productID,
                    'name'=>$value['name'],
                    'skuPrice'=>$value['price'],
                    'applyPrice'=>$value['supply_price'],
                    'skuImg'=>$value['skuimg'],
                    'skuStock'=>$value['quantity'],
                    'createTime'=>$createTime,
                    'sortOrder'=>$sortOrder++,
                );
                $skuId = $skuModel->add($add_data_sku);
                $idList_sku[] = $skuId;
                if (!$skuId) {
                    $ret['info'] = "商品skus数据{$key}添加错误！！";
                    break;
                }

                $curSkuAttrAry = explode(',',$value['name']);//sku名称第一次切割，
                for($i=0;$i<count($curSkuAttrAry);$i++){
                    $attrKeyValueAry = explode(":",$curSkuAttrAry[$i]);//sku名称第二次切割
                    $skuValueList[$skuId][$i]['attr'] = $attrKeyValueAry[0];
                    $skuValueList[$skuId][$i]['attr_value'] = $attrKeyValueAry[1];//组合所有sku数据的所有属性值列表,skuid 作为索引值
                };
                
                //编辑sku_stock库存操作记录表
                $add_data_stock[] = array(
                    'skuID' => $skuId,
                    'optType'=>'ADD',
                    'uid'    =>UID,
                    'count'  =>$value['quantity'],
                    'createTime'=>$createTime,
                );
            }
            
            //批量添加库存操作记录
            $addStock = $stockModel->addAll($add_data_stock);
            if (!$addStock){
                $ret['info'] = '批量添加库存记录出错！';
                break;
            }
            
            
            /* 添加skuattr数据*/
            for ($i=0;$i<count($idList_sku);$i++) {   //循环skuid列表,
                $curSkuAttr = $skuValueList[$idList_sku[$i]];//根据skuid的值，从$skuValueList取对应的属性
                for ($h=0;$h<count($curSkuAttr);$h++) {
                    $add_data_sku_attr[] = array(
                        'skuID'         =>$idList_sku[$i],
                        'attrID'        =>$idList_attr[$curSkuAttr[$h]['attr']],//从id存储数组$idList_attr获取id值
                        'attrValueID'   =>$idList_attrValue[$curSkuAttr[$h]['attr_value']],//从id存储数组$idList_attrValue获取id值
                        'createTime'    =>$createTime,
                        'uid'           =>UID,
                    );
                }
            }
            //批量添加skuattr数据
            $addSkuAttr = $skuAttrModel->addAll($add_data_sku_attr);
            if (!$addSkuAttr) {
                $ret['info'] = '批量添加sku_attr出错！';
                break;
            }
            $ret['status'] = true;
            $ret['info'] = '商品规格添加成功';
        }while(false);
        
        return $ret;

 	}
    
    
}