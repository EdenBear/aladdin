
/*==============================================================*/
/* Table: t_cart_product_sku  业务配置记录表
/* Date:  2016-2-24
/* Create: ek                          
/*==============================================================*/
drop table if exists t_config_common;
CREATE TABLE `t_config_common` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(20) NOT NULL COMMENT '标签名字(前缀可使用控制器名称),json格式',
  `config` varchar(255) NOT NULL,
  `update` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_LABEL` (`label`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='业务自定义配置';

/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/2/25 19:13:21                           */
/*==============================================================*/


drop table if exists t_cart_product_sku;

drop table if exists t_product_attr;

drop table if exists t_product_attr_value;

drop table if exists t_product_sku;

drop table if exists t_product_sku_attr;

drop table if exists t_product_stock;

/*==============================================================*/
/* Table: t_cart_product_sku                                    */
/*==============================================================*/
create table t_cart_product_sku
(
   ID                   int not null auto_increment,
   shopCarID            varchar(20),
   productID            int,
   count                int,
   skuID                int,
   status               varchar(3) comment 'OK#：正常，可用
            DEL：已删除',
   delTime              datetime,
   createTime           datetime,
   primary key (ID)
);

alter table t_cart_product_sku comment '购物车商品关系表';

/*==============================================================*/
/* Table: t_product_attr                                        */
/*==============================================================*/
create table t_product_attr
(
   ID                   int not null auto_increment,
   productID            int,
   attrName             varchar(30),
   sortOrder            int,
   uid                  int,
   createTime           datetime,
   primary key (ID)
);

alter table t_product_attr comment '存储产品的属性：
颜色：红色/白色/蓝色
尺码：37/38/39
鞋子颜色红色存为一';

/*==============================================================*/
/* Table: t_product_attr_value                                  */
/*==============================================================*/
create table t_product_attr_value
(
   ID                   int not null auto_increment,
   attrID               int,
   attrValue            varchar(50) comment ' 属性值：红色
            ',
   attrValueImg         varchar(500) comment '图片的http访问路径
            ',
   uid                  int,
   sortOrder            int,
   createTime           datetime,
   primary key (ID)
);

alter table t_product_attr_value comment '例如：
颜色：红色/白色/蓝色
红色就是颜色的可选值，保存为一条记录';

/*==============================================================*/
/* Table: t_product_sku                                         */
/*==============================================================*/
create table t_product_sku
(
   ID                   int not null auto_increment,
   productID            int,
   applyPrice           bigint(20) DEFAULT NULL COMMENT '供货价',
   skuPrice             bigint(20) DEFAULT NULL COMMENT '销售价',
   skuImg               varchar(200),
   skuStock             int,
   createTime           datetime,
   uid                  int,
   primary key (ID)
);

alter table t_product_sku comment '产品的属性，例如颜色，尺码等
鞋子的属性：红色43码，红色44码
使用单一属性管理产品';

/*==============================================================*/
/* Table: t_product_sku_attr                                    */
/*==============================================================*/
create table t_product_sku_attr
(
   ID                   int not null auto_increment,
   skuID                int,
   attrID               varchar(30),
   attrValueID          varchar(30),
   sortOrder            int,
   createTime           datetime,
   uid                  int,
   primary key (ID)
);

alter table t_product_sku_attr comment '存储sku的属性记录。
关联关系：
商品SKU表：商品属性表=1：N
商品属性表：商';

/*==============================================================*/
/* Table: t_product_stock                                       */
/*==============================================================*/
drop table if exists t_product_stock;
create table t_product_stock
(
   ID                   int not null,
   skuID                int,
   optType              varchar(3) comment 'ADD：增加库存
            DEL：删除库存',
   uid                  int,
   count                int,
   createTime           datetime,
   primary key (ID)
);

alter table t_product_stock comment '保存商品库存操作记录';



/*==============================================================*/
/* Table: t_product 
/* 2016-2-29                                            */
/*==============================================================*/
drop table if exists t_product;

/*==============================================================*/
/* Table: t_product                                             */
/*==============================================================*/
CREATE TABLE `t_product` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `brandID` int(11) DEFAULT NULL COMMENT '品牌ID',
  `categoryID` int(11) DEFAULT NULL COMMENT '商品类目ID.必须是叶子类目ID',
  `supplyID` int(11) DEFAULT NULL COMMENT '供应商ID',
  `shortName` varchar(10) DEFAULT NULL COMMENT '商品简称',
  `productName` varchar(40) DEFAULT NULL COMMENT '商品名称',
  `sellDesc` varchar(20) DEFAULT NULL COMMENT '商品卖点说明文字\r\n            例如：全网最便宜',
  `sellType` varchar(40) DEFAULT NULL COMMENT '营销类型：\r\n            普通商品：NOR\r\n            1元购商品：YI#\r\n            砍价购商品：KAN\r\n            拼团购商品：PIN\r\n            ',
  `productCode` varchar(30) DEFAULT NULL COMMENT '商品自编号',
  `weight` bigint(20) DEFAULT NULL COMMENT '重量，单位：克',
  `price` bigint(20) DEFAULT NULL COMMENT '商品列表时显示的价格',
  `collects` int(11) DEFAULT NULL COMMENT '收藏量',
  `views` int(11) DEFAULT NULL COMMENT '点击一次商品详情页，增加一次',
  `sellCount` int(11) DEFAULT NULL COMMENT '总销量',
  `limitCount` int(11) DEFAULT NULL COMMENT '限购数量',
  `sortOrder` int(11) DEFAULT NULL COMMENT '显示顺序',
  `platform` varchar(3) DEFAULT NULL COMMENT 'APP："APP"\r\n            微信："WX#"\r\n            facebook："FB#"\r\n            PC："PC#"',
  `minusStock` varchar(3) DEFAULT NULL COMMENT '拍下减："GET"\r\n            付款减："PAY"',
  `status` varchar(3) DEFAULT NULL COMMENT '上架：UP#\r\n            已下架：DW#\r\n            删除：DEL',
  `uid` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';





/*==============================================================*/
/* Table: t_product_img   商品图片表                                           */
/*==============================================================*/
drop table if exists t_product_img;
CREATE TABLE `t_product_img` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` int(11) DEFAULT NULL,
  `imgPos` varchar(3) DEFAULT NULL COMMENT '主图："MAJ"，商品列表时显示的图片，商品详情时的大图\r\n            附图："SEC"，商品详情的滚动图片\r\n            \r\n            \r\n            \r\n            ',
  `status` varchar(3) DEFAULT NULL COMMENT 'OK#：正常，可用\r\n            DEL：已删除\r\n            ',
  `imgPath` varchar(500) DEFAULT NULL COMMENT '图片的http访问路径\r\n            ',
  `uid` int(11) DEFAULT NULL COMMENT '后台用户id',
  `sortOrder` int(11) DEFAULT NULL COMMENT '显示顺序',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: t_product_img   商品详情表                                           */
/*==============================================================*/
drop table if exists t_product_detail;
CREATE TABLE `t_product_detail` (
  `ID` int(11) NOT NULL,
  `productID` int(11) DEFAULT NULL,
  `productDesc` text COMMENT '商品详情',
  `uid` int(11) DEFAULT NULL COMMENT '后台用户id',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品详情表，保存商品详情描述的html富文本大字段';



/*==============================================================*/
/* 商品表补充字段
/*==============================================================*/
ALTER TABLE `t_product`
ADD COLUMN `applyPrice`  bigint(20) NULL COMMENT '供货价' AFTER `price`
ALTER TABLE `t_product_detail`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `createTime`
ALTER TABLE `t_product_img`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `createTime`
ALTER TABLE `t_product_sku_attr`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `uid`
ALTER TABLE `t_product_attr`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `createTime`
ALTER TABLE `t_product_attr_value`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `createTime`
ALTER TABLE `t_product_sku`
ADD COLUMN `sortOrder`  int(11) NULL COMMENT '排序' AFTER `createTime`
ADD COLUMN `updateTime`  datetime NULL COMMENT '更新时间' AFTER `sortOrder`

ALTER TABLE `t_product_sku`
ADD COLUMN `key`  varchar(80) NULL COMMENT 'sku数据的标记，也是attrvalue的id配对' AFTER `uid`

ALTER TABLE `t_product_sku`
ADD COLUMN `name`  varchar(200) NULL COMMENT 'sku数据的标记的名称' AFTER `key`

ALTER TABLE `t_product_stock`
MODIFY COLUMN `ID`  int(11) NOT NULL AUTO_INCREMENT FIRST

ALTER TABLE `t_product_sku`
ADD COLUMN `status`  varchar(3) NULL COMMENT '状态' AFTER `updateTime`