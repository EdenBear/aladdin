<?php
use Think\PHPExcel;
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
    if (!$url) return '';
    
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
    $num = round((float)$num,2);
    
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
    $num = round((float)$num,2);
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
 * 数组格式转换，
 * @param unknown $data    数据源
 * @param string $fieldName 输出某个字段的值集合，默认是‘id’
 * @param string $aryIndexName 某个字段作为索引值
 * @return unknown
 * date:2016年3月17日
 * author: EK_熊
 */
function data_shift($data,$fieldName='id',$aryIndexName=''){

    foreach ($data as $key => $val){

        $idList[] = $val[$fieldName];
        if ($aryIndexName) {
            $ret['data'][$val[$aryIndexName]] = $val;
        }else{
            $ret['data'][] = $val;
        }

    }
    $ret["{$fieldName}_list"] =  array_values(array_unique($idList));
    return $ret;
}

/**
 * 根据mqid，获取单条麦圈用户信息
 * @param unknown $mqid
 * @return Ambigous <mixed, boolean, NULL, string, unknown, multitype:, object>
 * date:2016年3月18日
 * author: EK_熊
 */
function get_mpdetail_one($mqid){
    $userModel = M('User','','DB_PRODUCT_USER');
    $where['mqID'] = $mqid;
    return $userModel->where($where)->find();
}

/**
 * 获取状态标记和输出的转换
 * @param unknown $val   标记值，
 * @param unknown $type  要转换的类型，或是是哪张表，比如订单，支付
 * date:2016年3月18日
 * author: EK_熊
 */
function get_status($val,$type){
    $val = strtoupper($val);
    $type = strtolower($type);
    $status = array(
        'pay' =>['ALI'=>'支付宝','WXP'=>'微信','PAY'=>'贝宝','SUM'=>'余额支付'],
        'order' =>['CAN'=>'已取消','COM'=>'已完成'],
    );
    return $status[$type][$val];
    
}

 
/**
 * 
 * 导出EXCEL文件
 * @param string $data	数据内容   例如： $data=[array('name'=>'李磊','id'=>'1',),....]
 * @param strin $fieldVal	data输出显示字段和表数据字段的对应关系,例如 array('供应商'=>'supname','订单金额'=>'ordersum',)
 * @param strin $type 输出形式 1为直接下载 2为保存
 * @param strin $path 保存位置type1时该值为下载文件名，type为2时有效
 * @return NULL|string
 * date:2016年3月19日
 * author: EK_熊
 */
function excel_output($data,$fieldVal=array(),$path="",$type=1){
    $Cellfield= array_keys($fieldVal);
    $field = array_values($fieldVal);
    if(!$field)
        return null;
    if(!$Cellfield)
        $Cellfield = $field;
    $type = ($type==2)?2:1;
    $chars = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

    $objExcel = new PHPExcel();
    $objActSheet = $objExcel->getActiveSheet();
    $length = sizeof($field);
    //字段
    $i = 0;
    foreach($Cellfield as $f){
        $objActSheet->setCellValue($chars[$i]."1", $f);
        $i++;
    }

    $j = 2;
    foreach($data as $item){

        for($i=0;$i<$length;$i++){
            $key = $field[$i];
            $objActSheet->setCellValue($chars[$i].$j, " ".$item[$key]);
        }
        $j++;
    }

    $objWriter = \PHPExcel_IOFactory::createWriter($objExcel, 'Excel2007');
    if($type==1){
        if(!$path)
            $path = "download.xlsx";
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");
        header('Content-Disposition:inline;filename="'.$path.'"');
        header("Content-Transfer-Encoding: binary");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Pragma: no-cache");
        $objWriter->save('php://output');
        exit;
    }else{
        if(!$path)
            return null;
        $objWriter->save($path);
        return $path;
    }

}

/**
 * 导入EXCEL文件
 * @param string $path	导入文件地址
 * @param string $startline 从第几行开始默认为2
 * @return array $return
 */
function excel_input($path,$startline=2){
    if(!$path)
        return null;
//     $objExcel = new \Libs\Util\PHPExcel();
    //$PHPReader = \Libs\Util\PHPExcel_IOFactory::load($file);
    $objExcel = new PHPExcel();
    $PHPExcel = \PHPExcel_IOFactory::load($path);
    $currentSheet = $PHPExcel->getSheet(0);
    //取得一共有多少列
    $allColumn = $currentSheet->getHighestColumn();
    //取得一共有多少行
    $allRow = $currentSheet->getHighestRow();
    //循环读取数据,默认是utf-8输出
    $return = array();
    $key = 0;
    for($currentRow = $startline;$currentRow<=$allRow;$currentRow++)
    {
        for($currentColumn='A';$currentColumn<=$allColumn;$currentColumn++)
        {
            $address = $currentColumn.$currentRow;
            $getValue = $currentSheet->getCell($address)->getValue();
            if (is_numeric($getValue) && is_float( $getValue)){
                $getValue = gmdate("Y-m-d H:i:s",PHPExcel_Shared_Date::ExcelToPHP($getValue));
            }
            $return[$key][] =$getValue;
        }
        $key++;
    }
    return $return;
}



/**
 * 补充添加字段值
 * 连接用户数据表，获取相关字段值，采用分批查询，循环添加补充字段
 * @param unknown $data         要连接的表模型
 * @param string $onField       数据源的关联字段，例如mqID，名称大小写要和表字段名一致
 * @param string $targetOnField 目标表的关联字段，例如mqID，名称大小写要和表字段名一致
 * @param string $field         需要获取user的字段
 * @return unknown
 * date:2016年3月19日
 * author: EK_熊
 */
function push_field_fromTable($data,$model,$onField='mqID',$targetOnField='mqID',$field='nickName'){
//     $userModel = M('User','','DB_PRODUCT');
    $onField_lower = strtolower($onField);  //连接字段转小写  
    $targetOnField_lower = strtolower($targetOnField);  //连接字段转小写  
    
    $data_shift = data_shift($data,$onField_lower);
    
    $info_map[$targetOnField] = array('IN',$data_shift["{$onField_lower}_list"]);
    $field = "{$targetOnField},{$field}";

    $info = $model->where($info_map)->field($field)->select();
    $info = data_shift($info,$onField_lower,$targetOnField_lower);
    $field = explode(',',$field);


    for ($i=0;$i<count($data);$i++){

        if ($info['data'][$data[$i][$onField_lower]]) {
            
            $data[$i] = array_merge($data[$i],$info['data'][$data[$i][$onField_lower]]);
        }
        
    }

    
    return $data;
    
}
