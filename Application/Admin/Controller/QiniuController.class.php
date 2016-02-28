<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: yangweijie <yangweijiester@gmail.com>
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Think\Upload\Driver\Qiniu\QiniuStorage;

/**
 * 七牛扩展类测试控制器
 * @author yangweijie <yangweijiester@gmail.com>
 */
class QiniuController extends AdminController {

    var $config = array(
            'accessKey'=>'6EZmwsqQYeHvlaA44_LwiBAePez-rjpOv4jwg4t4',
            'secrectKey'=>'nFJExmiVlpJnPD5l02hLAPjJ8rnfgvCrjR3Ve0Nj',
            'bucket'=>'aladdin',
            'domain'=>'7xrade.com2.z0.glb.qiniucdn.com'
        );
    
    public function _initialize(){

        $this->qiniu = new QiniuStorage($this->config);
        parent:: _initialize();
    }

    //获取文件列表
    public function index(){
        $this->meta_title = '七牛云存储测试';
        $map = array();
        $prefix = trim(I('post.prefix'));
        if($prefix)
            $map['prefix'] = $prefix;
        $list = $this->qiniu->getList($map);
        if(!$list)
            trace($this->qiniu->error);
        $this->assign('qiniu', $this->qiniu);
        $this->assign('_list', $list['items']);
        $this->display();
    }

    public function del(){
        $file = trim(I('file'));
        if($file){
            $result = $this->qiniu->del($file);
            if(false === $result){
                $this->error($this->qiniu->errorStr);
            }else{
                $this->success('删除成功');
            }
        }else{
            $this->error('错误的文件名');
        }
    }

    public function dealImage($key){
        $url = $this->qiniu->dealWithType($key, 'img') ;
        redirect($url);
    }

    public function dealDoc($key){
        $url = $this->qiniu->dealWithType($key, 'doc');
        redirect($url);
    }

    public function rename(){
        $key = I('get.file');
        $new = I('new_name');
        $result = $this->qiniu->rename($key, $new);
        if(false === $result){
            trace($this->qiniu->error);
            $this->error($this->qiniu->errorStr);
        }else{
            $this->success('改名成功');
        }
    }

    public function batchDel(){
        $files = $_GET['key'];
        if(is_array($files) && $files !== array()){
            $files = array_column($files,'value');
            $result = $this->qiniu->delBatch($files);
            if(false === $result){
                $this->error($this->qiniu->errorStr);
            }else{
                $this->success('删除成功');
            }
        }else{
            $this->error('请至少选择一个文件');
        }
    }

    public function detail($key){
        $result = $this->qiniu->info($key);
        if($result){
            if(in_array($result['mimeType'], array('image/jpeg','image/png'))){
                $img = "<img src='{$this->qiniu->downlink($key)}?imageView/2/w/203/h/203'>";
            }else{
                $img = '<img class="file-prev" src="https://dn-portal-static.qbox.me/v104/static/theme/default/image/resource/no-prev.png">';
            }
            $time = date('Y-m-d H:i:s', bcmul(substr(strval($result['putTime']), 0, 11),"1000000000"));
            $filesize = format_bytes($result['fsize']);
            $tpl = <<<tpl
            <div class="right-head">
                {$key}
            </div>
            <div class="right-body">
                <div class="right-body-block">
                    <div class="prev-block">
                        {$img}
                    </div>
                    <p class="file-info-item">
                        外链地址：<input class="file-share-link" type="text" readonly="readonly" value="{$this->qiniu->downlink($key)}">
                    </p>
                    <p class="file-info-item">
                        最后更新时间：<span>{$time}</span>
                    </p>
                    <p class="file-info-item">
                        文件大小：<span class="file-size">{$filesize}</span>
                    </p>
                </div>
            </div>
tpl;
            $this->success('as', '', array('tpl'=>$tpl));
        }else{
            $this->error('获取文件信息失败');
        }

    }
    
    public function upload($isBtch=false){
        $file = $_FILES['qiniu_file'];
        if ($isBtch){//多图上传

        }
        
    }

    //上传单个文件 用uploadify
    public function uploadOne(){
//         $url = $this->qiniu->privateDownloadUrl('http://7xrade.com2.z0.glb.qiniucdn.com/10510507_192528089311_2.jpg');

        $file = $_FILES['qiniu_file'];

        $file = array(
            'name'=>'file',
            'fileName'=>$file['name'],
            'fileBody'=>file_get_contents($file['tmp_name'])
        );
        $result = $this->qiniu->upload($this->config, $file);
        
        
        dump($result);
        exit();
         if($result){
             $result['private_download_url'] = $this->qiniu->privateDownloadUrl($result['key']);
             return $result;
//             $this->success('上传成功','', $result);
        }else{
            $this->error('上传失败','', array(
                'error'=>$this->qiniu->error,
                'errorStr'=>$this->qiniu->errorStr
            ));
        } 
        exit;
    }

}
