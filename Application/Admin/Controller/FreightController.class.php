<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: han <han@163.com>
// +----------------------------------------------------------------------

namespace Admin\Controller;

/**
 * 运费模板管理控制器
 * @author han <glghan@sina.com>
 */
class FreightController extends AdminController{
	/**
	 * 运费模板列表
	 * @author han <glghan@sina.com>
	 */
	public function freightList(){
		$this->meta_title = '运费模板列表';
		$list       =   M('freight_tpl','','DB_PRODUCT')->where('status="OK#" and freightType!="NOT"')->select();
		$request    =   (array)I('request.');
        $total      =   $list? count($list) : 1 ;
        $listRows   =   C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
        $page       =   new \Think\Page($total, $listRows, $request);
        $voList     =   array_slice($list, $page->firstRow, $page->listRows);
        $p          =   $page->show();
        //echo '<pre>';
        //var_dump($voList);exit;
		$this->assign('_list', $voList);
		$this->assign('_page', $p? $p: '');
		// 记录当前列表页的cookie
		Cookie('__forward__',$_SERVER['REQUEST_URI']);
		$this->display();
	}
	
	/**
	 * 添加运费模板
	 * @author han <glghan@sina.com>
	 */
	public function addFreight(){
		
		if(IS_POST){
			$freight = M('freight_tpl','','DB_PRODUCT');
			$data = $freight->create();
			if(!empty($data)){
				if(!$data['fullStatus']){
					$data['fullStatus'] = 'FOR';
					$data['fullSum'] = '0';
				}
				$data['status'] = 'OK#';
				$data['uid'] = UID;
				$data['supplyID'] = 2;
				$data['sortOrder'] =3;
				$data['firstFreight'] = $data['firstFreight']*100;
				$data['secFreight'] = $data['secFreight']*100;
				$data['fullSum'] = $data['fullSum']*100;
				$data['createTime'] = date('Y-m-d H:i:s',time());
				$data['updateTime'] = date('Y-m-d H:i:s',time());
	            
	            $id = $freight->add($data);
	            if($id){
	                 session('ADD_FREIGHT',null);
	                 //记录行为
	                 action_log('update_freight_tpl', 'freight_tpl', $id, UID);
	                 $this->success('新增成功', U('freightList'));exit;
	             } else {
	                 $this->error('新增失败');
	             }
            } else {
                $this->error($freight->getError());
            }
		}
		$this->display();
	}
	
	/**
	 * 编辑运费模板
	 * @author han <glghan@sina.com>
	 */
	public function editFreight(){
		$freight = M('freight_tpl','','DB_PRODUCT');
		
		if(IS_POST){			
            $data = $freight->create();
            
            if($data){
            	$data['firstFreight'] = $data['firstFreight']*100;
            	$data['secFreight'] = $data['secFreight']*100;
            	$data['fullSum'] = $data['fullSum']*100;
            	$data['updateTime'] = date('Y-m-d H:i:s',time());
            	if(!$data['fullStatus']){
            		$data['fullStatus'] = 'FOR';
            	}
            	$result = $freight->save($data);
                if($result){
                    session('ADMIN_MENU_LIST',null);
                    //记录行为
                    action_log('update_freight', 'freight', $data['id'], UID);
                    $this->success('更新成功', Cookie('__forward__'));exit;
                } else {
                    $this->error('更新失败');
                }
            } else {
                $this->error($freight->getError());
            }
		}
		
		$id = I('get.id');
		$info = $freight->field(true)->find($id);
		$this->assign('info', $info);
		$this->display();
	}
	

	/**
	 * 删除运费模板
	 * @author han <glghan@sina.com>
	 */
	public function delFreight($id=''){
		$freight = M('freight_tpl','','DB_PRODUCT');
		$data['ID'] = $id;
		$data['status'] = 'DEL';
		$data['delTime'] = date('Y-m-d H:i:s',time());
		if($data){
			$result = $freight->save($data);
			if($result){
				session('DELETE_FREIGHT',null);
				//记录行为
				action_log('delete_freight_tpl', 'freight', $data['id'], UID);
				$this->success('删除成功', Cookie('__forward__'));exit;
			} else {
				$this->error('删除失败');
			}
		} else {
			$this->error($freight->getError());
		}
	}
	
	/**
	 * 指定地区
	 * @author han <glghan@sina.com>
	 */
	public function areaList(){
		$this->meta_title = '指定地区列表';
		$where = "status='OK#'";
		$freightID = I('get.id');
		$where .= " AND freightTplID=$freightID";
		if(IS_POST){
			$area = I('post.area');
			$where .= " AND address like '%$area%'";
			//var_dump($where);exit();
		}
		
		$list       =   M('freight_tpl_except','','DB_PRODUCT')->where($where)->select();
		$request    =   (array)I('request.');
		$total      =   $list? count($list) : 1 ;
		$listRows   =   C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
		$page       =   new \Think\Page($total, $listRows, $request);
		$voList     =   array_slice($list, $page->firstRow, $page->listRows);
		$p          =   $page->show();
		$this->assign('id',$freightID);
		$this->assign('_list', $voList);
		$this->assign('_page', $p? $p: '');
		// 记录当前列表页的cookie
		Cookie('__forward__',$_SERVER['REQUEST_URI']);
		$this->display();
	}
	
	/**
	 * 添加指定地区
	 * @author han <glghan@sina.com>
	 */
	public function addArea(){
		$freightID = I('get.id');
		if(IS_POST){
			$data = M('freight_tpl_except','','DB_PRODUCT')->create();
			if(!empty($data)){
				if(!$data['fullStatus']){
					$data['fullStatus'] = 'FOR';
					$data['fullSum'] = '0';
				}
				$data['status'] = 'OK#';
				$data['uid'] = UID;
				$data['supplyID'] = 2;
				$data['sortOrder'] =3;
				$data['firstFreight'] = $data['firstFreight']*100;
				$data['secFreight'] = $data['secFreight']*100;
				$data['fullSum'] = $data['fullSum']*100;
				$data['createTime'] = date('Y-m-d H:i:s',time());
				$data['updateTime'] = date('Y-m-d H:i:s',time());
				
				$id = M('freight_tpl_except','','DB_PRODUCT')->add($data);
				if($id){
					session('FREIGHT_TPL_EXCEPT_ADD',null);
					//记录行为
					action_log('update_freight_tpl_except', 'freight_tpl_except', $id, UID);
					$this->success('新增成功', Cookie('__forward__'));exit;
				} else {
					$this->error('新增失败');
				}
			}else {
				$this->error(M('freight_tpl_except','','DB_PRODUCT')->getError());
			}
		}
		$country = M('xbdistrict')->db(3,'DB_CONFIG3')->where('pid=0')->select();
		
		$this->assign('country',$country);
		$this->assign('id',$freightID);
		$this->display();
	}
	
	/**
	 * 编辑指定地区
	 * @author han <glghan@sina.com>
	 */
	public function editArea(){
		$areaModel = M('freight_tpl_except','','DB_PRODUCT');
		if(IS_POST){
			$data = $areaModel->create();
		
            if($data){
            	$data['firstFreight'] = $data['firstFreight']*100;
            	$data['secFreight'] = $data['secFreight']*100;
            	$data['fullSum'] = $data['fullSum']*100;
            	$data['updateTime'] = date('Y-m-d H:i:s',time());
            	if(!$data['fullStatus']){
            		$data['fullStatus'] = 'FOR';
            	}
            	$result = $areaModel->save($data);
                if($result){
                    session('ADMIN_MENU_LIST',null);
                    //记录行为
                    action_log('update_freight_tpl_except', 'freight', $data['id'], UID);
                    $this->success('更新成功', Cookie('__forward__'));exit;
                } else {
                    $this->error('更新失败');
                }
            } else {
                $this->error($areaModel->getError());
            }
		}
		
		$id = $_GET['id'];
		$area = $areaModel->where('id='.$id)->select();
		$country = M('xbdistrict','','DB_CONFIG3')->where('pid=0')->select();
		//var_dump($area);exit();
		$this->assign('country',$country);
		$this->assign('area',$area);
		$this->display();
	}
	
	/**
	 * 删除指定地区
	 * @author han <glghan@sina.com>
	 */
	public function delArea($id=''){
		$freight = M('freight_tpl_except','','DB_PRODUCT');
		$data['ID'] = $id;
		$data['status'] = 'DEL';
		$data['delTime'] = date('Y-m-d H:i:s',time());
		if($data){
			$result = $freight->save($data);
			if($result){
				session('ADMIN_FREIGHT_TPL_EXCEPT_DELETE',null);
				//记录行为
				action_log('delete_freight_tpl_except', 'freight', $data['id'], UID);
				$this->success('删除成功', Cookie('__forward__'));exit;
			} else {
				$this->error('删除失败');
			}
		} else {
			$this->error($freight->getError());
		}
	}
	
	/**
	 * 获取地区
	 * @author han <glghan@sina.com>
	 */
	public function getAddressByPid(){
		$pid = $_POST['pid'];
		$address = M('xbdistrict','','DB_CONFIG3')->where('pid='.$pid)->select();
		echo json_encode($address);
	}
}	
