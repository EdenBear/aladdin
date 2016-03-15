<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: han <ghan@sina.com>
// +----------------------------------------------------------------------

namespace Admin\Controller;

/**
 * 行为控制器
 * @author huajie <banhuajie@163.com>
 */
class SupplierActionController extends AdminController {

    /**
     * 行为日志列表
     * @author huajie <banhuajie@163.com>
     */
    public function actionLog(){
        //获取列表数据
        $map['status']    =   array('gt', -1);
        $list   =   $this->lists('ActionLog', $map);
        int_to_string($list);
        foreach ($list as $key=>$value){
            $model_id                  =   get_document_field($value['model'],"name","id");
            $list[$key]['model_id']    =   $model_id ? $model_id : 0;
        }
        $this->assign('_list', $list);
        $this->meta_title = '行为日志';
        $this->display();
    }
    
    protected function lists ($model,$where=array(),$order='',$field=true){
    	$options    =   array();
    	$REQUEST    =   (array)I('request.');
    	if(is_string($model)){
    		$model  =   M($model,'','DB_CONFIG4');
    	}
    
    	$OPT        =   new \ReflectionProperty($model,'options');
    	$OPT->setAccessible(true);
    
    	$pk         =   $model->getPk();
    	if($order===null){
    		//order置空
    	}else if ( isset($REQUEST['_order']) && isset($REQUEST['_field']) && in_array(strtolower($REQUEST['_order']),array('desc','asc')) ) {
    		$options['order'] = '`'.$REQUEST['_field'].'` '.$REQUEST['_order'];
    	}elseif( $order==='' && empty($options['order']) && !empty($pk) ){
    		$options['order'] = $pk.' desc';
    	}elseif($order){
    		$options['order'] = $order;
    	}
    	unset($REQUEST['_order'],$REQUEST['_field']);
    
    	if(empty($where)){
    		//$where  =   array('status'=>array('egt',0));
    	}
    	if( !empty($where)){
    		$options['where']   =   $where;
    	}
    	$options      =   array_merge( (array)$OPT->getValue($model), $options );
    	$total        =   $model->where($options['where'])->count();
    
    	if( isset($REQUEST['r']) ){
    		$listRows = (int)$REQUEST['r'];
    	}else{
    		$listRows = C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
    	}
    	$page = new \Think\Page($total, $listRows, $REQUEST);
    	if($total>$listRows){
    		$page->setConfig('theme','%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END% %HEADER%');
    	}
    	$p =$page->show();
    
    	$this->assign('_page', $p? $p: '');
    	$this->assign('_total',$total);
    	$options['limit'] = $page->firstRow.','.$page->listRows;
    
    	$model->setProperty('options',$options);
    
    	return $model->field($field)->select();
    }

    /**
     * 查看行为日志
     * @author huajie <banhuajie@163.com>
     */
    public function edit($id = 0){
        empty($id) && $this->error('参数错误！');

        $info = M('ActionLog','','DB_CONFIG4')->field(true)->find($id);

        $this->assign('info', $info);
        $this->meta_title = '查看行为日志';
        $this->display();
    }

    /**
     * 删除日志
     * @param mixed $ids
     * @author huajie <banhuajie@163.com>
     */
    public function remove($ids = 0){
        empty($ids) && $this->error('参数错误！');
        if(is_array($ids)){
            $map['id'] = array('in', $ids);
        }elseif (is_numeric($ids)){
            $map['id'] = $ids;
        }
        $res = M('ActionLog','','DB_CONFIG4')->where($map)->delete();
        if($res !== false){
            $this->success('删除成功！');
        }else {
            $this->error('删除失败！');
        }
    }

    /**
     * 清空日志
     */
    public function clear(){
        $res = M('ActionLog','','DB_CONFIG4')->where('1=1')->delete();
        if($res !== false){
            $this->success('日志清空成功！');
        }else {
            $this->error('日志清空失败！');
        }
    }

}
