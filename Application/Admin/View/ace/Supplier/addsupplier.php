<extend name="Public/base"/>

<block name="body">
<script type="text/javascript" src="__STATIC__/uploadify/jquery.uploadify.min.js"></script>
	
<div class="tabbable">
	<ul class="nav nav-tabs">
		<li class="active">
			<a data-toggle="tab" href="#home">
				<i class="green icon-home bigger-110"></i>
				供应商基本信息
			</a>
		</li>

		<li>
			<a data-toggle="tab" href="#profile">
			    <i class="green icon-external-link bigger-110"></i>
				客服售后
			</a>
		</li>
		
		<li>
			<a data-toggle="tab" href="#user">
			    <i class="green icon-home bigger-110"></i>
				操作员信息
			</a>
		</li>

	</ul>
    <form name="form" action="{:U('addSupplier')}" method="post" class="form-horizontal">
	<div class="tab-content">
		<div id="home" class="tab-pane in active">
		    <div id="tab1" class="tab-pane active tab1">                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>供应商名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="name" value="">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div> 
			                              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">供应商编号</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="code" value="">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>结算周期（天）</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="balanceCycle" value="7">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>起始时间</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" style="width:200px;" name="startTime" value="" id="popupDatepicker" readonly>
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>企业名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="companyName" value="">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">地址</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="address" value="">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>联系人</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="contactName" value="">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>电话</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="text" class="width-100" name="contactPhone" value="">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">平台服务费</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="platformServiceFee" value="0.00">
			                    </div>
			                </div>
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">是否启用</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <label>
                                <input type="checkbox" class="ace ace-switch ace-switch-6 ajax-get" name="status" value="OK#" >
                                <span class="lbl"></span>
                            </label>
			                    </div>
			                </div>
			                    
			                </div>
		</div>
		
		<div id="user" class="tab-pane">
		<?php 
        

        $options = array(
            'label_text'=>'手机号码',
            'help'=>'用于登录、找回密码和微信端绑定账号用',
            'icon'=>'icon-mobile-phone'
        );
        echo ace_input_m($options ,array('name'=>'username','class'=>'width-100 mobile'),'',' maxlength="11"');

        $options = array(
            'label_text'=>'密码',
            'help'=>'用户密码不能少于6位',
            'icon'=>'icon-key'
        );
        echo ace_password($options,'password','','maxlength="16"');

        $options = array(
            'label_text'=>'确认密码',
            'icon'=>'icon-retweet'
        );
        echo ace_password($options,'repassword','','maxlength="16"');

        $options = array(
            'label_text'=>'邮箱',
            'help'=>'用户邮箱',
            'icon'=>'icon-email'
        );
        echo ace_input_m($options ,'email','','maxlength="128"');

        
    ?> 
		</div>

		<div id="profile" class="tab-pane">
			
            <div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">默认物流公司</label>
				<div class="col-xs-12 col-sm-6">
					<select name="defaultTransfer">
						<option value="顺丰快递">顺丰快递</option>
						<option value="中通快递">中通快递</option>
						<option value="圆通快递">圆通快递</option>
						<option value="申通快递">申通快递</option>
						<option value="天天快递">天天快递</option>
						<option value="韵达快递">韵达快递</option>
						<option value="德邦物流">德邦物流</option>
						<option value="优速快递">优速快递</option>
						<option value="国通快递">国通快递</option>
					</select>
				</div>
				
			</div>
			
			
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">客服电话</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="customerServicePhone" class="width-100" value="">
				</div>
			</div>
			
			
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">美恰客服代码</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="meiqiaCustomerServicePhone" class="width-100" value="">
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
					<input type="text" name="returnAddress" class="width-100" value="">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">收件人</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="returnContactName" class="width-100" value="">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">收件人电话</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="returnContactPhone" class="width-100" value="">
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
	var now = new Date();
	$('#popupDatepicker').val(now.getFullYear() + "-"+ (now.getMonth()+1)+"-"+now.getDate());
	$(document).ready(function() {   
		   
	       $('#popupDatepicker').datepicker(); //绑定输入框
		
		});

	$("form[name=form]").validate({
  	  rules:{
  		name:{
  	      required:true,
  	    },
  	  mobile:{
  	      required:true,
  	    },
	  passWord:{
	      required:true,
	    },
	    repassWord:{
		      required:true,
		    },
	  email:{
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
