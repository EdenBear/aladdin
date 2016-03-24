<extend name="Public/base" />
<block name='body'>
<style>
.dataTable .radio{margin-top:0;}
</style>

    <div class="table-responsive">
        <div class="dataTables_wrapper">
            <form action="" class='pin_edit_form' method='post'>
                <input id='pro_id' type="hidden" value='{$pin.productid}' name='productID' title='请选择商品' require />
                <input id='pro_supply' type="hidden" value='{$pin.supplyid}' name='supplyID' />
                <input id='' type="hidden" value="{$_GET['pinid']}" name='ID' />

                <table class='table table-striped table-bordered table-hover dataTable'>
                    <tr>
                        <td>拼团标题</td>
                        <td><input type="text" class='col-xs-5' value='{$pin.pintitle}' name='pinTitle' title='请输入标题' required /></td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>
                            <input type="file" id="uploadImg"  name='qinniu[]'  accept="image/*" title='请选择商品图片' require />
                            <input type="hidden" id='imgUrl' value='{$pin.pinimg}' name='pinImg' />
                            <img src="{:qiniu_private_url($pin['pinimg'])}" alt="" id='imgQiniu' width='150'/>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:11%">拼团商品</td>
                        <td>
                           <div style=''>
                                <label for="" style="float:left;border: 1px solid #ddd;height: 80px;width: 80px;" >
                                    <img id='pro_img' src="{:qiniu_private_url($proinfo['imgpath'])}" alt="" width='80' />
                                </label>   
                                <label for="" style="float:left;margin-left: 10px;width: 60%;">
                                    <p><span>商品编号:</span><span id='pro_code'>{$proinfo.productcode}</span></p>
                                    <p><span>商品名称:</span><span id='pro_name'>{$proinfo.productname}</span></p>
                                    <p>
                                        <span>商品价格:￥</span><span id='pro_price'>{$pin.price}</span>
                                        <input id='sub_pro_price' type="hidden" value='{$pin.price}' name='price' title='请选择商品' require />
                                        <label for="sub_pro_price" class='error'></label>
                                    </p>
                                </label> 
                                <label for="">
                                    <a href='javascript:;' class="btn btn-sm btn-primary pro_dialog">选择商品</a>  
                                </label> 
                                      
                           </div>
                           
                        </td>
                    </tr>
                    
                    <tr>
                    	<td>拼团人数</td>
                    	<td><input type="text" value='{$pin.pincount}' name='pinCount' required/></td>
                    </tr>
                    <tr>
                    	<td>拼团自编号</td>
                    	<td><input type="text" value='{$pin.pincode}' name='pinCode' required/></td>
                    </tr>
                    <tr>
                    	<td>限购数量</td>
                    	<td><input type="text" value='{$pin.limitcount}' name='limitCount' required/></td>
                    </tr>
                    <tr>
                    	<td>团购价</td>
                    	<td>￥<input type="text" value="{:mony_format($pin['pinprice'],'yuan')}" name='pinPrice' required/></td>
                    </tr>
                    <tr>
                    	<td>开始时间</td>
                    	<td><input class="span2 col-xs-2" size="16" type="text" value="{$pin.begintime|default=date('Y-m-d H:i:s')}" name='beginTime' placeholder="{:date('Y-m-d')}"  id='date_stat' class='datepicker' required></td>
                    </tr>
                    <tr>
                    	<td>结束时间</td>
                    	<td><input class="span2 col-xs-2" size="16" type="text" value="{$pin.endtime|default=date('Y-m-d H:i:s')}" name='endTime' placeholder='{:date('Y-m-d')}'  id='date_end' class='datepicker' required></td>
                    </tr>
                    <tr>
                        <td>拼团介绍</td>
                        <td>
                            <textarea name="pinDesc" id="" cols="30" rows="10" >{$pin.pindesc}</textarea>
                            {:hook('adminArticleEdit',array('name'=>'pinDesc','value'=>$pin['pindesc']))}
                        </td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td>	
                            <label for="sta_up" class='radio' >
        						<input type="radio" id='sta_up' name='status' value='UP#' required title='请设置拼团状态'
        						<eq name="pin.status" value="UP#">checked</eq>>上架
        					</label>
                            <label for="sta_draft" class='radio' >
        						<input type="radio" name='status' value='DW#' id='sta_draft'
        						<eq name="pin.status" value="DW#">checked</eq>>草稿 
        					</label>
        					<label for="sta_up" class='error'></label>
    					</td>
                    </tr>
                </table>
                <label for="" style='width: 100%;text-align: center;margin-top: 15px;'>
                    <button class="btn btn-sm btn-primary ajax-post" type='submit' target-form='pin_edit_form' url="{:U('')}" >保存</button>
                    <button class="btn btn-sm btn-primary " url="{:U('index')}">取消</button>
                </label>
            </form>
        </div>
     </div>

<script>
/*时间控件*/
$('#date_stat').datetimepicker({
    format: 'yyyy-mm-dd hh:ii:ss',
    language:"zh-CN",
    minView:1,
    autoclose:true
});
$('#date_end').datetimepicker({
    format: 'yyyy-mm-dd hh:ii:ss',
    language:"zh-CN",
    minView:1,
    autoclose:true
}); 

//上传图片
$("#uploadImg").uploadify({
	   "height"          : 30,
		"swf"             : "__STATIC__/uploadify/uploadify.swf",
		"fileObjName"     : "qinniu[]",
		"buttonText"      : "上传图片",
		"uploader"        : "{:U('UploadFile/uploadImgQiniuAjax')}",
		"width"           : 120,
		'removeTimeout'   : 1,
		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
		"onUploadSuccess" : function(file, data, response){
			var data = eval("("+data+")");
			$('#imgUrl').attr('value',data.img[0].url);
			$('#imgQiniu').attr('src',data.img[0].qiniuPrivateUrl);
			console.log(data)
// 			$('#imgQiniu').attr('src',data.);
		},
		'onFallback' : function() {
	        alert('未检测到兼容版本的Flash.');
    	    },
});

//弹窗
$('.pro_dialog').click(function(){
	
	art.dialog.open("{:U('product_list')}",{
	    title: '',
	    okVal: '确定',
	    ok:function(){
	    	var proInfo = this.iframe.contentWindow.getInfo();
	    	
	    	$('#pro_img').attr('src',proInfo.img);
	    	$('#pro_name').text(proInfo.name);
	    	$('#pro_code').text(proInfo.code);
	    	$('#pro_id').attr('value',proInfo.id);
	    	$('#pro_supply').attr('value',proInfo.supply);
	    	$('#pro_price').text(proInfo.price);
	    	$('#sub_pro_price').attr('value',proInfo.price);
	    },
	    width:600,
	    padding:'100px 10px 10px 10px;',
	    cancelVal: '取消',
	    cancel: function () {

		    }
	})
	
	
})



</script>
</block>

