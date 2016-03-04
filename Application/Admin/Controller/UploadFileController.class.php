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
            $data['info'] = '图片上传成功';
        }else{
            $data['status'] = false;
            $data['img'] = array();
            $data['info'] = '图片上传失败，请选择图片';
        }
//         $data['status'] = true;
//         $data['img'][]=array(
//             'url'=>'http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_ce67ebba96adfde9e9ceee88ce4f16a0.jpg',
//         );

        $this->ajaxReturn($data);
    }
    
}