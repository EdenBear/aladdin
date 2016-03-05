<extend name="Public/base" />

<block name="body">
	<style>
		.left{float: left;}
		.right{float: right;}
		.zTreeDemoBackground{display: table-cell;vertical-align: top;width: 30%;padding: 5px;border: 1px solid #ddd;}
	</style>
	<link rel="stylesheet" href="__STATIC__/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <div class="table-responsive">
    	<div class="dataTables_wrapper">
			
			<div class="zTreeDemoBackground left">
				<div class='ztree left'>
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				
				<div class='operate right'>
					<button class="btn btn-default btn-sm btn-add" id='saveTree'>保存分类</button>
				</div>
				
			</div>
			
    		<div></div>	


    	</div>
    </div>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.exedit.js"></script>
    <script>
    	var zNodes//异步获取的节点对象
    	var newNodesAry = new Array()//获取新的编辑对象集合


    	$.post("{:U('procategory/getCateTree')}",function($data){
    		zNodes = $data;
    	})
    	function addNewNodes(){
    		
    	}
    	//保存树状
    	$('#saveTree').click(function(){
	    	$.post("{:U('procategory/addCateNode')}",
	    		{
	    			'addNodes':newNodesAry,
	    		},	
	    		function($data){

    			})
    	})
    	//过滤处理节点对象
    	function filterNode(node,editTye){

    		var newNodes = new Object();
    		var path = node[0].getPath();

    		newNodes.name = node[0].name;
    		newNodes.level = node[0].level;
    		newNodes.pid = node[0].pId;
    		newNodes.parentname = node[0].getParentNode().name;
    		newNodes.rootName = path[0].name;
    		newNodes.rootId = path[0].id;

    		newNodesAry.push(newNodes);
    		if (editTye == "edit" || editTye == "remove") {
				newNodes.id = node[0].id;
    		}
    		console.log(newNodesAry)

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
				
			},
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onRemove: zTreeOnRemove
			}
		};
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
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				var newNodesObj = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
				
			
				filterNode(newNodesObj,'add');
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
		
		$(document).ready(function(){
			// $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			$.fn.zTree.init($("#treeDemo"), setting);
//			$("#selectAll").bind("click", selectAll);
		});
</script>
</block>

<block name="script">
	
</block>
