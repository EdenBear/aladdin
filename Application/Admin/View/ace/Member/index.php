<extend name="Public/base" />

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            
            <div class="row">
                <div class="col-sm-12">
                	
                	<a href="{:U('index?type=u.isNormalMember')}" style="font-size: 17px;margin-right:10px;">会员查询</a>
                	<a href="{:U('index?type=u.isGoldType')}" style="font-size: 17px;margin-right:10px;">金牌用户</a>
                	<a href="{:U('index?type=u.isChannelType')}" style="font-size: 17px;margin-right:10px;">渠道用户</a>
                	
                    <form action="<?=U('Member/index')?>" method="POST" class="search-form">
                        <label>昵称
                            <input type="text" class="search-input" name="nickname" value="{:I('nickname')}" placeholder="昵称">
                        </label>
                        <label>手机号码
                            <input type="text" class="search-input" name="mobile" value="{:I('mobile_num')}" placeholder="幸运号">
                        </label>
                        <label>
                            <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('Member/index')}">
                               <i class="icon-search"></i>搜索
                            </button>
                        </label>
                    </form>
                </div>
            </div>
            
            <!-- 数据列表 -->
            <table class="table table-striped table-bordered table-hover dataTable">
			    <thead>
			        <tr>
                        <th class="">头像</th>
                        <th class="">昵称</th>
                        <th class="">幸运号</th>
                        <th class="">类型</th>
                        <th class="">加入时间</th>
                        <th class="">来源</th>
                        <th class="">位置</th>
                        <th class="">操作</th>
					</tr>
			    </thead>
			    <tbody>
					<notempty name="_list">
					<volist name="_list" id="vo">
					<tr>
						<td><img src="{$vo.head_image}" /></td>
						<td>{$vo.nickname}</td>
						<td>{$vo.mobilenum}</td>
						<td>
						<if condition="$vo.isnormalmember eq 1">普通会员</if>
						<if condition="$vo.isgoldtype eq 1">金牌用户</if>
						<if condition="$vo.ischanneltype eq 1">渠道用户</if>
						</td>
						<td>{$vo.inserttime}</td>
						<td>
						<if condition="$vo.usersource eq 'WEB#'">从商场网站注册</if>
						<if condition="$vo.usersource eq 'WX##'">从微信注册</if>
						<if condition="$vo.usersource eq 'QQ##'">从QQ注册</if>
						</td>
						<td>第{$vo.level}层</td>
						<td>
                            <a title="详情" class="ui-pg-div ui-inline btn-detail" data-id="{$vo.id}" style="background: blue;color:white;">
                                详情
                            </a>
                            <a title="团队" href="{:U('team')}" class="ui-pg-div ui-inline btn-detail" style="background: orange;color:white;">
                                团队
                            </a>
                             <a title="订单" href="" class="ui-pg-div ui-inline confirm ajax-get" style="background: green;color:white;">
                                订单
                            </a>
                        </td>
                        
					</tr>
					<tr class="detail-{$vo.id}" >
					<td colspan="7">
					<div id="user-profile-1" class="user-profile row">
						<div style="float:right;margin-right:20px;">
							<a title="关闭" class="ui-pg-div ui-inline btn-close" data-id="{$vo.id}">
	                                                               关闭
	                        </a>
                        </div>
					    <div class="col-xs-12 col-sm-3 center">
					        <div>
					            <span class="profile-picture">
					                <img style="width: 150px;height:150px;" src="" class="editable img-responsive editable-click editable-empty" id="avatar" />
					            </span>
					            <div><span>{$vo.nickname}</span></div><br/>
					            <div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">
					                <div class="inline position-relative">
					                    <a href="#" class="user-title-label dropdown-toggle" data-toggle="dropdown">
					                       
					                        <span class="white">更新微信资料</span>
					                    </a>
					                    
					                </div>
					                
					            </div><br/><br/>
					            <div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">
					                <div class="inline position-relative">
					                    <a href="#" class="user-title-label dropdown-toggle" data-toggle="dropdown">
					                     
					                        <span class="white">更新消费金额</span>
					                    </a>
					                    
					                </div>
					                
					            </div>
					        </div>
					
					        <div class="space-6"></div>
					
					        <div class="hr hr12 dotted"></div>
					    </div>
					
					    <div class="col-xs-12 col-sm-9">
					
					        <div class="profile-user-info profile-user-info-striped">
					        	
					        	<div class="profile-info-row">
					                <div class="profile-info-name"> 昵称 </div>
					
					                <div class="profile-info-value">
					                    <span class="editable">{$vo.nickname}&nbsp;</span>
					                </div>
					            </div>
					        
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 手机号码</div>
					
					                <div class="profile-info-value">
					                    <span class="editable">{$vo.mobilenum}&nbsp;</span>
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 加入时间 </div>
					
					                <div class="profile-info-value">
					                    <span class="editable">{$vo.inserttime}&nbsp;</span>
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 来源 </div>
					
					                <div class="profile-info-value">
					                    <span class="editable">
					                    <if condition="$vo.usersource eq 'WEB#'">从商场网站注册</if>
										<if condition="$vo.usersource eq 'WX##'">从微信注册</if>
										<if condition="$vo.usersource eq 'QQ##'">从QQ注册</if>
					                    &nbsp;</span>
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 标识 </div>
					
					                <div class="profile-info-value">
					                    <i class="icon-email light-orange bigger-110"></i>
					                    &nbsp;
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 微信openid </div>
					
					                <div class="profile-info-value">
					                    <i class="icon-email light-orange bigger-110"></i>
					                    <span class="editable">{$vo.openid}</span>
					                </div>
					            </div>
					            
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 推荐人 </div>
					
					                <div class="profile-info-value">
					                    <i class="icon-email light-orange bigger-110"></i>
					                    <input type="hidden" value="{$vo.parentdistributionuserid}" >
					                    <span class="referee"></span>
					                    &nbsp;
					                </div>
					            </div>
								
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 消费金额 </div>
					
					                <div class="profile-info-value">
					                    <span class="editable">￥&nbsp;</span>
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 账户余额 </div>
					
					                <div class="profile-info-value">
					                    <span class="editable">￥&nbsp;</span>
					                </div>
					            </div>
					
					            <div class="profile-info-row">
					                <div class="profile-info-name"> 账户冻结资金 </div>
					                <div class="profile-info-value">
					                                             ￥&nbsp;
					                </div>
					            </div>
							
					        </div>
					
					    </div>
					</div>
					</td>
					</tr>
					</volist>
					<else/>
					<td colspan="9" class="text-center"> aOh! 暂时还没有内容! </td>
					</notempty>
				</tbody>
            </table>
            <div class="row">
                <div class="col-sm-4">
                </div>
                <div class="col-sm-8">
                    <include file="Public/page"/>
                </div>
            </div>
        </div>
    </div>
</block>

<block name="script">
    <script>
    //导航高亮
    highlight_subnav('{:U('User/paasusers')}');
	</script>
	<script>
		$(function(){
			$("[class^=detail-]").hide();
		});
		
		$(".btn-detail").click(function(){
			var id = $(this).data('id');
			var parentID = $(".detail-"+id).find("input").val();
			console.log(parentID);
			$.ajax({		
				
				url:"{:U('getParent')}",
				type:"POST",
				data:{"pid":parentID},
				dataType:"json",
				
				success:function(ret){
					if(ret!=null){
						$(".referee").text(ret[0].nickname);
					}else{
						$(".referee").text('无');
						}
				}
			});
			
			
			$(".detail-"+id).toggle(1000);

			var tr = $(".detail-"+id).get(0);
			$("[class^=detail-]").each(function(index,item){
				if(tr!=item){
					$(item).hide();
				}
			});
				
		});
				
		$(".btn-close").click(function(){
				var id = $(this).data('id');
				$(".detail-"+id).toggle(1000);
			});
	</script>
	
</block>
