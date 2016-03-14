<?php
namespace Admin\Model;
use Think\Model;
// +----------------------------------------------------------------------
// | Date:2016年3月10日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于****
// +----------------------------------------------------------------------
class ProductImgModel extends Model{
    protected $connection = 'DB_PRODUCT';
    
    /**
     * 批量添加图片数据
     * $imgData = array (
          0 =>array(
              'imgpath' => string 'http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_1d0ca5290e76e384ce76bd127c03355f.jpg' (length=86)
              'id' => string '3' (length=1)
              'imgpos' => string 'MAJ' (length=3)
              ),
          )
     * @param unknown $imgData
     * date:2016年3月10日
     * author: EK_熊
     */
    function batcAddProImg($imgData,$proId){
        $curtime = date('Y-m-d H:i:s');
        foreach ($imgData as $key => $value){
            $data_pro_Img[$key] = array(
                'productID'=>$proId,
                'imgPath'  =>$value['imgpath'],
                'uid'      =>UID,
                'createTime'=>$curtime,
                'status'    =>'OK#',
                'imgPos'    =>$value['imgpos'],
            );

        }
         
        $addProImg = $this->addAll($data_pro_Img);
        return $addProImg;
    }
    
    /**
     * 更新图片，编辑商品信息，可能同时对图片数据的添加和更新；
     * @param unknown $imgData
     * @param unknown $proId
     * date:2016年3月10日
     * author: EK_熊
     */
    function updateProImg($imgData,$proId){

        $curtime = date('Y-m-d H:i:s');
        $this->startTrans();
        foreach ($imgData as $key => $value){

            if (!empty($value['id'])) {//修改图片
                $update_Img = array(
                    'productID'=>$proId,
                    'imgPath'  =>$value['imgpath'],
                    'imgPos'    =>$value['imgpos'],
                    'updateTime'=>$curtime,
                );

                $update_map['ID'] = $value['id'];
                $update_map['productID'] = $proId;
                $ret = $this->where($update_map)->save($update_Img);
               
                if (!$ret) break;               
            }else{//添加图片
                
                $add_Img = array(
                    'productID'=>$proId,
                    'imgPath'  =>$value['imgpath'],
                    'uid'      =>UID,
                    'createTime'=>$curtime,
                    'status'    =>'OK#',
                    'imgPos'    =>$value['imgpos'],
                );
               
                $ret = $this->add($add_Img);
                
                if (!$ret) break;                
            }
            
        }
        if($ret){
            $this->commit();
        }else{
            $this->rollback();
        }
        
        return $ret;
    }
    
    function isExist(){
        
    }
    
}