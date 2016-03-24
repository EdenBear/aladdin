<?php
// +----------------------------------------------------------------------
// | Date:2016年3月24日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于数据库连接配置
// +----------------------------------------------------------------------
return array(
    /* 默认本地数据库配置 */
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => DB_HOST, // 服务器地址
    'DB_NAME'   => 'aladdin_other', // 数据库名
    'DB_USER'   => DB_USER, // 用户名
    'DB_PWD'    => DB_PWD,  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => 't_', // 数据库表前缀



    // 'SESSION_TYPE'  => 'redis',
//数据库配置,按照模块命名，以防后期拆库
    'DB_PRODUCT'          =>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_product_sku_user",     //商品模块
    'DB_PRODUCT_BRAND'    =>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_product_sku_user", //商品品牌
    'DB_PRODUCT_CATEGORY' =>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_product_sku_user",//商品分类
    'DB_PRODUCT_USER'     =>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_product_sku_user",  //用户信息
    'DB_PRODUCT_USER_ADDRESS'=>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_product_sku_user", //用户地址

    /* 供应商库*/
    'DB_SUPPLIER'=>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_supplier",

    /* 订单库 */
    'DB_ORDER'=>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_order",//订单主表

    /* 拼团库 */
    'DB_PIN'=>"mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_order",//订单主表

    'DB_CONFIG3' => "mysql://".DB_USER.":".DB_PWD."@".DB_HOST.":3306/aladdin_other",


);