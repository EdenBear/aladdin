<extend name="Public/base" />

<block name="body">

	<div class="table-responsive">
        <div class="dataTables_wrapper">  
			<div class="col-sm-4">
                    <label>
                        <a href="" class="btn btn-white">我的团队</a>
                    </label>
                </div>
            <!-- 数据列表 -->
            <table class="table table-striped table-bordered table-hover dataTable">
				<thead>
					<tr>
						<th style="width:50px;">折叠</th>
                        <th>用户名称</th>
                        <th style="width:150px;text-align:center;">用户幸运号</th>
                        <th style="width:150px;text-align:center;">销售金额</th>
                        <th style="width:150px;text-align:center;">推广时间</th>
                        
					</tr>
				</thead>
				<tbody>
					<notempty name="lists">
                	<volist name="lists" id="list">
					<tr id="{$list.id}">
						<td>
						<input type="hidden" id="id" value="{$list.id}">
						<if condition="$list.isleaf eq 1"><a class="ui-pg-div ui-inline btn-detail" data-id="{$list.id}">[+]</a></if>
						</td>
                        <td>{$list.nickname}（第{$list.level}层）</td>
                        <td style="width:150px;text-align:center;">{$list.mobilenum}</td>
                        <td style="width:150px;text-align:center;">2345</td>
                        <td style="width:150px;text-align:center;">{$list.inserttime}</td>
                        
					</tr>
					
					</volist>
					<else/>
					<td colspan="6" class="text-center"> aOh! 暂时还没有内容! </td>
					</notempty>
				</tbody>
			</table>
            <div class="row">
                
                <div class="col-sm-8" style="float:right;">
                    <include file="Public/page"/>
                </div>
            </div>
		</div>
	</div>
</block>

<block name="script">
    <script type="text/javascript">
    
        $(function() {
			var index,nextLineID,length;
      		function add(pid,page){
      			$.ajax({		
    				
    				url:"{:U('getChild')}",
    				async:false,
    				type:"POST",
    				data:{"pid":pid,"page":page},
    				dataType:"json",
    				
    				success:function(ret){
    					if(ret!=null){
    						if(ret.length>0){
        						var elememt ='';
        						//var lastid =0;
        						for(var i=0;i<ret.length;i++){
        							elememt +='<tr id="'+ret[i].id+'" class="'+pid+'">';
        							if(ret[i].isleaf==1){
        								elememt +='<td><a class="ui-pg-div ui-inline ab" data-id="'+ret[i].id+'">[+]</a></td>';
            							}else{
            								elememt +='<td></td>';
                							}
        							var num = ret[i].level*2;
        							var str = new Array(num).join("&nbsp;&nbsp;&nbsp;");
        							elememt +='<td>'+str+ret[i].nickname+'（第'+ret[i].level+'层）</td>';
        							elememt +='<td style="width:150px;text-align:center;">'+ret[i].mobilenum+'</td>';
        							elememt +='<td style="width:150px;text-align:center;">2345</td>';
        							elememt +='<td style="width:150px;text-align:center;">'+ret[i].inserttime+'</td>';
        							elememt +='</tr>';
            						}

        						if(nextLineID==-1){
        							$(".dataTable tbody").append(elememt);
        						}else{
        							$("#"+nextLineID).before(elememt);
        						}
        						add(pid,page+1);		
        					}
        					}
    					
    				}
    			});
          		}
        	
            $(".btn-detail").on('click',function(){
            	var pid = $(this).data('id');
        		if($(this).text()=='[+]'){
        			index = ($("#"+pid).index());
        			length = ($(".dataTable tbody tr").length);
        			console.log(pid);
        			console.log(length);
        			if(index==length-1){
						nextLineID=-1;
            		}else{
                		
						nextLineID=$(".dataTable tbody tr:eq("+(index+1)+")").attr("id");
                	}
                	console.log(nextLineID);
        			add(pid,1);
        			
        			$(this).text('[-]');
        		}else{
        			
        				collapse(pid);
        				$(this).text('[+]');
        			}
    		});

            $("table").delegate(".ab",'click',function(){
            	var pid = $(this).data('id');
        		if($(this).text()=='[+]'){
        			index = ($("#"+pid).index());
        			length = ($(".dataTable tbody tr").length);
        			console.log(pid);
        			console.log(length);
        			if(index==length-1){
						nextLineID=-1;
            		}else{
						nextLineID=$(".dataTable tbody tr:eq("+(index+1)+")").attr("id");
                	}
                	console.log(nextLineID);
        			add(pid,1);
        			$(this).text('[-]');
        		}else{
        				
        			collapse(pid);
        				$(this).text('[+]');
        			}
			});
            //导航高亮
            highlight_subnav('{:U('index')}');

            function collapse(pid){
                //console.log(pid);
        		if($("."+pid).length>0){
        			$("."+pid).each(function(){
        				$(this).remove();
        				collapse($(this).attr("id"));
        			});
        		}
        		return;
        	}
            
            
        });
    </script>
</block>
