<?php
namespace Admin\Controller;
use Think\Controller;
// +----------------------------------------------------------------------
// | Date:2016年2月23日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class TestController extends Controller{
    
    public function index(){
//         $db1 = M('action')->limit(1)->select();
//         dump($db1);
        
//         $db2 = M('product','','DB_PRODUCT')->limit(2)->select();
//         dump($db2);
        
//         dump(weight_format('kg', 12));
//         dump(mony_format('yuan', 12));


//         dump($valueAry);
            $test = D('ProductCategory')->select();
            dump($test);
    }
    
}