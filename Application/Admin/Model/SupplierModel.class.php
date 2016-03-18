<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月18日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class SupplierModel extends Model{
    protected $connection = 'DB_SUPPLIER';
    
    function getAllSupplier($field='id,name'){
        $where['status'] = 'OK#';
        return $this->where($where)->field($field)->select();
    }
    

    
    
    
}