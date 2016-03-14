<extend name="Public/base" />

<block name="body">
	<style>
		.left{float: left;}
		.right{float: right;}
		.zTreeDemoBackground{height: 518px;position: relative;display: table-cell;vertical-align: top;width: 20%;padding: 5px;border: 1px solid #ddd;}
		.operate{position: absolute;right: 0;top: 0;}
		.r_box{border: 1px solid #ddd;padding: 3px 9px 3px 9px;}
		.cateurl{height: 30px;line-height: 30px;border-bottom: 1px solid #ddd;}
		.cateshowimg{border: 1px solid #ddd;display: inline-block;width: 80px;height:80px;};
	</style>
	
	<link rel="stylesheet" href="__STATIC__/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <div class="table-responsive">
    	<div class="dataTables_wrapper">
			
			<div class="zTreeDemoBackground left">
				<div class='ztree left'>
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				
				<div class='operate'>
					<button class="btn btn-default btn-sm btn-add" id='saveTree'>保存分类</button>
				</div>
				
			</div>
			<div class='right' style='width: 79%;'>
    			<div class="r_box">
    			     <div class='cateurl'>
    			     	<span>分类连接: </span>
    			     	<a href=""></a>
    			     </div>
     			     <div style='margin-top: 5px;'>
     			     	<span>分类图标：</span> 
     			     	<div class='cateshowimg'>
	    			        <img src="" id='cateImg_th' alt="" style="width: 80px;"/>  
     			     	</div>
			            <button class='btn btn-primary btn-sm' id='imgUploadBtn'>上传图片</button>
    			       
     			     </div> 
    			</div>
    			<div>
     			     <!--<div class="search"> 
     			         <input type="text" placeholder="编号"/> 
     			         <input type="text" placeholder="自编号"/> 
     			         <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}"> 
                            <i class="icon-search"></i>搜索 
                         </button> 
     			     </div> -->
    			<iframe src="{:U('protable')}" id = "pro_table_iframe" frameborder="0" style='width: 100%;height: 560px;'>
    			
    			</iframe>
  			
			</div>


    	</div>
    </div>

    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.exedit.js"></script>
    <script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>

    <script>

    
    	var zNodes//异步获取的节点对象
    	var newNodesAry = new Array()//获取新的编辑对象集合
		var curNodeid=null ; //当前节点id

    	$.post("{:U('procategory/getCateTree')}",function($data){
    		zNodes = $data;
    	})
    	
    	$('#imgUploadBtn').click(function(){
    			var curNodeObj = treeObj.getSelectedNodes()[0];

				if (curNodeObj == null) {
					toastr.error('请选择左边的节点');
					return false;
				}else{
					curNodeid = curNodeObj.id;
					var curNodeLvl = curNodeObj.level;
					if (curNodeLvl <= 1) {
						toastr.error('请选择正确的上传类目节点');
						return false;
					}
					imgUploadDialog();
				}
        	});
        	
        	function imgUploadDialog(){
        		var dataUrl = '';   //入库保存的url
        		var privateUrl = '';   //入库保存的url
        		var uploadifySetting = {
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
			        			dataUrl = data.img[0].url;
			        			privateUrl = data.img[0].qiniuPrivateUrl;
			        			$('#imgPreview').css('display','block');
								$('#imgPreview').attr("src",data.img[0].qiniuPrivateUrl);
								$('#imgPreview').attr("data-url",data.img[0].url);
			        		},
			        		'onFallback' : function() {
			        	        alert('未检测到兼容版本的Flash.');
			               	},
			        };
			        
        			$.dialog({
					    title: '上传图片',
					    content: '<input type="file" name="qinniu[]" id="cateImg" /><img src="" id="imgPreview" alt="" style="width: 120px;display: none;"/>',
					    okVal: '确定',
					    ok:function(){
					    	
					    		if (dataUrl == '') {
					    			toastr.error('请上传图片');
					    			return false;
					    		}else{
					    			$.post("{:U('Procategory/updateNodeImg')}",{"imgurl":dataUrl,"nodeid":curNodeid},function(returndata){
					    				if (returndata.status){
					    					toastr.success('图片保存成功！');
						        			$('#cateImg_th').css('display','block');
											$('#cateImg_th').attr("src",privateUrl);
											$('#cateImg_th').attr("data-url",dataUrl);
					    					return false;
					    				}else{
					    					toastr.error('图片保存失败！');
					    					return false;
					    				}
					    			});
					    		}
					    },
					    cancelVal: '取消',
					    cancel: function () {}
					});
					    	//图片上传
			       $("#cateImg").uploadify(uploadifySetting);
        	}



    	//保存按钮
    	$('#saveTree').click(function(){
			
    		if (newNodesAry.length == 0) {
    			toastr.error('目前没有编辑节点操作');
    			return false;
    		}
        	
	    	$.post("{:U('procategory/addCateNode')}",
	    		{
	    			'nodes':newNodesAry,
	    		},	
	    		function($data){
	    			if ($data.status) {
						newNodesAry.length = 0;//保存后要清空节点的提交集合
	    				toastr.success('分类保存成功！');
	    			}else{
	    				toastr.success('分类保存失败！');
	    			}
	    			
    			})
    	})
    	//过滤处理节点对象
    	function filterNode(node,editTye){
    			
    		var newNodes = new Object();

			newNodes.isadd = false;
			newNodes.isedit = false;
			newNodes.isdelete = false;
			
			if (newNodesAry.length >0) {
				for (var i=0; i<newNodesAry.length;i++) {
					if (newNodesAry[i].id == node.id) {
						switch(editTye){
								case 'add':
									newNodesAry[i].isadd = true;
									break;
								case 'edit':
									newNodesAry[i].name = node.name;
									newNodesAry[i].isedit = true;
									break;
								case 'delete':
									if (newNodesAry[i].isedit && newNodesAry[i].isadd){
										newNodesAry.splice(i,1);
									}else{
										newNodesAry[i].isdelete = true;
									}
									
									break;
						}
						return false;
					}
				}
			}
    		var path = node.getPath();
    		newNodes.name = node.name;
    		newNodes.level = node.level;
    		newNodes.pid = node.pId;
    		newNodes.parentname = node.getParentNode().name;
    		newNodes.rootName = path[0].name;
    		newNodes.rootId = path[0].id;
			newNodes.id = node.id;
			switch(editTye){
					case 'add':
						newNodes.isadd = true;break;
					case 'edit':
						newNodes.isedit = true;break;
					case 'delete':
						newNodes.isdelete = true;break;
			}				
			newNodesAry.push(newNodes);

			
			console.log(newNodesAry);
			

    	}
		var setting = {
		async:{
              enable:true ,
              autoParam:["id","name","pid","open"],
              dataFilter:null, 
              otherParam:[], 
              dataType: "json",
              type:"post",
              url:"{:U('procategory/getCateTree')}"
		     },
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: true,
				editNameSelectAll: true,
				showRemoveBtn:true
				
			},
			check: {
				enable: false,
				chkStyle:"checkbox",
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onRename: zTreeOnRename,
				onClick: zTreeOnClick,
				onRemove: zTreeOnRemove,

			}
		};
		//点击事件动作
		function zTreeOnClick(event, treeId, treeNode){
			curNodeid = treeNode.id;
			var _link = "http://www/我是分类连接/"+curNodeid;
			$('.cateurl a').attr('href',_link);
			$('.cateurl a').text(_link);
			$("#pro_table_iframe").attr('src',"/aladdin/root/admin.php?s=/procategory/protable/cateid/"+curNodeid)
			$('#cateImg_th').attr('src',treeNode.imgurl);
		}

		



		//删除节点动作
		function zTreeOnRemove(event, treeId, treeNode){
			filterNode(treeNode,'delete')

		}

		
		//修改事件，即重命名
		function zTreeOnRename(event, treeId, treeNode, isCancel){
			filterNode(treeNode,'edit')

		}

		//处理过滤节点对象
		function filter(treeId, parentNode, childNodes) {

			if (!childNodes) return null;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
		}

		var log, className = "dark";
		function beforeDrag(treeId, treeNodes) {
			return false;
		}
		function beforeEditName(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
		}
		function beforeRemove(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
		}
		function onRemove(e, treeId, treeNode) {
			showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		}
		function beforeRename(treeId, treeNode, newName, isCancel) {
			className = (className === "dark" ? "":"dark");
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			if (newName.length == 0) {
				alert("节点名称不能为空.");
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				setTimeout(function(){zTree.editName(treeNode)}, 10);
				return false;
			}
			return true;
		}
		function onRename(e, treeId, treeNode, isCancel) {
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
		}
		function showRemoveBtn(treeId, treeNode) {
			return !treeNode.isFirstNode;
		}
		function showRenameBtn(treeId, treeNode) {
			return !treeNode.isLastNode;
		}
		function showLog(str) {
			if (!log) log = $("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 8) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}
		function getTime() {
			var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
			return (h+":"+m+":"+s+ " " +ms);
		}

		var newCount = 1;
		function addHoverDom(treeId, treeNode) {
			
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0 || treeNode.level>1) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				var addNewNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});

				filterNode(addNewNode[0],'add');
				return false;
			});
		};
		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();

		};
		function selectAll() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
		}
		


			var treeObj = $.fn.zTree.init($("#treeDemo"), setting);

</script>
</block>

<block name="script">
	
</block>
