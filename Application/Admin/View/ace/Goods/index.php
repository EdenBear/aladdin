<extend name="Public/base" />

<block name="body">
<div class="table-responsive">
	<div class="dataTables_wrapper">
		<!-- 配置列表 -->
		<a href="{:U('norms')}" target="_blank">商品规格</a>
		<div id='ts'>点击添加</div>
		<div class="a">
			
			
		</div>


<input type="file" id="uploadImg_info"  name='qinniu[]'/>
<script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>
<link rel="stylesheet" type="text/css" href="__STATIC__/uploadify/uploadify.css" />
<script type="text/javascript">

$('#ts').click(function(){
	var html = '<input type="file" class="aa" id="uploadImg_info1"  name="qinniu[]"/><input class="aa" type="file" id="uploadImg_info2"  name="qinniu[]"/>';
	$('.a').append(html);
	$('.aa').uploadify(uploadCfg);
})
var uploadCfg = {
	   "height"          : 30,
  		"swf"             : "__STATIC__/uploadify/uploadify.swf",
  		"fileObjName"     : "qinniu[]",
  		"buttonText"      : "上传图片",
  		"uploader"        : "{:U('Test/index')}",
  		"width"           : 120,
  		'removeTimeout'   : 1,
  		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
  		"onUploadSuccess" : function(file, data, response){
  			
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
  };
$("#uploadImg_info1").uploadify({
	   "height"          : 30,
  		"swf"             : "__STATIC__/uploadify/uploadify.swf",
  		"fileObjName"     : "qinniu[]",
  		"buttonText"      : "上传图片",
  		"uploader"        : "{:U('Test/index')}",
  		"width"           : 120,
  		'removeTimeout'   : 1,
  		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
  		"onUploadSuccess" : function(file, data, response){
  			
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
   });
$("#uploadImg_info2").uploadify({
	   "height"          : 30,
  		"swf"             : "__STATIC__/uploadify/uploadify.swf",
  		"fileObjName"     : "qinniu[]",
  		"buttonText"      : "上传图片",
  		"uploader"        : "{:U('Test/index')}",
  		"width"           : 120,
  		'removeTimeout'   : 1,
  		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
  		"onUploadSuccess" : function(file, data, response){
  			
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
   });
$("#uploadImg_info").uploadify({
	   "height"          : 30,
  		"swf"             : "__STATIC__/uploadify/uploadify.swf",
  		"fileObjName"     : "qinniu[]",
  		"buttonText"      : "上传图片",
  		"uploader"        : "{:U('Test/index')}",
  		"width"           : 120,
  		'removeTimeout'   : 1,
  		'fileTypeExts'    : '*.jpg; *.png; *.gif;',
  		"onUploadSuccess" : function(file, data, response){
  			
  		},
  		'onFallback' : function() {
  	        alert('未检测到兼容版本的Flash.');
          	    },
   });



</script>
</block>