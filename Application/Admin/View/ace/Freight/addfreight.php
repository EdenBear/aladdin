<extend name="Public/base"/>
<style>
    #first.error{
      border: 1px solid red;
      margin-left: 2px;
      font-color:red;
      padding: 2px;
    }
    #attr{
      list-style: none;
    }
    #attr li{
      margin: 3px;
    }
  </style>
<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            新建运费模板
            <form name="form" action="{:U('addFreight')}" method="post" class="form-horizontal">
			    <div class="tab-content no-border padding-24">
			        <!-- 基础数据 -->
					<div id="tab1" class="tab-pane active tab1">
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>首重（元，1kg以内）</label>
			                    <div class="col-xs-12 col-sm-6" id="first">
			                        <input type="number" class="width-100" name="firstFreight" value="0.00">                    
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>续重（元/kg）</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="number" class="width-100" name="secFreight" value="0.00">                    
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>模板名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="freightName" value="">                    
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">类型</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <select name="freightType" id="value">
			                            <option value="NOE" selected="">包邮（指定地区除外）</option>
			                            <option value="BUY">运费到付</option>
			                            <option value="NAT" id="nat">全国统一价</option>
			                            <option value="NAE" id="nae">全国统一价（指定地区除外）</option>
			                        </select>                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>
			                <div class="form-group" id="status">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">是否开启满额包邮</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <label>
                                <input type="checkbox" id="check" class="ace ace-switch ace-switch-6 ajax-get" name="fullStatus" value="USE" >
                                <span class="lbl"></span>
                            </label>
                            <label id="free">
	                            <span style="margin-left:0px;">满</span>
	                            <input type="number" style="margin-left:0px;whith:30px;" name="fullSum" value="0.00"><span>元包邮</span>
                            </label>
			                </div>
			                
			                </div>        
			                </div>
			        <div class="clearfix form-actions">
			           <div class="col-xs-12">
			               <?=ace_srbtn()?>	
			           </div>
			       </div>    
		       </div>
           </form>
        </div>
    </div>
</block>

<block name="script">
<script src="__ACE__/js/jquery-1.7.2.min.js"></script>
<script src="__ACE__/js/jquery.validate.min.js"></script>
<script src="__ACE__/js/validate_zh_cn.js"></script>
<script type="text/javascript">
        $(function() {
            //导航高亮
            highlight_subnav('{:U('index')}');

        });

        $("form[name=form]").validate({
      	  rules:{
      		  firstFreight:{
      	      required:true,
      	    },
      	    secFreight:{
      	      required:true,
      	    },
      	  freightName:{
      	      required:true,
      	    },
      	  }
      	});
</script>
    <script type="text/javascript">
        $(function() {
            $("#status").hide();
			$("#free").hide();

			$("#value").change(function(){
				
				if($(this).val()=='NAT'||$(this).val()=='NAE'){
					$("#status").show();
					$("#check").attr("checked",false);
					$("#free").hide();
				}else{
						$("#check").attr("checked",false);
						$("#status").hide();
						$("#free").hide();
					}
				});
			$("#check").change(function(){
					$("#free").toggle();
				});
        });
    </script>
</block>