<extend name="Public/base"/>

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            
            <div class="row">
                <div class="col-sm-12">
                    <form class="search-form" action="{:U('supplierList')}" method="post">
                        <label>
                        	<select type="select" class="search-input" style="height: 35px;margin-right:-3px;" name="key">
                        		<option value="companyName" <if condition="I('key') eq 'companyName'">selected=selected</if>>公司名称</option>
                        		<option value="contactName" <if condition="I('key') eq 'contactName'">selected=selected</if>>联系人</option>
                        		<option value="contactPhone" <if condition="I('key') eq 'contactPhone'">selected=selected</if>>联系电话</option>
                        	</select>
                            <input type="text" class="search-input" style="height: 35px;margin-left:0px;" name="value" value="{:I('value')}" placeholder="">
                        </label>
                        <label>
                            <button class="btn btn-sm btn-primary" type="submit" >
                               <i class="icon-search"></i>搜索
                            </button>
                        </label>&nbsp;
                         <label>
                            <a class="btn btn-sm btn-primary" href="{:U('addSupplier')}"><i class="icon-plus"></i>新增供应商</a>
                        </label>
                    </form> 
                    
                </div>
            </div>
            
            <form class="ids">
            <!-- 数据列表 -->
            <table class="table table-striped table-bordered table-hover dataTable">
                <thead>
                    <tr>
                        <th>供应商名称</th>
                        <th>编号</th>
                        <th>结算周期</th>
                        <th>公司</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>在线客服</th>
                        <th>是否启用</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
				<notempty name="_list">
                <volist name="_list" id="vo">
                    <tr>
                        <td>{$vo.name}</td>
                        <td>{$vo.code}</td>
                        <td>{$vo.balancecycle}</td>
                        <td>{$vo.companyname}</td>
                        <td>{$vo.contactname}</td>
                        <td>{$vo.contactphone}</td>
                        <td>{$vo.meiqiacustomerservicephone}</td>
                        <td>
                            <if condition="$vo.status eq 'OK#'">启用<else />禁用</if>
                        </td>
                        <td>
                            <a title="编辑" href="{:U('editSupplier?id='.$vo['id'])}" class="ui-pg-div ui-inline" style="background: orange;color:white;">
                                修改
                            </a>
                            <if condition="$vo.status eq 'OK#'">
                            <a title="删除" href="{:U('changeStatus?status=OFF&id='.$vo['id'])}" class="ui-pg-div ui-inline" style="background: red;color:white;">
                                禁用
                            </a><else />
                             <a title="删除" href="{:U('changeStatus?status=OK&id='.$vo['id'])}" class="ui-pg-div ui-inline" style="background: green;color:white;">
                                启用
                            </a>
                            </if>
                        </td>
                    </tr>
                </volist>
				<else/>
				<td colspan="10" class="text-center"> aOh! 暂时还没有内容! </td>
				</notempty>
                </tbody>
            </table>
            </form>
        </div>
    </div>
</block>

<block name="script">
    <script type="text/javascript">
        $(function() {
            //搜索功能
            $("#search").click(function() {
                var url = $(this).attr('url');
                var query = $('.search-form').serialize();
                query = query.replace(/(&|^)(\w*?\d*?\-*?_*?)*?=?((?=&)|(?=$))/g, '');
                query = query.replace(/^&/g, '');
                if (url.indexOf('?') > 0) {
                    url += '&' + query;
                } else {
                    url += '?' + query;
                }
                window.location.href = url;
            });
            //回车搜索
            $(".search-input").keyup(function(e) {
                if (e.keyCode === 13) {
                    $("#search").click();
                    return false;
                }
            });
            //导航高亮
            highlight_subnav('{:U('index')}');

        });
    </script>
</block>