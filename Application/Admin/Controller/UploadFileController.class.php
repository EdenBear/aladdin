<?php
// +----------------------------------------------------------------------
// | Date:2016年2月28日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
namespace Admin\Controller;
use Admin\Controller\AdminController;
class UploadFileController extends AdminController{
    
    public function uploadImgQiniuAjax(){
        $imgInfo = qiniu_upload();
        if ($imgInfo){
            $data['img'] = $imgInfo;
            $data['status'] = true;
        }else{
            $data['status'] = false;
            $data['img'] = array();
        }
        $data['status'] = true;
//         $data['img'][]=array(
//             'qiniuImgUrl'=>'1:'.time(),
//         );
//         $data['img'][]=array(
//             'qiniuImgUrl'=>'2:'.time(),        
            
//         );
        $this->ajaxReturn($data);
    }
    
}