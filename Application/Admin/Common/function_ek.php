<?php
// +----------------------------------------------------------------------
// | Date:2016年2月23日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于业务公共方法
// +----------------------------------------------------------------------


/**
 * 设置业务配置信息
 * 对应的表 t_configcommon
 * @param string $label   标签名称
 * @param array $config   配置信息 数组格式
 * @return 
 * date:2016年2月23日
 * author: EK_熊
 */
function set_config_common($label='',$config=array()){
    if (!is_array($config)) {
        return false;
    }
    
    $configModel = M('ConfigCommon');
    $configJson = json_encode($config);
    $findLabel = $configModel->where("label='$label'")->find();
    
    if (empty($findLabel)) { //不存在该标签，进行添加操作
        $add = array(
            'label'  => $label,
            'config' => $configJson,
            'update' => time(),
        );
        $setRet = $configModel->add($add);
    }else{                  //存在该配置标签，进行更新配置信息
        $save = array(
            'config' =>$configJson,
            'update' =>time(),
        );
        $setRet = $configModel->where('id='.$findLabel['id'])->save($save);
    }
    if ($setRet){
        F('cfg_com_'.$label, $config);//配置信息，写入文件缓存
        return $setRet;
    }
    return false;
}

/**
 * 根据标签名称，获取业务公共配置信息；
 * 从缓存文件获取，返回数组格式
 * @param unknown $label 配置标签名称
 * date:2016年2月23日
 * author: EK_熊
 */
function get_config_common($label){

    $cacheCfg = F('cfg_com_'.$label);
    return $cacheCfg;
    
}

/**
 * 转换秒数
 * @param unknown $name 年，月，日，小时
 * @param unknown $num 数量
 * @return number
 * date:2016年2月23日
 * author: EK_熊
 */
function switchToSecond($name, $num){
    switch ($name) {
        case 'day' :
            $sec = $num*86400;
            break;
        case 'month':
            $sec = $num*30*8600;
            break;
        case 'hour':
            $sec = $num*60*60;
            break;
    }
    return $sec;
}

function Qiniu_Encode($str) // URLSafeBase64Encode
{
    $find = array('+', '/');
    $replace = array('-', '_');
    return str_replace($find, $replace, base64_encode($str));
}

/**
 * 获取七牛私有空间资源路径的凭证加密方法
 * @param unknown $url
 * @return string
 * date:2016年2月28日
 * author: EK_熊
 */
function qiniu_private_url($url) {//$info里面的url
    $setting = C ( 'UPLOAD_QINIU_CONFIG' );
    $duetime = NOW_TIME + 86400;//下载凭证有效时间
    $DownloadUrl = $url . '?e=' . $duetime;
    $Sign = hash_hmac ( 'sha1', $DownloadUrl, $setting ["driverConfig"] ["secrectKey"], true );
    $EncodedSign = Qiniu_Encode ( $Sign );
    $Token = $setting ["driverConfig"] ["accessKey"] . ':' . $EncodedSign;
    $RealDownloadUrl = $DownloadUrl . '&token=' . $Token;
    return $RealDownloadUrl;
}

/**
 * 图片上传，使用七牛驱动
 * 前端input的name值设置为'qiniu[]'
 * 
 * date:2016年2月28日
 * author: EK_熊
 */
function qiniu_upload($isPublic = false){
    if (!$_FILES) return false;
    
    if ($isPublic) {
        $setting=C('UPLOAD_QINIU_PUBLIC_CONFIG');//公库配置
    }else{
        $setting=C('UPLOAD_QINIU_CONFIG');//私库配置
    }
    
    $Upload = new \Think\Upload($setting);
    $info = $Upload->upload($_FILES);
    foreach ($info as $key=>$val) {
        $info[$key]['qiniuPrivateUrl'] = qiniu_private_url($val['url']);//返回私有空间访问链接
    }
    return $info;
}

/**
 * 重量单位转换，
 * @param unknown $units  要转换的目标单位，'g','kg'
 * @param unknown $num    数量值
 * @return number
 * date:2016年3月3日
 * author: EK_熊
 */
function weight_format($num,$units=''){
    $num = intval($num);
    switch ($units){
        case 'kg': $ret = $num/1000;break;
        case 'g': $ret = $num*1000;break;
        default : $ret = false;
    }
    return $ret;
}

/**
 * 金钱单位换算,元和分之间的换算
 * @param unknown $units  单位：元 'yuan', 分'ten'
 * @param unknown $num
 * date:2016年3月3日
 * author: EK_熊
 */
function mony_format($num,$units='ten'){
    $num = intval($num);

    switch ($units){
        case 'yuan': $ret = $num/100;break;
        case 'ten': $ret = $num*100;break;
        default : $ret = false;
    }
    return $ret;
}


/**
 * 计算数组的维度，返回维度
 * @param unknown $arr
 * date:2016年3月10日
 * author: EK_熊
 */
function array_level($arr){
    $al = array(0);
    function aL($arr,&$al,$level=0){
        if(is_array($arr)){
            $level++;
            $al[] = $level;
            foreach($arr as $v){
                aL($v,$al,$level);
            }
        }
    }
    aL($arr,$al);
    return max($al);
}

/**
 * 数据批量更新处理,包含批量更新
 * @param unknown $model
 * @param unknown $map
 * @param unknown $saveData
 * @param string $tableName
 * date:2016年3月10日
 * author: EK_熊
 */
function update_all($model,$map=array(),$saveData=array(),$tableName=''){
    $ret['status'] = null;
    $dataLevel = array_level($saveData);
    $ret['info'] = "{$tableName}表批量更新成功！";
    $ret['status'] = true;

    if ($dataLevel == 1) {
        $update = $model->where($map)->save($saveData);
        if (!$update) {
            $ret['info'] = "{$tableName}表更新出错！";
            $ret['status'] = false;
        }
    }else if($dataLevel == 2){
        $model->startTrans();
        foreach ($saveData as $key => $val){
            $update = $model->where($map)->save($val);
            if (!$update) {
                $ret['info'] = "{$tableName}表批量更新出错！";
                $ret['status'] = false;
                break;
            }
        }

        if ($ret['status']){
            $model->commit();
        }else{
            $model->rollback();
        }
    }

    return $ret;
}
