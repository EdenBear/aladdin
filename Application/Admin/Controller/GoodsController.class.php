<?php
// +----------------------------------------------------------------------
// | Date:2016年2月25日
// +----------------------------------------------------------------------
// | Author: EK_熊<1439527494@qq.com>
// +----------------------------------------------------------------------
// | Description: 此文件作用于 商品管理控制器
// +----------------------------------------------------------------------

namespace Admin\Controller;
use Admin\Controller\AdminController;
class GoodsController extends AdminController{
 
    /**
     * 商品列表页
     * date:2016年2月25日
     * author: EK_熊
     */
    public function index(){
        if (IS_POST) {
            //dump(R('Qiniu/uploadBatch'));
//             $setting=C('UPLOAD_SITEIMG_QINIU');
//             $Upload = new \Think\Upload($setting);
dump($_FILES);
            
            $info = qiniu_upload();
            dump($info);
        }
        $this->meta_title = '商品管理';
        $this->display();
    }
    
    /**
     * 商品规格
     * date:2016年2月25日
     * author: EK_熊
     */
    public function add(){
        
        $this->meta_title = '商品规格';
        $this->display();        
    }
    
    public function attr(){
        $values[]= array(
            'id'=>1,
            'name'=>1,
            'checked'=>false,
        );
        $values[]= array(
            'id'=>2,
            'name'=>2,
            'checked'=>false,
        );
//         $values[]= array(
//             'id'=>3,
//             'name'=>3,
//             'checked'=>false,
//         );
//         $values[]= array(
//             'id'=>4,
//             'name'=>4,
//             'checked'=>false,
//         );
        
        $data[] = array(
            'id'=>1,
            'name'=>'小白',
            'value'=>'',
            'values'=>$values,
            
        );
        $data[] = array(
            'id'=>2,
            'name'=>'小白2',
            'value'=>'',
            'values'=>$values,
        
        );
        $attr = '[{"id":1,"name":"小白","value":"","values":[{"id":1,"name":"1","checked":false,"$$hashKey":"008"},{"id":2,"name":"2","checked":false,"$$hashKey":"009"},{"id":3,"name":"3","checked":false,"$$hashKey":"00A"}],"$$hashKey":"006"},{"id":1,"name":"小黑","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false}],"$$hashKey":"006"},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"1","checked":false},{"id":2,"name":"2","checked":false},{"id":3,"name":"3","checked":false},{"id":4,"name":"4","checked":false}]},{"id":1,"name":"你好","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"是","checked":false},{"id":3,"name":"的","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"啊","checked":false},{"id":2,"name":"不","checked":false}]},{"id":1,"name":"啊","value":"","values":[{"id":1,"name":"不","checked":false},{"id":2,"name":"呃","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黑","checked":false},{"id":2,"name":"蓝","checked":false},{"id":3,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":1,"name":"颜色","value":"","values":[{"id":1,"name":"黄","checked":false},{"id":2,"name":"红","checked":false}]},{"id":"11","name":"5555","value":"","values":[{"id":3,"name":"12","checked":false}]}]';
        
        $this->ajaxReturn($data);
    }
    public function saveAttr(){
        $sttr = array(
            '1-4' =>array (
                'key' =>  '1-4' ,
                'name' =>  '颜色:白,尺寸:22' ,
                'price' =>  '0.0' ,
                'supply_price' =>  '0.0' ,
                'quantity' =>  '50' 
                ),
            '1-3' =>array(
                'key' => '1-3' ,
                'name' =>  '颜色:白,尺寸:21' ,
                'price' =>  '0.0' ,
                'supply_price' =>  '0.0' ,
                'quantity' =>  '50' ,
            ),
            );

        
        $attrCombin = I('attrCombin');
        $attrVal = I('attrVal');
        dump($attrCombin);
        dump($attrVal);
    }
    
    /**
     * 
     * 添加商品
     * date:2016年2月28日
     * author: EK_熊
     */
    public function addProduct(){
        $sttr = I('attrCombin');//sku数据
        $attr = I('attrVal');
        $imgBox = I('imgBox');
        dump($imgBox);
        foreach ($sttr as $key => $val){
            $sttr[$key]['skuimg'] = $imgBox[$key-1]['qiniuImgUrl'];
        }
        //TODO保存商品数据
        
        /* 保存 sku属性数据*/
        $addAttr = $this->addAttr($productID=1, $attr, $sttr);
        dump($addAttr);
    }
    
    
     /**
     * 商品属性入库 
     * @param int 商品ID
     * @param array 商品规格
     * @param array sku数据
     * @author han <glghan@sina.com>
     */
	public function addAttr($productID,$attr,$sttr){
		//商品id(唯一)
// 		$productID = ;
		//操作员id
		$uid = UID;
// 		//属性及属性值数据
// 		$attr = $attr;		
// 		//sku数据
// 		$sttr = $sttr;
		
	if(is_array($sttr)){
		foreach($sttr as $k=>$v){
			$name = $sttr[$k]['name'];	
			$name = explode(',',$name);
			foreach ($name as $k1=>$v1){
				$attrValue = explode(':',$name[$k1]);
				$attrName = $attrValue[0];
				$value1 = $attrValue[1];
				$newAttr[$attrName] = $value1;
			}
			$sttr[$k]['name'] = $newAttr;		
		}
	}else{
		return false;
	};
		
		//导入属性
		if(is_array($attr)){
			foreach ($attr as $k=>$v){
				$productAttrModel = M('Product_attr');
				
				//构建数据		
				$data['attrName'] = $k;
				$data['productID'] = $productID;
				$data['sortOrder'] = 0;
				$data['uid'] = $uid;
				$data['createTime'] = date('Y-m-d H:i:s',time());
				
				$attrID = $productAttrModel->add($data);
				
				//导入属性值
				if($attrID){
					foreach ($v as $k1=>$v1){
						$productAttrValueModel = M('Product_attr_value');
						
						//构建数据
						$value['attrValue'] = $v1;
						$value['attrID'] = $attrID;
						$value['uid'] = $uid;
						$value['sortOrder'] = 1;
						$value['createTime'] = date('Y-m-d H:i:s',time());
						
						$attrValueID = $productAttrValueModel->add($value);
	
						if(!$attrValueID){
							return  $productAttrValueModel->getError();
						}
					}
				}else{
					
					return  $productAttrModel->getError();
				}
			}
		}else {
			return false;
		}
		
		//导入sku
		if(is_array($sttr)){
			foreach ($sttr as $k=>$v){
				$productSkuModel = M('Product_sku');
				
				//构建数据
				$skuData['productID'] = $productID;
				$skuData['uid'] = $uid;
				$skuData['applyPrice'] = $sttr[$k]['supply_price'];
				$skuData['skuPrice'] = $sttr[$k]['price'];
				$skuData['skuStock'] = "90";
				$skuData['createTime'] = date('Y-m-d H:i:s',time());
				$skuData['skuImg'] = $sttr[$k]['skuimg'];
				$skuID = $productSkuModel->add($skuData);
				
				//导入sku_attr
				if($skuID){
					foreach ($v['name'] as $k1=>$v1){
						$productSkuAttrModel = M('Product_sku_attr');
						
						/*构建数据*/
						$skuAttr['skuID'] = $skuID;
						$skuAttr['uid'] = $uid;
						$skuAttr['sortOrder'] = 3;
						$skuAttr['createTime'] = date('Y-m-d H:i:s',time());	
						//获取attrID及attrValueID
						$attriBute = $productAttrModel->where('productID='.$productID.' and attrName='."'{$k1}'")
						->select();
						$skuAttr['attrID'] = $attriBute[0]['id'];
						 $attriButeValue= $productAttrValueModel->where('attrID='.$skuAttr['attrID'].' and attrValue='."'{$v1}'")
						->select();
						 $skuAttr['attrValueID'] = $attriButeValue[0]['id'];
						 
						$skuAttrID = $productSkuAttrModel->add($skuAttr);
						if(!$skuAttrID){
							return  $productSkuAttrModel->getError();
						}
					}
				}else {
					return  $productSkuModel->getError();
				}
			}
		}else {
			return false;
		}
		return true;
	}
    
    
}