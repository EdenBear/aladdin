<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

/**
 * 系统调试设置
 * 项目正式部署后请设置为false
 */
define('APP_DEBUG', true );
define('BIND_MODULE','Admin');

define('SITE_PATH', dirname(__FILE__));
define('ROOT_PATH', dirname(SITE_PATH));
define('DS', DIRECTORY_SEPARATOR);
/**
 * 应用目录设置
 * 安全期间，建议安装调试完成后移动到非WEB目录
 */
define ( 'APP_PATH', ROOT_PATH.DS.'Application/' );

/**
 * 缓存目录设置
 * 此目录必须可写，建议移动到非WEB目录
 */
define ( 'RUNTIME_PATH', ROOT_PATH.DS.'Runtime/' );

/**
 *自定义配置目录
 *将ThinkPHP的配置文件挪至其他位置
 */
define('CUSTOM_CONF_PATH',      ROOT_PATH.DS.'onethink/');
// define('CUSTOM_CONF_PATH',      '/mnt/hgfs/tubahu/onethink/');

/**
 * 定义情景配置
 * 正式环境：db_server; 本地开发环境db_local
 */
define('APP_STATUS','db_local');

/**
 * 引入核心入口
 * ThinkPHP亦可移动到WEB以外的目录
 */
require ROOT_PATH.DS.'ThinkPHP/ThinkPHP.php';