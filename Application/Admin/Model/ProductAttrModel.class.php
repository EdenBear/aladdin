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
    
    function updateAttr($where=array(),$attrName){
        $save['attrName'] = $attrName;
        $save['updateTime'] = CURTIME;
        return $ret = $this->where($where)->save($save);        
    }
    
    function addAttrValue(){
        
    }
    
    function updateAttrValue(){
        
    }
    
    function addSku(){
        
    }
    
    function updateSku(){
        
    }
    
    function addSkuAttr(){
        
    }
    
    
    
}