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
     * 【商品列表页】
     * date:2016年2月25日
     * author: EK_熊
     */
    public function index(){

        $id = I('proid');
        $dateStat = I('date_stat');
        $dateEnd = I('date_end');
        $procode = I('procode');
        $proname = I('proname');
        $supplier= I('supplier');
        $where = array();
        $where['status'] = array('neq','DEL');
        if ($id)      $where['ID'] = $id;
        if ($supplier)$where['supplyID'] = $supplier;
        if ($procode) $where['productCode'] = $procode;
        if ($proname) $where['productName'] = array('like',"%$proname%");
        if ($dateStat && $dateEnd) $where['createTime'] = array('between',array($dateStat." 00:00:00",$dateEnd." 23:59:59"));
        
        $proModel = M('Product','','DB_PRODUCT');;
        
        $list = $this->lists ($proModel,$where,$order='createTime DESC',$field=true);
        
        //循环拼接供应商supplyname，图片主图{$item.imgmaj},分类categoryname
        $list = $this->filterProData($list);
        
        //获取供应商数据
        $map_supplier['status'] = 'OK#';
        $supplier = M('Supplier','','DB_SUPPLIER')->where($map_supplier)->field('ID,name')->select();
        
        $this->assign('_supplier',$supplier);
        $this->assign('_list',$list);
        $this->meta_title = '商品管理';
        $this->display();
    }
    
    /**
     * 【商品基础信息】获取商品基础信息，时需要进行数据整合
     * 合并商品数据和图片，分类，供应商，数据
     * @param unknown $list
     * date:2016年3月6日
     * author: EK_熊
     */
    public function filterProData($list) {

        if (!$list) return false;
        $proImgModel = M('ProductImg','','DB_PRODUCT');
        $categoryModel = M('ProductCategory','','DB_PRODUCT_CATEGORY');
        $supplierModel = M('Supplier','','DB_SUPPLIER');
        //拼接图片
        foreach ($list as $key => $value) {
            $proidList[] = $value['id'];
            $cateIdList[] =$value['categoryid'];
            $supplyIdList[] = $value['supplyid'];
        }
        $imgMaj_map['productID'] = array('in',$proidList);
        $imgMaj_map['imgPos'] = "MAJ";
        $imgMajList = $proImgModel->where($imgMaj_map)->getField('productID,imgPath'); //获取图片数据
        
        
        //拼接分类
        $cate_map['ID'] = array('in',$cateIdList);
        $cateNameList = $categoryModel->where($cate_map)->getField('ID,className');
        $supplier_map['ID'] = array('in',$supplyIdList);
        $supplierList = $supplierModel->where($supplier_map)->getField('ID,name');

        foreach ($list as $key => $value ){
            $imgPath = $imgMajList[$value['id']];
            $list[$key]['imgmaj'] = $imgPath ? qiniu_private_url($imgPath): '';
            $list[$key]['categoryname'] = $cateNameList[$value['categoryid']];
            $list[$key]['supplyname'] = $supplierList[$value['supplyid']];
        }

        
        return $list;
    }
    
    /**
     * 【商品基础信息】删除商品图片
     * 
     * date:2016年3月9日
     * author: EK_熊
     */
    public function deleteProImg(){
        $imgid = I('imgid');
        $map['ID'] = $imgid; 
        $deleteImg = M('ProductImg','','DB_PRODUCT')->where($map)->setField('status','DEL');
        if ($deleteImg){
            $this->success('图片删除成功');
        }else{
            $this->error('图片删除失败！');
        }
    }
    
    /**
     * 【商品基础信息】修改状态
     * 
     */
    public function setStatus($id,$status){
        $model = M('Product','','DB_PRODUCT');
        $this->set_status($model, $id, $status);
    }
    
    /**
     * 【商品规格】获取数据
     * ajax方式获取
     * date:2016年3月9日
     * author: EK_熊
     */
    public function getSku(){
        $proid = I('proid');
        $sku_map['productID'] = $proid;
        $sku_map['status'] = 'OK#';
        $sku_field = array(
            "createTime"=>"created_at" ,
            "ID" => "id",
            "name",
            "skuPrice"=>"price",
            "productID"=> "product_id",
            "skuStock" =>"quantity",
            "applyPrice" =>"supply_price",
            'key',
            'skuImg'
        );
        $data['stocks'] = M('ProductSku','','DB_PRODUCT')->where($sku_map)->field($sku_field)->select();

        /* 取出skuid,进行合成页面显示表格对应关系的key值 */
        foreach ($data['stocks'] as $key=>$val) {
            $data['stocks'][$key]['supply_price'] = mony_format($val['supply_price'],'yuan');
            $data['stocks'][$key]['price'] = mony_format($val['price'],'yuan');
            $data['stocks'][$key]['skuimg_private'] = qiniu_private_url($data['stocks'][$key]['skuimg']); 
            

        }

        $attr_map['productID'] = $proid;
        $attr_field = array('attrName'=>'name','id');
        
        $attr = M('ProductAttr','','DB_PRODUCT')->where($attr_map)->field($attr_field)->select();
        foreach ($attr as $key=>$val){
            $attrIdList[] = $val['id'];
        }

        $attrval_map['attrID'] = array('in',$attrIdList);
        $attrval_field = array('ID'=>'id','attrValue'=>'name','attrID');
        $attrValue = M('ProductAttrValue','','DB_PRODUCT')->where($attrval_map)->field($attrval_field)->select();

        
        foreach ($attrValue as $key => $value){
                $newvalue = $value;
                $newvalue['checked'] = true;
                unset($newvalue['attrid']);
                $tags[$value['attrid']][] = $newvalue;

        }

        foreach ($attr as $key=>$value){
            $attr[$key]['values'] = $tags[$value['id']];
            
        }
        $data['tags'] = $attr;

//         $da['stocks']=array(
//             '0'=>array(
//                 "created_at" => "2016-03-08T16:00:06.000+08:00",
//                 "id"=> 353670,
//                 "key"=>"11-31",
//                 "name" => "颜色:红,尺寸:12",
//                 "price" => "0.01",
//                 "product_id" => 56250,
//                 "quantity" =>5000,
//                 "site_id" => 1,
//                 "supply_price" => "3.01",
//                 "updated_at" => "2016-03-08T16:00:06.000+08:00",                
//             ),

//         );
//         $d['tags']=array(
//             '0'=>array(
//                 "id"=>"21",
//                 "name"=>"颜色",
//                 "values"=>array(
//                     '0'=>array("checked"=>true,"id"=>"11","name"=>"红"),
//                     '1'=>array("checked"=>true,"id"=>"21","name"=>"白"),
//                 ),
//              ),
            
//         );

        $this->ajaxReturn($data);
    }
    
    /**
     * 商品添加：主页面，商品确认提交
     * date:2016年2月25日
     * author: EK_熊
     */
    public function add(){
        
        $proid = I('proid');
            
        if ($proid){
            $product = D('Product')->getOneProByid($proid);
            $this->assign('product',$product);
        }

        
        if (IS_POST) {
            $sttr = I('attrCombin');//sku数据
            $attr = I('attrVal');//规格sttr属性数据
            $proInfo = I('proInfo');//商品基础信息数据
            $proId = $proInfo['id'];


            if (!$proInfo) $this->error('请完善商品基础信息');
            if (!$sttr || !$attr) $this->error('请填写商品规格信息');
            $ret['status'] = true;
            
            do{
                /* 开启事务 */
                $productModel = D('Product');
                
                $productModel->startTrans();
               
                if (empty($proId)) {
                    $ret['info'] = '商品添加成功！';
                    /* 新增商品基础信息 */
                    $addInfo = $this->addProInfo($proInfo);
                    
                    if (!$addInfo['status']) {
                        $ret = $addInfo;
                        break;
                    }
                    /* 新增 sku属性数据 */
                    $addAttr = $this->addAttr($addInfo['proid'], $attr, $sttr);
                    
                    if (!$addAttr['status']) {
                        $ret = $addAttr;
                        break;
                    }     
                    
                    
                }else{ 
                    
                    $ret['info'] = '商品更新成功！';
                    /* 编辑更新商品基础信息 */
                    $updateInfo = $productModel->updateProInfo($proInfo);
                    
                    if (!$updateInfo['status']) {
                        $ret = $updateInfo;
                        break;
                    }
                   
                    /* 编辑更新商品规格 */
                    $updateAttr = $productModel->updateProAttr($attr,$sttr,$proId);
                    if (!$updateAttr['status']) {
                        $ret = $updateAttr;
                        break;
                    }                    
                }

                
            }while(false);
            
            if (!$ret['status']) {
                $productModel->rollback();
                $this->error($ret['info']);
            }else{
                $productModel->commit();
                $this->success($ret['info']);
            }   
        }
        
        //获取供应商数据
        $map_supplier['status'] = 'OK#';
        $supplier = M('Supplier','','DB_SUPPLIER')->where($map_supplier)->field('ID,name')->select();

        
        $this->assign('supplier',$supplier);
        $this->meta_title = '编辑商品';
        $this->display();
    }   

    /**
     * 运费模板页，带分页
     * 获取运费模板数据
     * date:2016年3月15日
     * author: EK_熊
     */
    public function freightTpl(){
        $supplierId = I('supplierid');
        
        $where['supplyID'] = $supplierId;
        $field = 'ID,freightName';
        $freightModel = M('FreightTpl','','DB_PRODUCT');
        $list = $this->lists ($freightModel,$where,$order='createTime DESC',$field);
        $this->assign('list',$list);
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
    /**
     * 商品分类，展示页
     * @param unknown $proid
     * date:2016年3月9日
     * author: EK_熊
     */
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
        do{
            
            $ret['status'] = false;
            //添加商品基础信息
            $data_pro_info = array(
                'productCode'   =>$proInfo['procode'],
                'sellDesc'      =>$proInfo['selldesc'],
                'shortName'     =>$proInfo['shortname'],
                'productName'   =>$proInfo['fullname'],
                'supplyID'      =>$proInfo['supplier'],
                'price'         =>mony_format($proInfo['price']),   //TODO转换单位分
                'applyPrice'    =>mony_format($proInfo['applyprice']),   //TODO转换单位分
                'weight'        =>weight_format($proInfo['weight'],'g'),//TODO转换单位克存放
                'limitCount'    =>$proInfo['limitCount'],
                'status'        =>$proInfo['status'],
                'platform'      =>$proInfo['platform'],
                'uid'           =>UID,
                'createTime'    =>date('Y-m-d H:i:s'),
                'sellType'      =>'NOR',
                'categoryID'    =>$proInfo['cateid'],
                'freightTpl'    =>$proInfo['freightTpl'],//运费
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
            $proImgModel = D('ProductImg')->batcAddProImg($proInfo['img'],$proId);
            if (!$proImgModel) {
                $ret['info'] = '商品图片详情添加异常！';
                break;
            }
            
            //保存运费信息
            $proFreight = D('Product')->updateFreightTpl($proInfo['freightTpl'],$proId,$proInfo['supplier']);
            if (!$proFreight) {
                $ret['info'] = '运费模板数据处理异常！';
                break;
            }
            $ret['status'] = true;
            $ret['info'] = '商品添加成功';
            $ret['proid'] = $proId;
        }while(false);
        
        return $ret;

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
    

    
    /**
     * 【商品规格】添加操作
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
                    'status'=>'OK#',
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
            
            //更新sku表的key值
            for ($i=0;$i<count($idList_sku);$i++) {
                $skuKey = '';
                $sku_AttrValueID_ary = $skuAttrModel->where("skuID={$idList_sku[$i]}")->field('attrValueID')->select();
                for ($h=0;$h<count($sku_AttrValueID_ary);$h++) {
                    $skuKey .= $sku_AttrValueID_ary[$h]['attrvalueid']."-";
                }
        
                $skuKey = rtrim($skuKey, "-");
                $sku_setKey = $skuModel->where("ID={$idList_sku[$i]}")->setField('key',$skuKey);
                
            }
            
            if (!$addSkuAttr) {
                $ret['info'] = '批量添加sku_attr出错！';
                break;
            }
            $ret['status'] = true;
            $ret['info'] = '商品规格添加成功';
        }while(false);
        
        return $ret;

 	}
    
 	/**
 	 * 
 	 * 
 	 * date:2016年3月21日
 	 * author: EK_熊
 	 */
 	public function excel_out_supplier(){
 	    $data = M('Supplier','','DB_SUPPLIER')->select();
 	    if (!$data) {
 	        $this->error('网络异常，获取不到数据！');
 	    }
 	    
 	    
 	    $fieldVal = array(
 	        '供应商名称'=>'name',
 	        '编号'=>'code',
 	        '结算周期/天'=>'balancecycle',
 	        '公司'=>'companyname',
 	        '联系人'=>'contactname',
 	        '电话'=>'contactphone',
 	        '是否启用'=>'status',
 	    );
//  	    excel_output($data,$fieldVal,$title);
 	}
    
}