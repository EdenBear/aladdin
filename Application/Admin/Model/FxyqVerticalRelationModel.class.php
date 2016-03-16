<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: han <ghan@sina.com> 
// +----------------------------------------------------------------------

namespace Admin\Model;
use Think\Model;

/**
 * 会员模型
 * @author ghan <ghan@sina.com>
 */
class FxyqVerticalRelationModel extends Model{

    /**
     * 获取会员详细信息
     * @param  milit   $id 分类ID或标识
     * @param  boolean $field 查询字段
     * @return array     分类信息
     * @author ghan <ghan@sina.com>
     */
    public function info($id, $field = true){
        /* 获取会员信息 */
        $map = array();
        if(is_numeric($id)){ //通过ID查询
            $map['id'] = $id;
        } else { //通过标识查询
            $map['name'] = $id;
        }
        return $this->field($field)->where($map)->find();
    }

    /**
     * 获取会员树，指定会员则返回指定会员及其下级会员，不指定则返回所有会员树
     * @param  integer $id    会员ID
     * @param  boolean $field 查询字段
     * @return array          会员树
     * @author ghan <ghan@sina.com>
     */
    public function getTree($id = 0, $field = true){
        /* 获取当前会员信息 */
        if($id){
            $info = $this->info($id);
            $id   = $info['id'];
        }

        /* 获取所有会员 */        
        $list = $this->db(3,'DB_CONFIG3')->table('t_fxyq_vertical_relation f,aladdin_product_sku_user.t_user u')
        ->field('f.id,f.level,f.isleaf,f.distributionUserId,f.parentDistributionUserId,f.insertTime,u.mobileNum,u.nickName')
        ->where('u.mqID=f.distributionUserId')->select();

        $list = $this->list_to_tree($list, $pk = 'id', $pid = 'parentdistributionuserid', $child = '_');
        /* 获取返回数据 */
        if(isset($info)){ //指定会员则返回当前会员及其下级会员
            $info['_'] = $list;
        } else { //否则返回所有会员
            $info = $list;
        }

        return $info;
    }


    function list_to_tree($list, $pk='id', $pid = 'parentdistributionuserid', $child = '_child') {
        // 创建Tree
        $tree = array();
        if(is_array($list)) {
            // 创建基于主键的数组引用
            $refer = array();
            foreach ($list as $key => $data) {
                $refer[$data[$pk]] =& $list[$key];
            }

            foreach($list as $key => $data){
                //判断是否为父级
                $parentId =  $data[$pid];
                if (empty( $parentId)) {
                    $tree[] =& $list[$key];
                }else{
                    if (isset($refer[$parentId])) {
                        $parent =& $refer[$parentId];
                        $parent[$child][] =& $list[$key];
                    }
                }
            }
        }
        return $tree;
    }


    /**
     * 查询后解析扩展信息
     * @param  array $data 分类数据
     * @author 麦当苗儿 <zuojiazi@vip.qq.com>
     */
    protected function _after_find(&$data, $options){
        /* 分割模型 */
        if(!empty($data['model'])){
            $data['model'] = explode(',', $data['model']);
        }

        if(!empty($data['model_sub'])){
            $data['model_sub'] = explode(',', $data['model_sub']);
        }

        /* 分割文档类型 */
        if(!empty($data['type'])){
            $data['type'] = explode(',', $data['type']);
        }

        /* 分割模型 */
        if(!empty($data['reply_model'])){
            $data['reply_model'] = explode(',', $data['reply_model']);
        }

        /* 分割文档类型 */
        if(!empty($data['reply_type'])){
            $data['reply_type'] = explode(',', $data['reply_type']);
        }

        /* 还原扩展数据 */
        if(!empty($data['extend'])){
            $data['extend'] = json_decode($data['extend'], true);
        }
    }

}
