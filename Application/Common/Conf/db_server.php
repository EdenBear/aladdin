<?php
// +----------------------------------------------------------------------
// | Date:2016年2月24日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 正式生产环境数据连接文件
// +----------------------------------------------------------------------

return array(
    /* 默认本地数据库配置 */
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '112.74.19.227', // 服务器地址
    'DB_NAME'   => 'aladdin_other', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '79970531@qq.com',  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => 't_', // 数据库表前缀



    // 'SESSION_TYPE'  => 'redis',
//数据库配置,按照模块命名，以防后期拆库
    'DB_PRODUCT'          =>"mysql://root:79970531@qq.com@112.74.19.227:3306/aladdin_product_sku_user",     //商品模块
    'DB_PRODUCT_BRAND'    =>"mysql://root:79970531@qq.com@112.74.19.227:3306/aladdin_product_sku_user", //商品品牌
    'DB_PRODUCT_CATEGORY' =>"mysql://root:79970531@qq.com@112.74.19.227:3306/aladdin_product_sku_user",//商品分类
    'DB_PRODUCT_USER'     =>"mysql://root:79970531@qq.com@112.74.19.227:3306/aladdin_product_sku_user",  //用户信息
    'DB_PRODUCT_USER_ADDRESS'=>"mysql://root:79970531@qq.com@112.74.19.227:3306/aladdin_product_sku_user", //用户地址
    
    
);
