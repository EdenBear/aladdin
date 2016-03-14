<layout name="Goods/add_info" />
<style>

.radio{margin-right: 5px;}
.picshow li img{width: 100%;height100%;cursor: pointer;}
.picshow li{float: left;position: relative;margin-right: 10px;width: 150px;height: 150px;}
.picshow li i{color: #428bca;position: absolute;top:-7px;right: -7px;}
.picshow li i:hover{cursor: pointer;}
.checkbox{margin-right: 10px;}
.error{color:red}
</style>

<div class="table-responsive proinfo">
	<div class="dataTables_wrapper">
		<form action="" id="form-pro-info">
		</form>
		
		<form action="" id='form-pro-info'>
			<table class="table table-striped table-bordered table-hover dataTable">
				<thead>
					<th width='10%'>配置项</th>
					<th width='90%'>内容选项</th>
				</thead>
				<tbody>
					<tr>
						<td>自编号</td>
						<td>
						   <input type="text" name='pro_info_code' class='input-large' value='{$product.productcode}'  minlength="2" required>
						</td>
					</tr>
					<tr>
						<td>供应商</td>
						<td>
<!-- 							<select name="pro_info_supplier" id="" class='span12' title="请选择供应商!" required> -->
<!-- 			                       <option value="">请选择供应商</option> -->
<!-- 			                       <option value="1">阿迪达斯</option> -->
<!-- 			                       <option value="2">耐克</option> -->
<!-- 							</select> -->
						</td>
					</tr>
					<tr>
						<td>商品名称</td>
						<td>
					        <input type="text" value="{$product.productname}" class='input-xxlarge' name='pro_info_fullname' maxlength="30" title="内容不超过30个字" required />
						</td>
					</tr>
					<tr>
						<td>商品简称</td>
						<td>
					        <input type="text" value="{$product.shortname}" class='input-large' name='pro_info_shortname' maxlength="15" title="内容不超过15个字" required/>
						</td>
					</tr>
					<tr>
						<td>商品图片</td>
						<td style='position: relative;'> 
							<input type="file" id="uploadImg_info"  name='qinniu[]' class="required" accept="image/*" title='请选择商品图片'/>
							<span style='position: absolute;top: 22px;left: 135px;'>默认第一幅图为主图</span>
							<ul class='picshow list-group'>
							     <volist name='product.img' id='vo'> 
							         <li class="list-group-item" imgpos='{$vo.imgpos}'>
							             <img src="{$vo.qiniurul}" id="pic-{$vo.id}" onclick="setfirst(this.id)" alt="">
							             <i class="glyphicon glyphicon-remove pic-review-remove" id="pic-remove-{$vo.id}" onclick="rmovePic(this.id)"></i>
							             <input type="hidden" name="pro_info_pic" value="{$vo.imgpath}" imgid='{$vo.id}'>
							         	<div id='imgpos'>
							         		<eq name='vo["imgpos"]' value='MAJ'>主图</eq>
							         	</div>
							         </li>
							     </volist>

							</ul>
						</td>
					</tr>
					<tr>
			             <td>卖点说明</td>
						 <td><input type="text" name="pro_info_sellDesc" value="{$product.selldesc}"  required /></td>
					</tr>
					<tr>
						<td>商品描述</td>
						<td>
							<textarea name="pro_info_desc" rows="" cols="">{$product['detail']}</textarea>
							{:hook('adminArticleEdit',array('name'=>'pro_info_desc','value'=>$product['detail']))}
						</td>
					</tr>
					<tr>
						<td>运费</td>
<!-- 						<td> -->
<!-- 							<label for="" class='radio'> -->
<!-- 								<input type="radio" name='pro_info_freight' value='1' required title='请选择运费方式'>买家承担 -->
<!-- 							</label> -->
<!-- 							<label for="" class='radio'> -->
<!-- 								<input type="radio" name='pro_info_freight' value='2'>包邮 -->
<!-- 							</label> -->
<!-- 							<label for="pro_info_freight" class="error"></label> -->
<!-- 						</td> -->
					</tr>
					<tr>
						<td>销售价格(元)</td>
						<td>
							<input class='input-small' type="text" name="pro_info_price" value='{:mony_format($product["price"],"yuan")}' required>
						</td>
					</tr>
					<tr>
						<td>供货价格(元)</td>
						<td>
							<input class='input-small' type="text" name="pro_info_applyprice" value='{:mony_format($product["applyprice"],"yuan")}' required>
						</td>
					</tr>
					<tr>
						<td>重量(kg)</td>
						<td>
							<input class='input-small' type="text" name="pro_info_weight" value="{:weight_format($product['weight'],'kg')}" required>
							<span class=''>系统按照重量自动计算运费</span>
						</td>
					</tr>
					<tr>
						<td>限购数量</td>
						<td>
							<input class='input-small' type="text" name='pro_info_limitCount' value='{$product.limitcount}' required >
							<span class='span-remark'>限购为“0”时，代表不限购，否则每个用户最多只能限购设置数量的该商品</span>
						</td>
					</tr>

					<tr>
						<td>上架平台</td>
						<td>

    							<label for="" class='checkbox inline' >
    								<input type="checkbox" name='pro_info_platform' class="checkbox" value='APP' required title='请选择上架平台'
    								<notempty  name="product.platform.APP">checked</notempty  >>APP
    							</label>
    							<label for="" class='checkbox inline'>
    								<input type="checkbox" name='pro_info_platform' class="checkbox" value='WX#'
    								<notempty  name="product.platform.WX#">checked</notempty >>微信
    							</label>
    							<label for="" class='checkbox inline' >
    								<input type="checkbox" name='pro_info_platform' class="checkbox" value='FB#'
    								<notempty  name="product.platform.FB#">checked</notempty >>facebook 
    							</label>
    							<label for="" class='checkbox inline'>
    								<input type="checkbox" name='pro_info_platform' class="checkbox" value='PC#'
    								<notempty  name="product.platform.PC#">checked</notempty >>PC
    							</label>						    


							<label for="pro_info_platform" class="error"></label>
						</td>
					</tr>
					<tr>
						<td>上架设置</td>
						<td>
							<label for="" class='radio' >
								<input type="radio" name='pro_info_status' value='HOLD' required title='请选择上架设置'
								<eq name="product.status" value="HOL">checked</eq>>暂不上架，保存到商品库 
							</label>
							<label for="" class='radio'>
								<input type="radio" name='pro_info_status' value='UP#'
								<eq name="product.status" value="UP#">checked</eq>>立即出售(上架后类目不可修改，请确认无误)
							</label>
							<label for="pro_info_status" class='error'></label>
						</td>
					</tr>
				</tbody>

			</table>				
		</form>
	</div>
</div>


<script src="__STATIC__/validate/jquery.validate.min.js"></script>
<script src="__STATIC__/validate/messages_zh.js"></script>
<script>


/*ajax方式提交表单，进行验证*/
$("#form-pro-info").validate();
 


/*ajax提交商品基础信息，先执行验证执行动作，再获取商品信息*/
function proInfoValid(){
	var proInfoValid = $("#form-pro-info").valid();
	if (proInfoValid) {
		//检查图片是是否上传了
		var picSize = $('.picshow li').size();
		if (picSize <=0) {
			
			toastr.error('请上传商品图片');
			return false;
		}	
		//获取商品信息，并输出
		return getProInfo();		
	}else{
		return false;
	}
	

	
}

/* 获取商品基础信息数据*/
function getProInfo(){
	var infoForm = $('#form-pro-info');
	editor_pro_info_desc.sync();
	var PRO_INFO_OBJ = new Object();
	PRO_INFO_OBJ.procode = infoForm.find("input[name='pro_info_code']").val();//自编号
	PRO_INFO_OBJ.selldesc = infoForm.find("input[name='pro_info_sellDesc']").val();//卖点说明
	PRO_INFO_OBJ.fullname = infoForm.find("input[name='pro_info_fullname']").val();//名称
	PRO_INFO_OBJ.shortname = infoForm.find("input[name='pro_info_shortname']").val();//简短名称
	PRO_INFO_OBJ.supplier = infoForm.find("select[name='pro_info_supplier'] option:selected").val();//供应商
	PRO_INFO_OBJ.desc = editor_pro_info_desc.html();//描述
	PRO_INFO_OBJ.price = infoForm.find("input[name='pro_info_price']").val();//价格
	PRO_INFO_OBJ.applyprice = infoForm.find("input[name='pro_info_applyprice']").val();// 供货价格
	PRO_INFO_OBJ.weight = infoForm.find("input[name='pro_info_weight']").val();//重量
	PRO_INFO_OBJ.limitCount = infoForm.find("input[name='pro_info_limitCount']").val();//限购数量
	PRO_INFO_OBJ.status = infoForm.find("input[name='pro_info_status']:checked").val();//上下架状态
	PRO_INFO_OBJ.id = PRODUCT_ID;
	
	
	/*获取上架平台，拼接字符串，逗号隔开*/
	var pro_platform = '';
	infoForm.find("input[name=pro_info_platform]:checked").each(function() {  
                pro_platform += ","+$(this).val();  
        });
    if (pro_platform.substr(0,1)==',') pro_platform=pro_platform.substr(1);    

    PRO_INFO_OBJ.platform = pro_platform; //上架平台
    /* 获取图片信息*/
	PRO_INFO_OBJ.img = new Array();//图片
	infoForm.find("input[name='pro_info_pic']").each(function(index){
		PRO_INFO_OBJ.img[index] = new Object();
		PRO_INFO_OBJ.img[index].imgpath = $(this).val();
		PRO_INFO_OBJ.img[index].id = $(this).attr('imgid');
		PRO_INFO_OBJ.img[index].imgpos = $(this).parent('li.list-group-item').attr('imgpos');
		
	})

	return PRO_INFO_OBJ;
}



var picNum = 0;//添加预览图的数量
/**
 * 设置主图
 */
function setfirst(e){
	var thisImgLi = $("#"+e).parent('li');
	var curIsFirst = thisImgLi.attr('imgpos');
	if (curIsFirst == 'MAJ') return false;
	$.dialog({
		    title: '提示',
		    content: '是否设置为主图',
		    okValue: '确定',
		    ok: function () {
		    	$('.picshow li').attr('imgpos','SEC');
		    	$('.picshow li').attr('imgpos','SEC');
		    	thisImgLi.insertBefore('.picshow li:eq(0)');
		    	thisImgLi.attr("imgpos",'MAJ');
		    	thisImgLi.find('div#imgpos').text('主图')
		    },
		    cancelValue: '取消',
		    cancel: function () {}
		});
}
/**
 * 移除预览图
 */
function rmovePic(e){
	var imgid = e.replace("pic-remove-","")
	$.dialog({
	    title: '提示',
	    content: '是否删除该图片？',
	    okValue: '确定',
	    ok: function () {
		    if (PRODUCT_ID) {
		    	$.post("{:U('goods/deleteProImg')}",{'imgid':imgid},function(returndata){
		    		if (returndata) {
		    			$("#"+e).parent('li').remove();
			    		}
		    	});
			    }else{
			    	$("#"+e).parent('li').remove();
			    }

	    },
	    cancelValue: '取消',
	    cancel: function () {}
	});
	
}



	//上传控件
   $("#uploadImg_info").uploadify({
	   "height"          : 30,
  		"swf"             : "__STATIC__/uploadify/uploadify.swf",
  		"fileObjName"     : "qinniu[]",
  		"buttonText"      : "上传图片",
  		"uploader"        : "{:U('UploadFile/uploadImgQiniuAjax')}",
  		"width"           : 120,
  		'removeTimeout'   : 1,
  		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
  		"onUploadSuccess" : function(file, data, response){
  			picNum++;
			var data = eval("("+data+")");
  			var imgPreview = '';
  			var li_size = $('.proinfo .picshow li').size();
  			var imgpos = li_size <=0 ? 'MAJ' :'SEC';
  			 
  	  			
			imgPreview ='<li class="list-group-item" imgpos='+imgpos+'>'
						+'<img src='+data.img[0].qiniuPrivateUrl+' id="pic-'+picNum+'" onclick="setfirst(this.id)" alt=""   />'
						+'<i class="glyphicon glyphicon-remove pic-review-remove" id="pic-remove-'+picNum+'" onclick="rmovePic(this.id)"></i>'
						+'<input type="hidden" name="pro_info_pic" imgid="" value="'+data.img[0].url+'" />'
					+'</li>';

			$('.proinfo .picshow').append(imgPreview);
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
   });
   

   
    	   
	
</script>

