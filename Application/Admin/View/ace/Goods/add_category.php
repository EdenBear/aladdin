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

        //执行check动作
		function zTreeOnCheck(event, treeId, treeNode){
			PRODUCT_CATE_ID = treeNode.id;

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
				enable: true,
				chkStyle: "radio",
		radioType: "all"
				
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

		

		var treeObj = $.fn.zTree.init($("#treeDemo"), setting);
		
		function getCateNode(){
			var nodes = treeObj.getCheckedNodes(true);
			return nodes[0].id;
		}

</script>