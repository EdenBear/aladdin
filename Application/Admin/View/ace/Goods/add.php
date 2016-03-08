<extend name="Public/base" />

<block name="body">
<!-- <link rel="stylesheet" media="all" href="__STATIC__/good_norms/bootstrap-b9db6fb6a7044a11a821eb232dbc425f.css"> -->
<!--<link rel="stylesheet" media="all" href="__STATIC__/good_norms/admin-1b8b10b1e9691c31443ae07992a8ff68.css">-->
<link rel="stylesheet" media="all" href="__STATIC__/good_norms/index-1.css">
<!-- <link rel="stylesheet" media="all" href="__STATIC__/good_norms/admin-c7b228bfa4e82c350100527a56dca1d3.css">
 --> 
<!-- <script src="__STATIC__/good_norms/jquery.min.js"></script> 
 --><script src="__STATIC__/good_norms/jquery-ui.min.js"></script>
<script src="__STATIC__/good_norms/underscore-min.js"></script>
<script src="__STATIC__/good_norms/backbone-min.js"></script>
<script src="__STATIC__/good_norms/bootstrap.min.js"></script> 
<script src="__STATIC__/good_norms/handlebars.min.js"></script>
<script src="__STATIC__/good_norms/admin-2.js"></script>
<script src="__STATIC__/jquery.form.js"></script>

<script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>
<link rel="stylesheet" type="text/css" href="__STATIC__/uploadify/uploadify.css" />

<script type="text/javascript" charset="utf-8">

	//<![CDATA[
	var site = {
		"esaoying_fee" : 0.0,
		"gross_fee_ratio" : 0.0,
		"gross_sales_fee_ratio" : 0.0
	};
	//]]>

</script>
<style>
i:hover{cursor:pointer}
</style>
<div class="table-responsive">

	<div class="dataTables_wrapper">
	<div id="main" class="container layout-admin-v1">

		<div id="content">
			<link rel="stylesheet" href="__STATIC__/good_norms/selectize.css">
			<link rel="stylesheet" media="screen" href="__STATIC__/good_norms/index-db1e18bcdecc30f13f70e3e05d3d5a63.css">
			<!--<link rel="stylesheet" media="screen" href="__STATIC__/good_norms/index-a7d8c6866c24bd29e4bda498b02a6a64.css">-->
    		<script src="__STATIC__/good_norms/angular.min.js"></script>
            <script src="__STATIC__/good_norms/index-1.js"></script>  
            <script src="__STATIC__/good_norms/selectize.min.js"></script> 
            <script src="__STATIC__/good_norms/index-701d7e61fa626c9c41e884a2ea92c189.js"></script>	


			<script type="text/javascript">
				var NORMAL = '1'
				var VIRTUAL_AUTO_SHIP = '2'
				var VIRTUAL_AUTO_SUCCESS = '3'
				var VIRTUAL_LADING_BILL = '4'
				var O2O_PAY_AUTO_SUCCESS = '5'
				var VIRTUAL_COUPON_AUTO_SUCCESS = '6'
				var SECKILL = '7'
				var O2O_SPECIAL = '8'
				var O2O_UNION = '9'
				var o2o_names = [ O2O_PAY_AUTO_SUCCESS, O2O_SPECIAL, O2O_UNION ]
				var new_product = true;
				var product_id = 0;
				var product_o2o_flag = false;
				var user_name = "测试账户";
				var PRO_ATTR_OBJ;//提交对象：商品属性变量
				var PRODUCT_ID = "{$_GET['proid']}";
			</script>
			<div id="product-editor" data-new-record="true" data-product-id="" class="outside">
           

				<form id="product_form" enctype ="multipart/form-data" class="simple_form form-horizontal" role="form" novalidate="novalidate" action="" accept-charset="UTF-8" method="post">
					
					<div class="tab-content" style='border:none'>
                        <!-- tag标签导航 begin -->
                        <div class="tab-box" style="float: left;">
                            <ul id="editor">
                              <li class="product-tab-info active">
                                <a href="{:U('norms#info')}" data-toggle="tab">基本信息</a>
                              </li>
                                <li class="product-tab-norms ">
                                  <a href="{:U('norms#norms')}" data-toggle="tab">商品规格</a>
                                </li>
                                <li class="product-tab-category">
                                  <a href="{:U('norms#category')}" data-toggle="tab">商品类别</a>
                                </li>
                              <li class="product-tab-labels">
                                <a href="new#labels" data-toggle="tab">商品标签</a>
                              </li>
                              <li class="btn-box">
                                    <button type="button" class="btn btn-primary" id='savebtn'>保存</button>
                                <button type="button" class="btn btn-default btn-cancel">取消</button>
                              </li>
                            </ul>
                        </div>  
                        <!-- tag标签导航 end -->
                        <div class="tab-pane active" id='info'> 
                            <!-- 基本信息 -->
                            <include file="Goods:add_info" />
                            
                        </div>
                 
                        
                        <!--放置其他标签页 -->  
						<div class="tab-pane" id="norms">
							<div class="box norms" id="norms-stocks">
								<div class="name">
									<span class="norms-tabs" data-target="norms">商品规格</span>
								</div>
								<div>
									<div class="left">
										<div class="stock-editor ng-scope" ng-app="StockEditor"
											ng-controller="stockCtrl">
											<div class="ui-tag-box ng-pristine ng-valid ui-sortable"
											    id='norms_choose'
												ui-sortable="{axis:&#39;y&#39;,cursor:&#39;move&#39;,handle:&#39;.move-icon&#39;}"
												ng-model="items">
												<!-- ngRepeat: item in items track by $index -->
												<div class="tag-item-box ng-scope"
													ng-repeat="item in items track by $index"
													ng-init="is_show_box=false">
													<ul ng-hide="is_show_box" class="">
														<div class="header ng-binding">
															<span>{{item.name}}</span> 
															<i class="glyphicon glyphicon-pencil"ng-click="edit_item2($index)"  title="点击编辑规格名称和规格值"
																ng-show="can_add()"></i> 
															<i class="glyphicon glyphicon-trash"ng-click="delete_item($index)" title="点击删除规格"
																ng-show="can_add()"></i>
														</div>
														<div ui-sortable="{cursor:&#39;move&#39;}"ng-model="item.values"class="ng-pristine ng-valid ui-sortable">
															<!-- ngRepeat: value in item.values track by $index -->
															<li ng-repeat="value in item.values track by $index"
																class="ng-scope"><input type="checkbox"
																ng-show="can_add()" ng-model="value.checked"
																class="ng-valid ng-dirty"> <label
																title="按住拖动规格值也可以改变顺序哦" class="ng-binding">{{value.name}}</label></li>
															<!-- end ngRepeat: value in item.values track by $index -->
													
														</div>
													</ul>
													<div class="move-icon" ng-hide="is_show_box">
														<i class="glyphicon glyphicon-move" title="按住拖动可以改变规格顺序"></i>
													</div>
													<!-- ngIf: is_show_box -->
												</div>
												<!-- end ngRepeat: item in items track by $index -->
												<div ng-scope="" ng-show="can_add()" class="">
													<button class="btn btn-sm btn-primary btn-new-tag" type="button" ng-click="new_tag()">添加规格</button>
													<!-- ngIf: is_show_box -->
													<!-- ngInclude: undefined -->
													<ng-include src="new_tag_box" ng-if="is_show_box" class="ng-scope">
													   <!------------- 加载html模板 ------------->
													</ng-include>
													<!-- end ngIf: is_show_box -->
												</div>
											</div>
											<div class="grid">
												<table class="table table-bordered"
													ng-show="headers.length&gt;0 &amp;&amp; !is_o2o_product">
													<thead>
														<tr>
															<!-- ngRepeat: header in headers track by $index -->
															<th ng-repeat="header in headers track by $index"
																class="ng-scope ng-binding">{{header}}</th>
															<!-- end ngRepeat: header in headers track by $index -->
															<th width="80">供货价</th>
															<th width="80">标价</th>
															<th width="80">库存</th>
															<th width="80">图片</th>
														</tr>
													</thead>
													<tbody>
														<!-- ngRepeat: row in matrix track by $index -->
														<tr class="ui-row norms_add" ng-repeat="row in matrix track by $index" data-item-key="{{row.key}}">
                                                          <td ng-repeat="cell in row track by $index" rowspan="{{cell.parent.rows}}">{{cell.name}}</td>
                                                            <td>
                                                                <input class="stock-supply" type="text" ng-model="stocks[row.key].supply_price" ng-disabled="uniform_price" >
                                                            </td>
                                                          <td class="price">
                                                              <input class="stock-price" type="text" ng-model="stocks[row.key].price" ng-disabled="uniform_price">
                                                            <div class="prompt">
                                                              <p class="discount-price">折后价：￥</p>
                                                                <p class="agent-commission">金牌用户总积分：￥</p>
                                                                <p class="sales-commission">推广渠道总积分：￥</p>
                                                                  <p class="technology-commission">技术服务总积分：￥</p>
                                                            </div>
                                                          </td>
                                                          <td>
                                                              <input type="text" ng-model="stocks[row.key].quantity" ng-readonly="is_o2o_product" ng-disabled="is_o2o_product">
                                                    	  </td>

                                                           <td>
                                                       
                                                            <input type="file" class='normsUpload' id="uploadFileImg{{stocks[row.key].key}}" name='qiniu[]' style='width: 218px;'/>
                                                           </td>
														
                                                        </tr>
													</tbody>
												</table>
												


											</div>
																						<script id="new_tab_box" type="text/ng-template">
      <div class="new-tag-box">
        <div class="ui-row">
          <label>规格名称</label>
          <input type="text" ng-model="editor.name" class="form-control">
        </div>
        <div class="ui-row">
          <label>规格值</label>
          <input type="text" ng-model="editor.value"
                 placeholder="输入回车即可直接添加"
                 class="form-control" ng-keypress="enter_add_item_value($event)">
          <i class="glyphicon glyphicon-plus" ng-click="add_item_value()"></i>
        </div>
        <div class="ui-row">
          <ul>
            <li ng-repeat="value in editor.values track by $index">
              <span>{{value.name}}</span>
              <i class="glyphicon glyphicon-trash" ng-click="del_item_value($index)"></i>
            </li>
          </ul>
        </div>
        <div class="ui-row toolbar">
          <button class="btn btn-sm btn-success" type="button" ng-click="add_item()" id='add_tiem'>确定</button>
          <button class="btn btn-sm btn-default" type="button" ng-click="cancel_edit_item()">取消</button>
        </div>
        <div class="tools">
          <!--<i class="glyphicon glyphicon-floppy-disk" title="保存新规格到模板中" ng-click="save_to_tpl()"></i>
          <i class="glyphicon glyphicon-th-large" title="从模板中应用规格" ng-click="show_tpl_box()"></i>-->
        </div>
        <div class="template-box" ng-show="tpl_box_show">
          <div class="tools">
            <i class="glyphicon glyphicon-remove" ng-click="close_tpl_box()"></i>
          </div>
          <div class="content">
            <div ng-repeat="item in templates track by $index">
              <ul ng-dblclick="apply_template()" title="双击应用规格模板">
                <div class="header">
                  {{item.name}}
                  <i class="glyphicon glyphicon-trash" ng-click="del_tpl_item($index)"></i>
                </div>
                <li ng-repeat="value in item.values track by $index">
                  <span>{{value.name}}</span>
                  <i class="glyphicon glyphicon-trash" ng-click="del_tpl_item_value($index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </script>
										</div>
									</div>
									<div class="left-lading" style="display: none;"></div>
									<div class="division"></div>
									<div class="right">
										<a class="norms-tabs pull-right btn btn btn-primary"
											data-target="norms-price-tasks">调价记录</a> <br> <br>
										<div class="form-group row required">
											<label class="float required col-sm-4 control-label"
												for="product_supply_price"> <abbr title="必填的">*</abbr>
												供货价(元)
											</label>
											<div class="col-sm-3">
												<input class="numeric decimal required form-control"
													id="p_supply_price" min="0.01" type="number" step="any"
													value="0.0" name="product[supply_price]">

											</div>
											<span
												class="float required col-sm-5 comment show-o2o-product"
												style="display: none;">范围: 0.0 ~ 100(&lt;100)</span>
										</div>
										<div class="form-group row required hide-o2o-product">
											<label class="float required col-sm-4 control-label"
												for="product_market_price"> <abbr title="必填的">*</abbr>
												标价(元)
											</label>
											<div class="col-sm-3">
												<input class="numeric decimal required form-control"
													id="p_market_price" min="0.01" type="number" step="any"
													value="0.0" name="product[market_price]">

											</div>
											<span class="float required col-sm-5 comment">
												参考，计算时以规格表为准 </span>
										</div>
										<div class="form-group row required product_rebate">
											<label class="float required col-sm-4 control-label">
												<abbr title="必填的">*</abbr> 折后价(元)
											</label>
											<div class="col-sm-3">
												<input type="number" id="c_rebate"
													class="numeric integer required form-control" step="1">
											</div>
											<div class="col-sm-5 comment hide-o2o-product">
												折扣率： <input class="numeric decimal required price_line"
													id="p_rebate" type="text" readonly="readonly" step="any"
													value="1.0" name="product[rebate]">

											</div>
											<div class="col-sm-5 comment show-o2o-product"
												style="display: none;">
												换算率(供货价/折后价)： <span id="p_o2orate">NaN</span>
											</div>
										</div>
										<div class="form-group row show-o2o-product"
											style="display: none;">
											<div class="col-sm-9 col-sm-offset-2">根据输入 支付金额 ×
												换算率，计算实际供货价。</div>
										</div>
										<div class="form-group row required hide-o2o-product">
											<div class="apply col-sm-10 col-sm-offset-1">
												<label for="auto_complete_price"> <input
													name="product[uniform_price]" type="hidden" value="0"><input
													id="auto_complete_price" type="checkbox" value="1"
													checked="checked" name="product[uniform_price]"> <span>所有型号规格统一供货价和标价</span>
												</label>
											</div>
										</div>
										<div class="form-group row required product_fee_ratio">
											<label class="float required col-sm-4 control-label"
												for="product_fee_ratio"><abbr title="必填的">*</abbr>
												金牌用户积分</label>
											<div class="col-sm-3">
												<input class="numeric integer required form-control"
													id="c_fee_ratio" step="0.01" type="number" disabled="">
											</div>
											<div class="col-sm-5 comment">
												拨比： <input class="numeric decimal required price_line"
													id="p_fee_ratio" min="0" step="0.01" max="1" type="text"
													readonly="readonly" value="0.0" name="product[fee_ratio]">

											</div>
										</div>
										<div class="form-group row required product_sales_fee_ratio">
											<label class="float required col-sm-4 control-label"
												for="product_sales_fee_ratio"><abbr title="必填的">*</abbr>
												推广渠道积分</label>
											<div class="col-sm-3">
												<input class="numeric integer required form-control"
													id="c_sales_fee_ratio" step="0.01" type="number"
													disabled="">
											</div>
											<div class="col-sm-5 comment">
												拨比： <input class="numeric decimal required price_line"
													id="p_sales_fee_ratio" min="0" step="0.01" max="1"
													type="text" readonly="readonly" value="0.0"
													name="product[sales_fee_ratio]">

											</div>
										</div>
										<div class="form-group row required product_esaoying_fee">
											<label class="float required col-sm-4 control-label"
												for="product_esaoying_fee"><abbr title="必填的">*</abbr>
												技术服务费</label>
											<div class="col-sm-8">
												￥ <span id="c_esaoying_fee">0</span>
												&nbsp;&nbsp;&nbsp;&nbsp; <span> (金牌用户积分 + 推广渠道积分) *
													0.0 </span>
											</div>
										</div>
										<div class="form-group row required">
											<div class="col-sm-10 apply col-sm-offset-1">
												<label for="system-default-fee-ratio"> <input
													name="product[default_ratio]" type="hidden" value="0"><input
													id="system-default-fee-ratio" type="checkbox" value="1"
													checked="checked" name="product[default_ratio]"> <span>使用系统默认分佣</span>
												</label>
											</div>
										</div>

									</div>

								</div>
							</div>
						</div>
						<!-- 商品规格结束 -->
                        <div class="tab-pane" id='category'> 
                            <!-- 商品分类 -->
                            <include file="Goods:add_category" />
                            
                        </div>       
					</div>
					</div>
				</form>
			</div>


		</div>
	</div>
	</div>

</div>
<script>
//判断是否空对象，true表示是空
function isEmptyObject(obj){
	for(var n in obj){return false} 
	return true; 
}
function countObject(obj){
	var i = 0;
	for(var each in record){
          i++;
    }
       return i;
}	
/* 保存提交按钮*/
    $('#savebtn').click(function(){
    	//PRO_ATTR_OBJ 获取到的规格数据，obj
    	var tagNum = $('#norms_choose').children(".tag-item-box").length;
    	var attrObj = new Object();
    	var _proInfo = new Object();//获取商品基本信息
    	
    	for (var i=0; i<tagNum; i++){
    		var singleAttrObj = getAttrObj(i);
			attrObj[singleAttrObj.name] = singleAttrObj.value;
    	}
    	var formData = new FormData($( "#product_form" )[0]);//获取文件流

    	$.ajax({
   	     url : "{:U('UploadFile/uploadImgQiniuAjax')}",
   	     type : "POST",
      	  data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          beforeSend: function () {
		        // 禁用按钮防止重复提交
		        $(this).attr({ disabled: "disabled" });
		        //商品基础信息的验证方法，并获取商品基础信息
		        
		     	_proInfo = proInfoValid();
		        if (isEmptyObject(_proInfo)) {
		        	toastr.error("请先完善商品基础信息");
		        	return false;
		        }
		        if (isEmptyObject(PRO_ATTR_OBJ)) {
		        	toastr.error("请编辑商品规格");
		        	return false;
		        }
		         
		         //TODO 规格图片数量验证匹配
//		        var countAttrImg = $('.normsUpload').size();
//		        if (countAttrImg <countObject(PRO_ATTR_OBJ)) {
//		        	toastr.error("请编辑商品规格");
//		        	return false;
//		        }
		        
    	  },
	      complete: function () {
    			$(this).removeAttr("disabled");
          },
          success: function (returndata) {
          		var imgAry = new Array();
          		imgAry = returndata.img;
				if (returndata.status) {
					var imgNum = 0;
					for (var _key in PRO_ATTR_OBJ) {
						PRO_ATTR_OBJ[_key].skuimg = imgAry[imgNum].url;
						imgNum ++;
					};
	
					
					$.post("{:U('add')}", { attrCombin: PRO_ATTR_OBJ, attrVal:attrObj,$proInfo:_proInfo} );
					
					}else{
						toastr.error('请选择择商品规格图片');
					}
          },
   	});

    })


    
    //获取单个属性规格的对象
    function getAttrObj($index){
    	var attrObj = new Object();
    	var attrValueObj = new Object();
    	var attrBox = $('#norms_choose').children(".tag-item-box:eq("+$index+")");
    	var attrValueNum = attrBox.find('ul .ng-pristine li').length;
    	var attrValAry = new Array();
    	attrObj.name = attrBox.find(".header span").text();
    	for (var i=0; i<attrValueNum; i++){
    		attrValAry[i] = attrBox.find("ul .ng-pristine li:eq("+i+") label").text();
    		}
    	attrObj.value = attrValAry;
    	return attrObj;
    	
    } 
    
    

</script>

</block>
