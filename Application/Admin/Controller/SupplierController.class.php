<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: han <han@163.com>
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Admin\Service\ApiService;
use User\Api\UserApi;


/**
 * 供应商管理控制器
 * @author han <glghan@sina.com>
 */
class SupplierController extends AdminController{
	
	/**
	 * 供应商列表
	 * @author han <glghan@sina.com>
	 */
	public function supplierList(){
		
        if(IS_POST){
        	$key = I('post.key');
        	$value = I('post.value');
            $map[$key]    =   array('like', '%'.(string)$value.'%');
        }

        $prefix = C('DB_PREFIX');
        $model = M()->db(2,'DB_CONFIG4')->table($prefix.'supplier u')
                    ->join($prefix.'member ua on ua.uid = u.id','left');
        $list   = $this->lists($model, $map,'','u.*,ua.nickname');
        //var_dump($list);exit();
        $this->assign('_list', $list);
        $this->meta_title = '供应商列表';
        $this->display();
	}
	
	/**
	 * 新增供应商
	 * @author han <glghan@sina.com>
	 */
	public function addSupplier(){
		if(IS_POST){
			
			//把供应商注册成用户
			$username = I('username');
			$password = I('password');
			$repassword = I('repassword');
			$email = I('email');
			//var_dump($password);exit();
			/* 检测密码 */
			if($password != $repassword){
				$this->error('密码和重复密码不一致！');
			}
			/* 调用注册接口注册用户 */
            $User   =   new UserApi;
            $uid    =   $User->register($username, $password, $email,$username);
			if(0 < $uid){ //注册成功
				$member = array('uid' => $uid, 'nickname' => I('name'), 'status' => 1);
				$result = M('member','','DB_CONFIG4')->add($member);
			}else { //注册失败，显示错误信息
				$this->error($this->showRegError($uid));
			}
			
			$supplier = M('Supplier','','DB_CONFIG4');
			$data = $supplier->create();
			if($data){
				$data['o2oType'] = 3;
				$data['memberId'] = UID;
				$data['insertTime'] = date('Y-m-d H:i:s',time());
				$data['updateTime'] = date('Y-m-d H:i:s',time());
				
				$sid = $supplier->add($data);
				
				//添加到用户与供应商关联表
				$ms['uid'] = $uid;
				$ms['supplierID'] = $sid;
				$ms['add_time'] =  date('Y-m-d H:i:s',time());
				$id = M('member_supplier','','DB_CONFIG4')->add($ms);
		            if($id){
		            	
		                 session('ADD_SUPPLIER',null);
		                 //记录行为
		                 action_log('add_Supplier', 'Supplier', $id, UID);
		                 $this->success('新增成功', U('supplierList'));exit;
		             } else {
		                 $this->error('新增失败');
		             }
	            } else {
	                $this->error($supplier->getError());
	            }
		}
		$this->display();
	}
	
	/**
	 * 编辑
	 * @author han <glghan@sina.com>
	 */
	public function editSupplier(){
		$supplier = M('Supplier','','DB_CONFIG4');
		
		if(IS_POST){			
			$data = $supplier->create();
			if($data){
				$data['updateTime'] = date('Y-m-d H:i:s',time());
				if(!$data['status']){
					$data['status'] = 'OFF';
				}
				$id = $supplier->save($data);
				if($id){
					session('UPDATE_SUPPLIER',null);
					//记录行为
					action_log('update_Supplier', 'Supplier', $id, UID);
					$this->success('更新成功', U('supplierList'));exit;
				} else {
					$this->error('更新失败');
				}
			} else {
				$this->error($supplier->getError());
			}
		}
		
		$id = I('get.id');
		$list = $supplier->find($id);
		//var_dump($list);exit();
		$this->assign('list',$list);
		$this->display();
	}
	
	/**
	 * 启用/禁用供应商
	 * @author han <glghan@sina.com>
	 */
	public function changeStatus($status='',$id=''){
		$Supplier = M('Supplier','','DB_CONFIG4');
		$data['ID'] = $id;
		$data['status'] = $status;
		if($data['status']=='OK'){
			$data['status']='OK#';
		}

		if($data){
			$result = $Supplier->save($data);
			if($result){
				session('CHANGE_SUPPLIER_STATUS',null);
				//记录行为
				action_log('change_status', 'Supplier', $data['id'], UID);
				$this->success('处理成功', U('supplierList'));exit;
			} else {
				$this->error('处理失败');
			}
		} else {
			$this->error($Supplier->getError());
		}
	}
	
	public function setting(){
		$this->display();
	}
	
	
	/**
	 * 获取用户注册错误信息
	 * @param  integer $code 错误编码
	 * @return string        错误信息
	 */
	private function showRegError($code = 0){
		switch ($code) {
			case -1:  $error = '用户名长度必须在16个字符以内！'; break;
			case -2:  $error = '用户名被禁止注册！'; break;
			case -3:  $error = '用户名被占用！'; break;
			case -4:  $error = '密码长度必须在6-30个字符之间！'; break;
			case -5:  $error = '邮箱格式不正确！'; break;
			case -6:  $error = '邮箱长度必须在1-32个字符之间！'; break;
			case -7:  $error = '邮箱被禁止注册！'; break;
			case -8:  $error = '邮箱被占用！'; break;
			case -9:  $error = '手机格式不正确！'; break;
			case -10: $error = '手机被禁止注册！'; break;
			case -11: $error = '手机号被占用！'; break;
			default:  $error = '未知错误';
		}
		return $error;
	}

	
}