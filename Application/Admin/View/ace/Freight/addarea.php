<extend name="Public/base"/>

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            新建指定地区
            <form name="form" action="{:U('addArea')}" method="post" class="form-horizontal">
			    <div class="tab-content no-border padding-24">
			        <!-- 基础数据 -->
					<div id="tab1" class="tab-pane active tab1">
							<input type="hidden" name="freightTplID" value="<?php echo $id;?>">
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">选择地区</label>
			                    <div class="col-xs-12 col-sm-6" id="area">
			                        <div>
			                        <select name="countryID" style="width: 300px;" class="select">
			                        	<option value="-1">请选择...</option>
			                        	<?php foreach ($country as $k => $v): ?>
			                            <option value="<?php echo $v['id'];?>"><?php echo $v['name'];?></option>
			                            <?php endforeach ?>
			                        </select></div>
			                        <div>
			                        <select name="provinceID" style="width: 300px;margin-top:20px;" class="select">
			                        	
			                        </select></div>
			                        <div>
			                        <select name="cityID" style="width: 300px;margin-top:20px;" class="select">
			                        
			                        </select></div>
			                        <div>
			                        <select name="districtID" style="width: 300px;margin-top:20px;" class="select">
			                        
			                        </select></div>                   
			                     </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>地区</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="text" class="width-100" name="address" id="address" readonly="readonly" value="">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>首重（元）</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="number" class="width-100" name="firstFreight" value="0.0">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>续重（元）</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="secFreight" value="0.0">
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
	                            <input type="number" style="margin-left:0px;whith:30px;" name="fullSum" value="0.0"><span>元包邮</span>
                            </label>
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
        	  }
        	});

        $(function() {
			$("#free").hide();

			$("#check").change(function(){
					$("#free").toggle();
				});
        });

        $(function() {
			$("select[name=provinceID]").hide();
			$("select[name=cityID]").hide();
			$("select[name=districtID]").hide();
        });

		$("select[name=countryID]").change(function(){
			var pid = $(this).val();
			$("select[name=provinceID]").hide();
			$("select[name=cityID]").hide();
			$("select[name=districtID]").hide();
			if($("select[name=countryID]").val()!=-1){
				value = '';
				value += $("select[name=countryID] option:selected").text();
				$("#address").val(value);
			}else{
				value = '';
				$("#address").val(value);
				}
			$.ajax({
					
				url:"{:U('getAddressByPid')}",
				type:"POST",
				data:{"pid":pid},
				dataType:"json",
				success:function(ret){
					$("select[name=provinceID]").empty();
					if(ret.length>0){
						var cityOption = '<option value="-1">请选择...</option>';
						for(var i=0;i<ret.length;i++){
							cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>'
						}
						$("select[name=provinceID]").append(cityOption);
						$("select[name=provinceID]").show();
					}
				}
			});
		});

		$("select[name=provinceID]").change(function(){
			var pid = $(this).val();
			$("select[name=cityID]").hide();
			$("select[name=districtID]").hide();
			if($("select[name=provinceID]").val()!=-1){
				value = '';
				value += $("select[name=countryID] option:selected").text();
				value += $("select[name=provinceID] option:selected").text();
				$("#address").val(value);
			}else{
				value = '';
				value += $("select[name=countryID] option:selected").text();
				$("#address").val(value);
				}
			$.ajax({
					
				url:"{:U('getAddressByPid')}",
				type:"POST",
				data:{"pid":pid},
				dataType:"json",
				success:function(ret){
					$("select[name=cityID]").empty();
					if(ret.length>0){
						var cityOption = '<option value="-1">请选择...</option>';
						for(var i=0;i<ret.length;i++){
							cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>'
						}
						$("select[name=cityID]").append(cityOption);
						$("select[name=cityID]").show();
					}
				}
			});
		});

		$("select[name=cityID]").change(function(){
			var pid = $(this).val();
			$("select[name=districtID]").hide();
			if($("select[name=cityID]").val()!=-1){
				value = '';
				value += $("select[name=countryID] option:selected").text();
				value += $("select[name=provinceID] option:selected").text();
				value += $("select[name=cityID] option:selected").text();
				$("#address").val(value);
			}else{
				value = '';
				value += $("select[name=countryID] option:selected").text();
				value += $("select[name=provinceID] option:selected").text();
				$("#address").val(value);
				}
			$.ajax({
					
				url:"{:U('getAddressByPid')}",
				type:"POST",
				data:{"pid":pid},
				dataType:"json",
				success:function(ret){
					$("select[name=districtID]").empty();
					if(ret.length>0){
						var cityOption = '<option value="-1">请选择...</option>';
						for(var i=0;i<ret.length;i++){
							cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>'
						}
						$("select[name=districtID]").append(cityOption);
						$("select[name=districtID]").show();
					}
				}
			});
		});

		$("select[name=districtID]").change(function(){
			if($("select[name=districtID]").val()!=-1){
				value = '';
				value += $("select[name=countryID] option:selected").text();
				value += $("select[name=provinceID] option:selected").text();
				value += $("select[name=cityID] option:selected").text();
				value += $("select[name=districtID] option:selected").text();
				$("#address").val(value);
			}else{
				value = '';
				value += $("select[name=countryID] option:selected").text();
				value += $("select[name=provinceID] option:selected").text();
				value += $("select[name=cityID] option:selected").text();
				$("#address").val(value);
				}
		});
    </script>
</block>