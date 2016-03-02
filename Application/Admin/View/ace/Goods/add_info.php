<layout name="Goods/add_info" />
<style>
.span-remark{}
.radio{margin-right: 5px;}
.picshow li img{width: 100%;height100%;cursor: pointer;}
.picshow li{float: left;position: relative;margin-right: 10px;width: 150px;height: 150px;}
.picshow li i{color: #428bca;position: absolute;top:-7px;right: -7px;}
.picshow li i:hover{cursor: pointer;}
.checkbox{margin-right: 10px;}
</style>
<div class="table-responsive proinfo">
	<div class="dataTables_wrapper">
		<form action="" id="form-pro-info2">
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
						   <input type="text" name='pro_info_code' class='input-large' value='12356'>
						</td>
					</tr>
					<tr>
						<td>供应商</td>
						<td>
							<select name="pro_info_supplier" id="" class='span12'>
			                       <option value="1">阿迪达斯</option>
			                       <option value="2">耐克</option>
			                    
							</select>
						</td>
					</tr>
					<tr>
						<td>商品名称</td>
						<td>
					        <input type="text" value="保温杯" class='input-xxlarge' name='pro_info_fullname' />限30字
						</td>
					</tr>
					<tr>
						<td>商品简称</td>
						<td>
					        <input type="text" value="保温杯111" class='input-large' name='pro_info_shortname' />限30字
						</td>
					</tr>
					<tr>
						<td>商品图片</td>
						<td style='position: relative;'> 
							<input type="file" id="uploadImg_info"  name='qinniu[]'/>
							<span style='position: absolute;top: 22px;left: 135px;'>默认第一幅图为主图</span>
							<ul class='picshow list-group'>
<li class="list-group-item" is-first="true"><img src="http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_1d0ca5290e76e384ce76bd127c03355f.jpg?e=1456913421&amp;token=6EZmwsqQYeHvlaA44_LwiBAePez-rjpOv4jwg4t4:pm16-GnpZvUrLO1ZC8G_QVcEPw8=" id="pic-1" onclick="setfirst(this.id)" alt=""><i class="glyphicon glyphicon-remove pic-review-remove" id="pic-remove-1" onclick="rmovePic(this.id)"></i><input type="hidden" name="pro_info_pic" value="http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_1d0ca5290e76e384ce76bd127c03355f.jpg"></li>
<li class="list-group-item" is-first="false"><img src="http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_7792ef91fc8c65dd1b339c02f9a250e5.jpg?e=1456913421&amp;token=6EZmwsqQYeHvlaA44_LwiBAePez-rjpOv4jwg4t4:2T-fLO5Q6hQIhv6pSJ5PXiypaMQ=" id="pic-2" onclick="setfirst(this.id)" alt=""><i class="glyphicon glyphicon-remove pic-review-remove" id="pic-remove-2" onclick="rmovePic(this.id)"></i><input type="hidden" name="pro_info_pic" value="http://7xrade.com2.z0.glb.qiniucdn.com/2016-03-01_7792ef91fc8c65dd1b339c02f9a250e5.jpg"></li>	
							</ul>
						</td>
					</tr>
					<tr>
						<td>商品描述</td>
						<td>
							<textarea name="pro_info_desc" rows="" cols=""></textarea>
							{:hook('adminArticleEdit',array('name'=>'pro_info_desc'))}
						</td>
					</tr>
					<tr>
						<td>运费</td>
						<td>
							<label for="" class='radio'>
								<input type="radio">买家承担
							</label>
							<label for="" class='radio'>
								<input type="radio" >包邮
							</label>
						</td>
					</tr>
					<tr>
						<td>价格(元)</td>
						<td>
							<input class='input-small' type="text" name="pro_info_price" value='400'>
						</td>
					</tr>
					<tr>
						<td>重量(kg)</td>
						<td>
							<input class='input-small' type="text" name="pro_info_weight" value='20'>
							<span class=''>系统按照重量自动计算运费</span>
						</td>
					</tr>
					<tr>
						<td>限购数量</td>
						<td>
							<input class='input-small' type="text" name='pro_info_limitCount' value='18'>
							<span class='span-remark'>限购为“0”时，代表不限购，否则每个用户最多只能限购设置数量的该商品</span>
						</td>
					</tr>
					<tr>
						<td>上架平台</td>
						<td>
							<label for="" class='checkbox inline' >
								<input type="checkbox" name='pro_info_platform' value='APP'>APP
							</label>
							<label for="" class='checkbox inline'>
								<input type="checkbox" name='pro_info_platform' value='WX#'>微信
							</label>
							<label for="" class='checkbox inline' >
								<input type="checkbox" name='pro_info_platform' value='FB#'>facebook 
							</label>
							<label for="" class='checkbox inline'>
								<input type="checkbox" name='pro_info_platform' value='PC#'>PC
							</label>
						</td>
					</tr>
					<tr>
						<td>上架设置</td>
						<td>
							<label for="" class='radio' >
								<input type="radio" name='pro_info_status' value='HOLD'>暂不上架，保存到商品库 
							</label>
							<label for="" class='radio'>
								<input type="radio" name='pro_info_status' value='UP#'>立即出售(上架后类目不可修改，请确认无误)
							</label>
						</td>
					</tr>
				</tbody>

			</table>				

		</form>
	</div>
</div>

<div id='testsubmit'>测试提交</div>

<script>


$('#testsubmit').click(function(){
	var infoForm = $('#form-pro-info');
	editor_pro_info_desc.sync();
	PRO_INGO_OBJ.procode = infoForm.find("input[name='pro_info_code']").val();//自编号
	PRO_INGO_OBJ.fullname = infoForm.find("input[name='pro_info_fullname']").val();//名称
	PRO_INGO_OBJ.shortname = infoForm.find("input[name='pro_info_shortname']").val();//简短名称
	PRO_INGO_OBJ.supplier = infoForm.find("select[name='pro_info_supplier'] option:selected").val();//供应商
	PRO_INGO_OBJ.desc = editor_pro_info_desc.html();//描述
	PRO_INGO_OBJ.price = infoForm.find("input[name='pro_info_price']").val();//价格
	PRO_INGO_OBJ.weight = infoForm.find("input[name='pro_info_weight']").val();//重量
	PRO_INGO_OBJ.limitCount = infoForm.find("input[name='pro_info_limitCount']").val();//限购数量
	PRO_INGO_OBJ.status = infoForm.find("input[name='pro_info_status']:checked").val();//上下架状态
	
	/*获取上架平台，拼接字符串，逗号隔开*/
	var pro_platform = '';
	infoForm.find("input[name=pro_info_platform]:checked").each(function() {  
                pro_platform += ","+$(this).val();  
        });
    if (pro_platform.substr(0,1)==',') pro_platform=pro_platform.substr(1);    

    PRO_INGO_OBJ.platform = pro_platform; //上架平台
	PRO_INGO_OBJ.img = new Array();//图片
	infoForm.find("input[name='pro_info_pic']").each(function(index){
		PRO_INGO_OBJ.img[index] = $(this).val();
	})
	console.log(PRO_INGO_OBJ);
	$.post("{:U('addProInfo')}",{"proinfo":PRO_INGO_OBJ}); 
})

var picNum = 0;//添加预览图的数量
/**
 * 设置主图
 */
function setfirst(e){
	var thisImgLi = $("#"+e).parent('li');
	var curIsFirst = thisImgLi.attr('is-first');
	if (curIsFirst == 'true') return false;
	$.dialog({
		    title: '提示',
		    content: '是否设置为主图',
		    okValue: '确定',
		    ok: function () {
		    	$('.picshow li').attr('is-first','false');
		    	thisImgLi.insertBefore('.picshow li:eq(0)');
		    	thisImgLi.attr("is-first",'true')
		    },
		    cancelValue: '取消',
		    cancel: function () {}
		});
}
/**
 * 移除预览图
 */
function rmovePic(e){
	$("#"+e).parent('li').remove();
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
  			var _isFirst = false;
  			if (li_size <=0) _isFirst = true;
			imgPreview ='<li class="list-group-item"  is-first="'+_isFirst+'">'
						+'<img src='+data.img[0].qiniuPrivateUrl+' id="pic-'+picNum+'" onclick="setfirst(this.id)" alt=""   />'
						+'<i class="glyphicon glyphicon-remove pic-review-remove" id="pic-remove-'+picNum+'" onclick="rmovePic(this.id)"></i>'
						+'<input type="hidden" name="pro_info_pic" value="'+data.img[0].url+'" />'
					+'</li>';

			$('.proinfo .picshow').append(imgPreview);
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
   });
   

   
    	   
	
</script>

