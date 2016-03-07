<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月7日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于商品分类模型
// +----------------------------------------------------------------------

class ProductCategoryModel extends Model{
     
    protected $connection = 'DB_PRODUCT';
    
    function updateNode($data){
        $curTime =date('Y-m-d H:i:s'); 
        $ret['status'] = true;
        $this->startTrans();
            
        foreach ($data as $key=>$value){
            $createData = array(
                'className' => $value['name'],
                'depth' => $value['level'],
                'parentID' => $value['pid'],
                'parentName' => $value['parentname'],
                'rootID' => $value['rootId'],
                'status'=>'OK#',
                'uid'   => UID,
                'createTime'=>$curTime,
            );
            
            if ($value['isadd'] == 'true'){//添加节点
                $retadd = $this->add($createData);
                if (!$retadd){
                    $ret['status'] = false;
                    $ret['info'] = '节点添加出错！';
                    break;
                }
                
            }
            
            if ($value['isadd']=='false' && $value['isedit'] == 'true') {//更新节点
                $updateData['updateTime'] = $curTime;
                $updateData['className'] = $value['name'];
                
                $updateMap['ID'] = $value['id'];
                $retupdate = $this->where($updateMap)->save($updateData);
                if (!$retupdate){
                    $ret['status'] = false;
                    $ret['info'] = '节点更新出错！';
                    break;
                }
            }
            
            if ($value['isdelete'] == 'true'){//删除节点
                $updateMap['ID'] = $value['id'];
                $deleteData['status'] = 'DEL';
                $deleteData['updateTime'] = $curTime;
                $retdelete = $this->where($updateMap)->save($deleteData);
                if (!$retdelete){
                    $ret['status'] = false;
                    $ret['info'] = '节点删除出错！';
                    break;
                }
            }
          }

         if (!$ret['status']) {
             $this->rollback();
         }else{
             $this->commit();
             return $ret;
         }

      

        

    }
    
    //添加单独的节点
    function addNode($data){
        
    }
    
    function saveNode(){
        
    }
    
    function deleteNode(){
        
    }
    
    //检查是否存在该数据
    function isExistNode($id){
        $map['ID'] = $id;
        return $ret = $this->where($map)->find();
    }
}