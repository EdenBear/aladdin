<extend name="Public/base"/>

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            编辑指定地区
            <form name="form" action="{:U('editArea')}" method="post" class="form-horizontal">
			    <div class="tab-content no-border padding-24">
			        <!-- 基础数据 -->
					<div id="tab1" class="tab-pane active tab1">
							<foreach name="area" item="area">
							<input type="hidden" name="ID" value="{$area.id}">
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right">选择地区</label>
			                    <div class="col-xs-12 col-sm-6" id="area">
			                        <div>
			                        <select name="countryID" style="width: 300px;" class="select">
			                        	<option value="-1">请选择...</option>
			                        	<volist name="country" id="vo">
				                            <option value="{$vo.id}" <if condition=" $area.countryid eq $vo.id " >selected="selected"</if> >{$vo.name}</option>
			                            </volist>
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
			                        <input type="text" class="width-100" name="address" id="address" readonly="readonly" value="{$area.address}">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>                
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>首重（元）</label>
			                    <div class="col-xs-12 col-sm-6">
			                        <input type="number" class="width-100" name="firstFreight" value="{$area['firstfreight']/100}">                    </div>
			                    <div class="help-block col-xs-12 col-sm-reset inline">
			                    </div>
			                </div>              
			                <div class="form-group">
			                    <label class="col-xs-12 col-sm-2 control-label no-padding-right"><span style="color: red;">*</span>续重（元）</label>
			                    <div class="col-xs-12 col-sm-6">
			                       <input type="number" class="width-100" name="secFreight" value="{$area['secfreight']/100}">
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
	                            <input type="number" style="margin-left:0px;whith:30px;" value="0.0" name="fullSum" id="fullsum"><span>元包邮</span>
                            </label>
			                </div>
			                </div>
			                <script>
				                $(function(){
				        			if("{$area.fullstatus}"=='USE'){
				        				$("#check").prop("checked",true);
				        				var fullsum = "{$area.fullsum}"/100;
				        				$("#fullsum").val(fullsum);
				        				$("#free").show();
				        			}else{
				        				$("#free").hide();
				            		}
				                });

				                $(function() {
				        			$("select[name=provinceID]").hide();
				        			$("select[name=cityID]").hide();
				        			$("select[name=districtID]").hide();
				        			if("{$area.provinceid}">0){
					        			var id = "{$area.provinceid}";
				        				var pid = "{$area.countryid}";
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
					        							if(id == ret[i].id){
					        								cityOption+='<option value="'+ret[i].id+'" selected="selected" >'+ret[i].name+'</option>';
						        							}else{
				        										cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>';
						        							}
				        							}
				        							$("select[name=provinceID]").append(cityOption);
				        							$("select[name=provinceID]").show();
				        						}
				        					}
				        				});
				        			}

				        			if("{$area.cityid}">0){
					        			var cid = "{$area.cityid}";
				        				var pid = "{$area.provinceid}";
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
					        							if(cid == ret[i].id){
					        								cityOption+='<option value="'+ret[i].id+'" selected="selected" >'+ret[i].name+'</option>';
						        							}else{
				        										cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>';
						        							}
				        							}
				        							$("select[name=cityID]").append(cityOption);
				        							$("select[name=cityID]").show();
				        						}
				        					}
				        				});
				        			}

				        			if("{$area.districtid}">0){
					        			var did = "{$area.districtid}";
				        				var pid = "{$area.cityid}";
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
					        							if(did == ret[i].id){
					        								cityOption+='<option value="'+ret[i].id+'" selected="selected" >'+ret[i].name+'</option>';
						        							}else{
				        										cityOption+='<option value="'+ret[i].id+'">'+ret[i].name+'</option>';
						        							}
				        							}
				        							$("select[name=districtID]").append(cityOption);
				        							$("select[name=districtID]").show();
				        						}
				        					}
				        				});
				        			}
				                });
			                </script>
			                </foreach>       
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
        	  }
        	});

        $(function() {
			$("#check").change(function(){
					$("#free").toggle();
				});
        });

        

        

		$("select[name=countryID]").change(function(){
			var pid = $(this).val();
			$("select[name=provinceID]").hide();
			$("select[name=cityID]").hide();
			$("select[name=districtID]").hide();
			var value = '';
			value += $("select[name=countryID] option:selected").text();
			$("#address").val(value);
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
			var value = '';
			value += $("select[name=countryID] option:selected").text();
			value += $("select[name=provinceID] option:selected").text();
			$("#address").val(value);
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
			var value = '';
			value += $("select[name=countryID] option:selected").text();
			value += $("select[name=provinceID] option:selected").text();
			value += $("select[name=cityID] option:selected").text();
			$("#address").val(value);
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
			var value = '';
			value += $("select[name=countryID] option:selected").text();
			value += $("select[name=provinceID] option:selected").text();
			value += $("select[name=cityID] option:selected").text();
			value += $("select[name=districtID] option:selected").text();
			$("#address").val(value);
		});
    </script>
</block>