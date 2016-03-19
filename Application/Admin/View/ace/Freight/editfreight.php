<extend name="Public/base"/>

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            编辑运费模板
            <form name="form" action="{:U('editFreight')}" method="post" class="form-horizontal">
			    <div class="tab-content no-border padding-24">
			        <!-- 基础数据 -->
			 		
					<div id="tab1" class="tab-pane active tab1">
							<input type="hidden" name="ID" value="{$info.id}">
							
			                <div class="form-group">			                	
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>首重（元，1kg以内）</label>
			                    <div class="col-xs-12 col-sm-6">		                    	
			                        <input type="number" class="width-100" name="firstFreight" value="<?= number_format($info['firstfreight']/100,2);?>">	
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>续重（元/kg）</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="number" class="width-100" name="secFreight" value="<?= number_format($info['secfreight']/100,2);?>">                    
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">
			                    	<span style="color: red;">*</span>模板名称</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="freightName" value="{$info.freightname}">                    
			                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>            
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">类型</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <select name="freightType" id="value">
			                        	
			                            
			                            <option value="NOE" <if condition=" $info.freighttype eq 'NOE'" >selected="selected"</if> >包邮（指定地区除外）</option>
			                            <option value="BUY" <if condition=" $info.freighttype eq 'BUY'" >selected="selected"</if> >运费到付</option>
			                            <option value="NAT" <if condition=" $info.freighttype eq 'NAT'" >selected="selected"</if> >全国统一价</option>
			                            <option value="NAE" <if condition=" $info.freighttype eq 'NAE'" >selected="selected"</if> >全国统一价（指定地区除外）</option>
			                        	
			                        </select>                    
			                     </div>
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
	                            <input type="number" style="margin-left:0px;whith:30px;" value="0.00" name="fullSum" id="fullsum"><span>元包邮</span>
                            </label>
			                </div>
			                
			                </div>        
			                </div>
			                
			        <div class="clearfix form-actions">
			           <div class="col-xs-12">
			               <button id="sub-btn" class="btn btn-sm btn-success no-border" target-form="form-horizontal" type="submit">
			                                             更新
			               </button> 	  
			                 <a href="javascript:;" class="btn btn-white" onclick="history.go(-1)">
			                                              返回
			                 </a>	
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

        $(function(){
			if("{$info.fullstatus}"=='USE'){
				$("#check").prop("checked",true);
				var fullsum = "<?= number_format($info['fullsum']/100,2);?>"
				$("#fullsum").val(fullsum);
				$("#free").show();
				$("#status").show();
			}else{
				$("#free").hide();
    		}
        });
    </script>
</block>