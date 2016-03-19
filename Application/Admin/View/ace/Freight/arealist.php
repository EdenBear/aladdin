<extend name="Public/base"/>

<block name="body">
     <div class="table-responsive">
        <div class="dataTables_wrapper">  
            
            <div class="row">
                <div class="col-sm-12">
                    <form id="form" action="<?php echo U('areaList', array('id'=>$id,'p'=>I('get.p', 1)), false);?>" method="post" class="form-horizontal">
                        <label>
                        	<a href="{:U('freightList')}" class="btn btn-sm btn-primary">
			                                              返回
			                 </a>
			                <label>
                            	<a class="btn btn-sm btn-primary" style="margin-top:5px;" href="<?php echo U('addArea', array('id'=>$id,'p'=>I('get.p', 1)), false);?>"><i class="icon-plus"></i>新建指定地区</a>
                        	</label>
                            <input type="text" style="height:35px;margin-top:20px; " class="search-input" name="area" value="{:I('area')}" placeholder="地区">
                        </label>
                        <label>
                            <button class="btn btn-sm btn-primary" type="submit" style="margin-top:15px;" id="search" >
                               <i class="icon-search"></i>搜索
                            </button>
                        </label>&nbsp;
                         
                    </form> 
                    
                </div>
            </div>
            
            <form class="ids">
            <!-- 数据列表 -->
            <table class="table table-striped table-bordered table-hover dataTable">
                <thead>
                    <tr>
                        <th>首重（元）</th>
                        <th>续重（元/kg）</th>
                        <th>地区</th>
                        <th>满额包邮（元）</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
				<notempty name="_list">
                <?php foreach ($_list as $k => $v): ?>
                    <tr>
                        <td>￥<?php echo number_format(($v['firstfreight']/100),2);?></td>
                        <td>￥<?php echo number_format(($v['secfreight']/100),2);?></td>
                        <td><?php echo ($v['address']);?></td>
                        <td>
                        	<?php 
                        	$fullsum = number_format($v['fullsum']/100,2);
                        	switch ($v['fullstatus']){
								case 'USE':
									echo ('启用'.'('.$fullsum.')');
									break;
								case 'FOR':
									echo '关闭';
									break;
							}
                        ?>
                        </td>
                        <td>
                            <a title="编辑" href="<?php echo U('editArea', array('id'=>$v['id'],'p'=>I('get.p', 1)), false);?>" class="ui-pg-div ui-inline">
                                编辑
                            </a>
                            <a title="删除" href="<?php echo U('delArea', array('id'=>$v['id'],'p'=>I('get.p', 1)), false);?>" class="ui-pg-div ui-inline confirm ajax-get">
                                删除
                            </a>
                        </td>
                    </tr>
                <?php endforeach ?>
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