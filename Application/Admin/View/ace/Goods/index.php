<extend name="Public/base" />

<block name="body">
<div class="table-responsive">
	<div class="dataTables_wrapper">
		<!-- 配置列表 -->
		<a href="{:U('norms')}" target="_blank">商品规格</a>

<form action="{:U('UploadFile/uploadImgQiniuAjax')}" enctype="multipart/form-data" method="post" >
<input type="file" id="uploadFile" runat="server" name='qiniu_file[]'/> 
<input type="file" id="uploadFile" runat="server" name='qiniu_file[]'/> 
    <!--<input type="button" id="btnUpload" value="确定" onclick="uploadImage()" />  -->
    
    <input type="submit" id="" value="确定" />
<div id="imgDiv">
</div>
</form>
<ul >
<li class='hah'><input type="file" id="uploadFile11" class='uploadFile' runat="server" name='qiniu_file[]'/></li>
<li class='hah'><input type="file" id="uploadFile11" class='uploadFile' runat="server" name='qiniu_file[]'/></li>
</ul>
<!-- <input type="file" id="uploadFile_11" class='uploadFile' runat="server" name='qiniu_file[]'/> -->
<!-- <input type="file" id="uploadFile_21" class='uploadFile' runat="server" name='qiniu_file[]'/> -->
    
    
    <script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>
<link rel="stylesheet" type="text/css" href="__STATIC__/uploadify/uploadify.css" />


<div class="ap">添加</div>




<script type="text/javascript">
$(".uploadFile").each(function() {
	   $(this).uploadify({
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
//           			var data = $.parseJSON(data);
//           			var src = '';
          			console.log(data);
				},
			'onFallback' : function() {
		        alert('未检测到兼容版本的Flash.');
		    }
	   });
	});

$("#uploadFile_1").uploadify({
	"height"          : 30,
	"swf"             : "__STATIC__/uploadify/uploadify.swf",
	"fileObjName"     : "qinniu[]",
	"buttonText"      : "上传图片",
	"uploader"        : "{:U('UploadFile/uploadImgQiniuAjax')}",
	"width"           : 120,
	'removeTimeout'   : 1,
	'fileTypeExts'    : '*.jpg; *.png; *.gif;',
	"onUploadSuccess" : uploadPicture1,
	'onFallback' : function() {
        alert('未检测到兼容版本的Flash.');
    }
});
$("#uploadFile_2").uploadify({
	"height"          : 30,
	"swf"             : "__STATIC__/uploadify/uploadify.swf",
	"fileObjName"     : "qinniu[]",
	"buttonText"      : "上传图片",
	"uploader"        : "{:U('UploadFile/uploadImgQiniuAjax')}",
	"width"           : 120,
	'removeTimeout'   : 1,
	'fileTypeExts'    : '*.jpg; *.png; *.gif;',
	"onUploadSuccess" : uploadPicture2,
	'onFallback' : function() {
        alert('未检测到兼容版本的Flash.');
    }
});
function uploadPicture2(file, data){
	var data = $.parseJSON(data);
	var src = '';
	console.log(data);
// 	if(data.status){
// 		src = data.url || '__ROOT__' + data.path
// 		$("#cover_id_{$o_key}").parent().find('.upload-img-box').append(
// 			'<div class="upload-pre-item" val="' + data.id + '"><img src="__ROOT__' + src + '" ondblclick="removePicture{$o_key}(this)"/></div>'
// 		);
// 		setPictureIds{$o_key}();
// 	} else {
// 		updateAlert(data.info);
// 		setTimeout(function(){
// 			$('#top-alert').find('button').click();
// 			$(that).removeClass('disabled').prop('disabled',false);
// 		},1500);
// 	}
}
function uploadPicture1(file, data){
	var data = $.parseJSON(data);
	var src = '';
	console.log(data);
// 	if(data.status){
// 		src = data.url || '__ROOT__' + data.path
// 		$("#cover_id_{$o_key}").parent().find('.upload-img-box').append(
// 			'<div class="upload-pre-item" val="' + data.id + '"><img src="__ROOT__' + src + '" ondblclick="removePicture{$o_key}(this)"/></div>'
// 		);
// 		setPictureIds{$o_key}();
// 	} else {
// 		updateAlert(data.info);
// 		setTimeout(function(){
// 			$('#top-alert').find('button').click();
// 			$(that).removeClass('disabled').prop('disabled',false);
// 		},1500);
// 	}
}


</script>
</block>