<extend name="Public/base"/>

<block name="body">
<script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>
	
<div class="tabbable">
	<ul class="nav nav-tabs">
		<li class="active">
			<a data-toggle="tab" href="#home">
				<i class="green icon-home bigger-110"></i>
				基本信息
			</a>
		</li>

		<li>
			<a data-toggle="tab" href="#profile">
			    <i class="green icon-external-link bigger-110"></i>
				客服售后
			</a>
		</li>

	</ul>
    <form name="form" action="{:U('editSupplier')}" method="post" class="form-horizontal">
    <input type="hidden" name="ID" value="{$list.id}">
	<div class="tab-content">
	
		<div id="home" class="tab-pane in active">
		    <div id="tab1" class="tab-pane active tab1">                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>供应商名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="name" value="{$list.name}">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">供应商编号</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="code" value="{$list.code}">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>结算周期（天）</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="balanceCycle" value="{$list.balancecycle}">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>起始时间</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="startTime" value="{$list.starttime}" id="popupDatepicker" readonly >
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>企业名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="companyName" value="{$list.companyname}">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">地址</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="address" value="{$list.address}">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>联系人</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="contactName" value="{$list.contactname}">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>电话</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="contactPhone" value="{$list.contactphone}">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">平台服务费</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="platformServiceFee" value="<?= number_format($list['platformservicefee']/100,2);?>">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">是否启用</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <label>
                                <input type="checkbox" class="ace ace-switch ace-switch-6 ajax-get" name="status" value="OK#" <if condition="$list.status eq 'OK#'">checked='checked'</if> >
                                <span class="lbl"></span>
                            </label>
			                    </div>
			                </div>
			                    
			                </div>
		</div>

		<div id="profile" class="tab-pane">
			
            <div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">默认物流公司</label>
				<div class="col-xs-12 col-sm-6">
					<select name="defaultTransfer">
						<option value="顺丰快递" <if condition="$list.defaulttransfer eq '顺丰快递'">selected</if>>顺丰快递</option>
						<option value="中通快递" <if condition="$list.defaulttransfer eq '中通快递'">selected</if>>中通快递</option>
						<option value="圆通快递" <if condition="$list.defaulttransfer eq '圆通快递'">selected</if>>圆通快递</option>
						<option value="申通快递" <if condition="$list.defaulttransfer eq '申通快递'">selected</if>>申通快递</option>
						<option value="天天快递" <if condition="$list.defaulttransfer eq '天天快递'">selected</if>>天天快递</option>
						<option value="韵达快递" <if condition="$list.defaulttransfer eq '韵达快递'">selected</if>>韵达快递</option>
						<option value="德邦物流" <if condition="$list.defaulttransfer eq '德邦物流'">selected</if>>德邦物流</option>
						<option value="优速快递" <if condition="$list.defaulttransfer eq '优速快递'">selected</if>>优速快递</option>
						<option value="国通快递" <if condition="$list.defaulttransfer eq '国通快递'">selected</if>>国通快递</option>
					</select>
				</div>
				
			</div>
			
			
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">客服电话</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="customerServicePhone" class="width-100" value="{$list.customerservicephone}">
				</div>
			</div>
			
			
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">美恰客服代码</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="meiqiaCustomerServicePhone" class="width-100" value="{$list.meiqiacustomerservicephone}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right"></label>
				<div class="col-xs-12 col-sm-6">
					<a href="{:U('setting')}" target="_black">如何设置？</a>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">退货地址</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="returnAddress" class="width-100" value="{$list.returnaddress}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">收件人</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="returnContactName" class="width-100" value="{$list.returncontactname}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">收件人电话</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="returnContactPhone" class="width-100" value="{$list.returncontactphone}">
				</div>
			</div>
		</div>
        <div class="clearfix form-actions">
			<div class="col-xs-12">
			   <button id="sub-btn" class="btn btn-sm btn-success no-border" target-form="form-horizontal" type="submit">
			       	 确认保存
			   </button> 	  
			   <a href="javascript:;" class="btn btn-white" onclick="history.go(-1)">
			       	 返回
			   </a>	
			</div>
		</div> 
		
	</div>
	
    </form>
</div>	
</block>

<block name="script">

<link href="__ACE__/css/jquery-ui.css" rel="stylesheet">
<script src="__ACE__/js/jquery-1.8.1.js"></script>
<script src="__ACE__/js/jquery-ui.js"></script>
<script src="__ACE__/js/dateinput-ch-ZN.js"></script>

<script src="__ACE__/js/jquery.validate.min.js"></script>
<script src="__ACE__/js/validate_zh_cn.js"></script>

	<script type="text/javascript">
	$(document).ready(function() {   
        
	       $('#popupDatepicker').datepicker(); //绑定输入框
		
		});

	$("form[name=form]").validate({
	  	  rules:{
	  		name:{
	  	      required:true,
	  	    },
	  	  balanceCycle:{
	  	      required:true,
	  	      number:true,
	  	    },
	  	  startTime:{
	    	      required:true,
	    	    },
	      companyName:{
	      	required:true,
	      },
	      contactName:{
	    	required:true,
	   	  },
	   	  contactPhone:{
	    	required:true,
	   	  },
	  	  }
	  	});
	
		//导航高亮
		highlight_subnav('{:U('Category/index')}');
	</script>
</block>
