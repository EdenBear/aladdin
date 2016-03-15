<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月10日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class ProductAttrModel extends Model{
    protected $connection = 'DB_PRODUCT';
    

    
    /**
     * 获取attr数据，根据proid和attrValId
     * 返回 array(120 => 
            array (size=6)
              'productid' => string '1' (length=1)
              'attrname' => string '尺寸' (length=6)
              'attrvalue' => string '22' (length=2)
              'attrid' => string '64' (length=2)
              'attrvalueid' => string '120' (length=3)
              'skuid' => string '100' (length=3)
              )
     * @param unknown $proId
     * @param unknown $attrValId
     * @return mixed
     * date:2016年3月11日
     * author: EK_熊
     */
//     function getAttrByValId($proId,$attrValId){
//         if (is_array($attrValId)) {
//             $attrValId = implode(',',$attrValId);
//         }
//         $ret = null;
//         $sql = "SELECT
//                     attr.productID,
//                     attr.attrName,
//                     attrValue.attrValue,
//                     attrValue.attrID,
//                     attrValue.ID as attrValueID,
//                     skuAttr.skuID
//                     FROM
//                     aladdin_product_sku_user.t_product_attr_value as attrValue
//                     LEFT JOIN aladdin_product_sku_user.t_product_attr as attr ON attr.ID = attrValue.attrID
//                     LEFT JOIN aladdin_product_sku_user.t_product_sku_attr as skuAttr ON attrValue.ID = skuAttr.attrValueID
//                     WHERE attrValue.ID IN ({$attrValId}) AND attr.productID = {$proId}
//                 ";

//         $ret = M('')->query($sql);
//         foreach ($ret as $key => $value) {
//             $data[$value['attrvalueid']] = $value;
//         }
//         return $data;
//     }
    
    

    
    /**
     *  sku数据存在数据库时的更新操作
     * @param unknown $key
     * @param unknown $proId
     * @param unknown $sku
     * @return boolean
     * date:2016年3月12日
     * author: EK_熊
     */
    function updateProAttr($key,$proId,$sku=array()){
//         $key = '145-148-168';
//           $sku = array(
//               "name"=>"高度111:15cm,重量:23kg,颜色:红色",
//              "price"=>" 0",
//               "product_id"=>"32",
//               "quantity"=>"50",
//               "supply_price"=>"2",
//           );
        
        $skuModel = M('ProductSku','','DB_PRODUCT');
        $sku_map['key'] = $key;
        $sku_map['productID'] = $proId;
        $stockInDB = $skuModel->where($sku_map)->find();
        /* 更新attr属性的attrName,通过sku的key值来获取attr的id*/

        $nameAry_1 = explode(',',$sku['name']);
        for($i=0;$i<count($nameAry_1);$i++){
            $nameAry_2 = explode(':',$nameAry_1[$i]);//属性名称的第二次切割

            $attrName = $nameAry_2[0];//属性名称(有可能是需要更新的新字段)
            $attrValueName = $nameAry_2[1];//属性名称(有可能是需要更新的新字段)
            $attrDataInDB = $this->getAttrByskukey($key, $attrValueName);//获取在库的属性名称

            if ($attrDataInDB['attrname'] !== $attrName && !in_array($attrName,$_SESSION['updateProAttr']['attrName']) ) {//名称和在库的名称不同，进行更新操作
                $updateAttr = $this->updateAttr($attrDataInDB['attrid'], $proId, $attrName);
//                 dump("---进入更新的attr-{$key}-----");

                if (!$updateAttr){
                    
                    $ret['info'] = 'attr字段更新出错'.$key;
                    $ret['status'] = false;
                    return $ret;
                }else{
                    
                    $_SESSION['updateProAttr']['attrName'][]= $attrName;
                }

                
            }
        }
        
        
        
        /* stock库存，进来的数据quantity值和在库的skustock值不相等时进行记录数据添加 */
        if (intval($stockInDB['skuStock']) !== intval($sku['quantity'])) {
            $addStock = $this->addStock($stockInDB['ID'], $sku['quantity'],$optType='UPDA');
            if (!$addStock) {
                $ret['info'] = '添加库存记录'.$key;
                $ret['status'] = false;
                return $ret;
            }
        }
        
        /* 更新sku表字段信息*/

        $updateSku = $this->updateSku($sku,$proId,$key);
        if (!$updateSku) {
            $ret['info'] = 'sku更新数据出错！'.$key;
            $ret['status'] = false;
            return $ret;
        }else{
            $ret['info'] = 'sku更新数据完成！'.$key;
//             dump("sku更新数据完成！{$key}");
        }
        $ret['status'] = true;
        return $ret;
    }
    
    /**
     * 
     * 删除旧的sku数据，即更改状态，避免获取过的数据
     * 具体做法，执行更新操作，就把全部的sku数据进行屏蔽'DEL'，之后再循环逐条更新状态为‘OK#’
     * @param unknown $key
     * @return boolean
     * date:2016年3月14日
     * author: EK_熊
     */
    function deleteSku($proId){
        if ($_SESSION['deleteSku'][$proId] == true) {
            return true;
        }
        
        $save = array(
            'status' => 'DEL#',
            'updateTime'=>CURTIME,
        );
        $where['productID'] = $proId;
        $delete = M('ProductSku','','DB_PRODUCT')->where($where)->save($save);
        if ($delete) {
            $_SESSION['deleteSku'][$proId] = true;
        }
        return $delete;
    }
    
    /**
     * 根据sku的key值和attr属性的值，获取属性的名称的id（attrID）
     * 比如：传入key='122-121'和'红色'，返回'颜色'的id(attrID)
     * 
     * 返回格式 array (size=2){
              'attrid' => string '81' (length=2)
              'attrname' => string '高度' (length=6)
              }
     * date:2016年3月12日
     * author: EK_熊
     */
    function getAttrByskukey($key,$attrValue){
        $sql = "SELECT
                skuAttr.attrID,
                attr.attrName
                FROM
                aladdin_product_sku_user.t_product_sku as sku
                LEFT JOIN aladdin_product_sku_user.t_product_sku_attr as skuAttr ON skuAttr.skuID = sku.ID
                LEFT JOIN aladdin_product_sku_user.t_product_attr_value as attrValue ON attrValue.ID = skuAttr.attrValueID
                LEFT JOIN aladdin_product_sku_user.t_product_attr as attr ON attr.ID = skuAttr.attrID
                WHERE sku.key ='{$key}' AND attrValue.attrValue='{$attrValue}'
                LIMIT 0,1
        "; 
        $ret = M('')->query($sql);
        return $ret[0];
    }
    
    //更新attr表的字段
    function updateAttr($attrId,$proId,$attrName){
        $save = array(
            'attrName'=> $attrName,
            'updateTime'=>date('Y-m-d H:i:s'),
            'uid'    => UID,
        );
        $where['productID'] = $proId;
        $where['ID'] = $attrId;
        
        $ret =  M('ProductAttr','','DB_PRODUCT')->where($where)->save($save);

        return $ret;
    }
    
    
    //更新sku数据表的字段
    function updateSku($sku,$proId,$key){
        $where['productID'] = $proId;
        $where['key'] = $key;
        $sku_save = array(
            'uid'  => UID,
            'name' => $sku['name'],
            'skuPrice'=>mony_format($sku['supply_price'],'ten'),
            'applyPrice'=>mony_format($sku['price'],'ten'),
            'skuImg'=>$sku['skuimg'] ? $sku['skuimg'] : '',
            'updateTime'=>CURTIME,
            'skuStock'=>$sku['quantity'],
            'status'=>'OK#'
        );

         $updateSku = M('ProductSku','','DB_PRODUCT')->where($where)->save($sku_save);      
         

         return $updateSku;
    }

    /**
     * 创建属性数据，包括attr数据和sku数据
     * 进来的数据
     * array (size=5)
          'key' => string '1481-148' (length=8)
          'name' => string '高度:10cm,重量:23kg' (length=23)
          'price' => string '0.0' (length=3)
          'supply_price' => string '0.01' (length=4)
          'quantity' => string '50' (length=2)
      
     * @param unknown $sku
     * date:2016年3月11日
     * author: EK_熊
     */
    function createProAttr($sku,$proId){
       $attrValueModel = M('ProductAttrValue','','DB_PRODUCT');
//        $sku = array(
//            'key' => "1481-147",
//            'name' => '高度:13cm,重量:19kg',
//            'supply_price' => '0.01',
//            'pice'=>'12',
//            'quantity' => '50',
//        );


        //取出属性和对应的值
       $attrValueBox = explode(',',$sku['name']);
       for($i=0;$i<count($attrValueBox);$i++) {
           $attrValue = explode(':',$attrValueBox[$i]);
           $attrValueList[$i]['attrName'] =  $attrValue[0]; //属性名称
           $attrValueList[$i]['attrValue'] =  $attrValue[1];//属性值

           /* 检查是否需要创建attr数据*/
           $checkAttrInDB_map['productID'] = $proId;
           $checkAttrInDB_map['attrName'] = $attrValue[0];
           $attrValueList[$i]['attrId'] = $this->where($checkAttrInDB_map)->getField('ID');//获取attr的id
           if (!$attrValueList[$i]['attrId']){//不存在,创建
               $attrValueList[$i]['attrId'] = $this->addAttr($attrValue[0],$proId);
               if (!$attrValueList[$i]['attrId']) {
                   $ret['info'] = 'attr数据添加失败！';
                   $ret['status'] = false;
                   return $ret;
               }
           }
           
           /*检查是否需要创建 attrValue数据*/
           $checkAttrValInDB_map['attrID'] = $attrValueList[$i]['attrId'];
           $checkAttrValInDB_map['attrValue'] = $attrValue[1];
           $attrValueList[$i]['attrValueId'] = $attrValueModel->where($checkAttrValInDB_map)->getField('ID');
           if (!$attrValueList[$i]['attrValueId']){//不存在,创建
               $attrValueList[$i]['attrValueId'] = $this->addAttrValue($attrValueList[$i]['attrId'],$attrValueList[$i]['attrValue']);
               if (!$attrValueList[$i]['attrValueId']){
                   $ret['info'] = 'attrValue数据添加失败！';
                   $ret['status'] = false;
                   return $ret;
               }
           }     
           
           $skuKey .=  $attrValueList[$i]['attrValueId']."-";//保存需要新增sku数据的key值
       }
      
       $skuKey = rtrim($skuKey, "-");
        
       /* 添加sku数据*/
       $addSku = $this->addSku($sku, $skuKey, $proId);//返回skuid
       if (!$addSku) {
            $ret['info'] = 'sku数据添加失败！';
            $ret['status'] = false;
            return $ret;
       }
       
       /* 添加skuAttr数据*/
       foreach ($attrValueList as $key => $value){
           $addSkuAttr = $this->addSkuAttr($addSku, $value['attrId'], $value['attrValueId']);
           if (!$addSkuAttr) {
                $ret['info'] = 'skuAttr数据添加失败！';
                $ret['status'] = false;
                return $ret;
           }
       }
       
       /* 添加skustock数据*/       
       $addStock = $this->addStock($addSku, $sku['quantity']);
       if (!$addStock)  {
            $ret['info'] = 'skustock数据添加失败！';
            $ret['status'] = false;
            return $ret;
       }
       $ret['status'] = true;
       $ret['info'] = '商品规格添加完成！';
       return $ret;

    }
    
    //创建attr数据
    function addAttr($attrName,$proId){
        $add = array(
            'attrName'  => $attrName,
            'productID' =>$proId,
            'uid'       =>UID,
            'createTime'=>$createTime,
        );
        return $ret = $this->add($add);
    }    
    //创建attrValue数据
    function addAttrValue($attrId,$attrValue){
        $add = array(
            'attrID'=>$attrId,
            'attrValue'=>$attrValue,
            'uid'=>UID,
            'createTime'=>CURTIME,
        );

        return M('ProductAttrValue','','DB_PRODUCT')->add($add);
    }

    //创建sku数据
    function addSku($data,$key,$proId){
        $skuModel = M('ProductSku','','DB_PRODUCT');
        $isExist_map['productID'] = $proId;
        $isExist_map['key'] = $key;
        $isExist = $skuModel->where($isExist_map)->getField('ID');
        if ($isExist){
            return $isExist;
        }
        
        $where['productID'] = $proId;
        $total = $skuModel->where($where)->count();
        $add = array(
            "uid" => UID,
            "productID" => $proId,
            'name' => $data['name'],
            'skuPrice' => mony_format($data['price'],'ten'),
            'applyPrice' =>mony_format($data['supply_price'],'ten'),
            'skuImg' => $data['skuimg'] ? $data['skuimg'] : '',
            'skuStock' => $data['quantity'],
            'createTime' => CURTIME,
            'sortOrder' => $total + 1,
            'key'=>$key,
            'status'=>'OK#'
        );
        return $skuModel->add($add);
    }
    
    //添加skuattr数据
    function addSkuAttr($skuId,$attrId,$attrValueId){
        $add = array(
            'skuID' => $skuId,
            'attrID' =>$attrId,
            'attrValueID'=>$attrValueId,
            'uid' => UID,
            'createTime'=>CURTIME,
            'status'=>'OK#'
        );
        return M('ProductSkuAttr','','DB_PRODUCT')->add($add);
    }
    //添加库存stock
    function addStock($skuId,$count,$optType='ADD'){
        $add = array(
            'skuID' => $skuId,
            'optType' =>'ADD',
            'uid' => UID,
            'createTime'=>CURTIME,
            'count'=>$count,
        );
        return M('ProductStock','','DB_PRODUCT')->add($add);        
    }
    
}