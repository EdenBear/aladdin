<layout name="Goods/add_category" />
<link rel="stylesheet" href="__STATIC__/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<div class="tab-pane" id="norms">
	<div class="box norms" id="norms-stocks"">
    	<div class='ztree left'>
        	<ul id="treeDemo" class="ztree"></ul>
        </div>
	</div>
</div>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="__STATIC__/zTree/js/jquery.ztree.exedit.js"></script>
    <script>

    	var newNodesAry = new Array()//获取新的编辑对象集合
		
		function getProNode(){
			return newNodesAry;
        }
		function zTreeOnCheck(event, treeId, treeNode){
			console.log(newNodesAry.length)
			if (newNodesAry.length !== 0){
				
				
				for (var i=0; i<newNodesAry.length;i++) {
					
					var nodeId = newNodesAry[i].id;
					if (nodeId == treeNode.id && treeNode.checked == false) {
						newNodesAry.splice(i,1);
						return false;
					}
						
				}
			}
			filterNode(treeNode)
				
					
			console.log(newNodesAry.length)
			console.log(newNodesAry)
		}

    	//过滤处理节点对象
    	function filterNode(node,editTye){

    		var newNodes = new Object();
    		var path = node.getPath();
    		
    		newNodes.name = node.name;
    		newNodes.level = node.level;
    		newNodes.pid = node.pId;
    		newNodes.parentname = node.getParentNode().name;
    		newNodes.rootName = path[0].name;
    		newNodes.rootId = path[0].id;
			newNodes.id = node.id;
    		
    		if (editTye == "add") {
				newNodes.isadd = true;
    		}else{
    			newNodes.isadd = false;
    		}
			
    		
			newNodesAry.push(newNodes);
			console.log(newNodesAry)

    	}
		var setting = {
		async:{
              enable:true ,
              autoParam:["id","name","pid","open"],
              dataFilter:null, 
              otherParam:['checkid',"{$product['category']['id']}"], 
              dataType: "json",
              type:"post",
              url:"{:U('procategory/getCateTree')}"
		     },
			view: {
// 				addHoverDom: addHoverDom,
// 				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: false,
				editNameSelectAll: true,
				showRemoveBtn:false
				
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
				onCheck: zTreeOnCheck

			}
		};


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
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				var newNodesObj = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
				
				
				filterNode(newNodesObj[0],'add');
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