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
    
    function addAttr($attrName,$proId){
        $add = array(
            'attrName'  => $attrName,
            'productID' =>$proId,
            'uid'       =>UID,
            'createTime'=>$createTime,
         );
        return $ret = $this->add($add);
    }
    
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
    function getAttrByValId($proId,$attrValId){
        if (is_array($attrValId)) {
            $attrValId = implode(',',$attrValId);
        }
        $ret = null;
        $sql = "SELECT
                    attr.productID,
                    attr.attrName,
                    attrValue.attrValue,
                    attrValue.attrID,
                    attrValue.ID as attrValueID,
                    skuAttr.skuID
                    FROM
                    aladdin_product_sku_user.t_product_attr_value as attrValue
                    LEFT JOIN aladdin_product_sku_user.t_product_attr as attr ON attr.ID = attrValue.attrID
                    LEFT JOIN aladdin_product_sku_user.t_product_sku_attr as skuAttr ON attrValue.ID = skuAttr.attrValueID
                    WHERE attrValue.ID IN ({$attrValId}) AND attr.productID = {$proId}
                ";

        $ret = M('')->query($sql);
        foreach ($ret as $key => $value) {
            $data[$value['attrvalueid']] = $value;
        }
        return $data;
    }
    
    

    
    //需要attrid
    function updateAttr($attrId,$attrName){
        $save['attrName'] = $attrName;
        $save['updateTime'] = CURTIME;
        $where['ID'] = $attrId;
        return $ret = $this->where($where)->save($save);        
    }
    
    //更新操作时的数据创建
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
    function createAttr($sku,$proId){
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
           }//TODO更新attr名称可以写在else里面
           
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
        );
        return M('ProductSkuAttr','','DB_PRODUCT')->add($add);
    }
    //添加库存stock
    function addStock($skuId,$count){
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