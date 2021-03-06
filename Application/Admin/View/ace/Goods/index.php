<extend name="Public/base" />

<block name="body">
<?php 
    $status = ['UP#'=>'上架','DW#'=>'下架','HOL'=>'暂不上架','DEL'=>'删除'];
    $curday = date('Y-m-d');
?>
<div class="table-responsive">
	<div class="dataTables_wrapper">
		<div class="row">
                <div class="col-sm-12">
                    <form class="search-form">
        	            <label for="">
						    <input class="span2" size="16" type="text" value="{$_GET['date_stat']|default=''}" name='date_stat' placeholder='{$curday}'  id='date_stat' class='datepicker'>至
						    <input class="span2" size="16" type="text" value="{$_GET['date_end']|default=''}" name='date_end' placeholder='{$curday}'  id='date_end' class='datepicker'>
        	            </label>
                        <label>供应商
                            <select name="supplier" id="" class='span12'>
		                       <option value="">请选择供应商</option>
		                       <volist name='_supplier' id='vo'>
		                       
		                         <option value="{$vo.id}" <eq name="$_GET['supplier']" value='$vo.id'>selected</eq>>{$vo.name}</option>			                             
		                       </volist>
							</select>
                        </label>
                        <label for="">
                        	<button class="btn btn-sm btn-primary">供应商导出</button>
                        	<button class="btn btn-sm btn-primary">财务导出</button>
                        	<button class="btn btn-sm btn-primary">批量操作</button>
                        </label>

                        <label for="">
                        	<input type="text" class="search-input " name="proid" value="{:I('proid')}" placeholder="编号">
	                        <input type="text" class="search-input day-input" name="procode" value="{:I('procode')}" placeholder="自编号">
	                        <input type="text" class="search-input " name="proname" value="{:I('proname')}" placeholder="商品名称">
                        </label>
                        <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}">
                           <i class="icon-search"></i>搜索
                        </button>
                        <a href="{:U('')}" class="btn btn-sm btn-primary" class="btn">清空搜索条件</a>                        
                    </form>  
                </div>
            </div>

            <!-- 数据列表 -->
            <table class="table table-striped table-bordered table-hover dataTable">
                <thead>
                    <tr>
                    	<th>选项</th>
                        <th>编号</th>
                        <th>自编号</th>
                        <th>供应商</th>
                        <th>图片</th>
                        <th>名称</th>
                        <th>分类</th>
                        <th>供货价</th>
                        <th>销售价</th>
                        <th>总销量</th>
                        <th>状态</th>
                        <th>日期</th>
                        <th>商品操作</th>
                        <th>推广情况</th>
                    </tr>
                </thead>
                <tbody>
				<notempty name="_list">
                <volist name="_list" id="item">
                    <tr>
                    	<td align="center"><input class="J_check" name="ids[]" value="{$item.id}" type="checkbox"></td>
                        <td>{$item.id}</td>
                        <td>{$item.productcode}</td>
                        <td>{$item.supplyname}</td>
                        <td><img src="{$item.imgmaj}" alt="" style="width:50px"/></td>
                        <td>{$item.productname}</td>
                        <td>{$item.categoryname}</td>
                        <td>{:mony_format($item['applyprice'],'yuan')}</td>
                        <td>{:mony_format($item['price'],'yuan')}</td>
                        <td>{$item.sellcount|default=0}</td>
                        <td>{$status[$item['status']]}</td>
                        <td>{$item.createtime}</td>
                        <td>
                            
                            <switch name='item.status'>
                                <case value='DW#'>
                                    <a href="{:U('goods/add',array('proid'=>$item['id']))}" target='_blank'>编辑</a>
                                    <a href="{:U('setStatus',array('id'=>$item['id'],'status'=>'UP#'))}">上架</a>
                                    <a href="{:U('setStatus',array('id'=>$item['id'],'status'=>'DEL'))}">删除</a>
                                </case>
                                <case value='HOL'>
                                    <a href="{:U('goods/add',array('proid'=>$item['id']))}" target='_blank'>编辑</a>
                                    <a href="{:U('setStatus',array('id'=>$item['id'],'status'=>'UP#'))}">上架</a>
                                    <a href="{:U('setStatus',array('id'=>$item['id'],'status'=>'DEL'))}">删除</a>
                                    
                                </case>
                                <case value='UP#'>
                                    <a href="{:U('setStatus',array('id'=>$item['id'],'status'=>'DW#'))}">下架</a>
                                </case>
                            </switch>
                        </td>
                        <td>
                            <a href="">推广情况</a>
                        </td>
                    </tr>
                </volist>
				<else/>
				<td colspan="10" class="text-center"> aOh! 暂时还没有内容! </td>
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

<block name='script'>
<link href="__STATIC__/datetimepicker/css/datetimepicker_blue.css" rel="stylesheet" type="text/css">
<link href="__STATIC__/datetimepicker/css/dropdown.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="__STATIC__/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="__STATIC__/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>
<script type="text/javascript">


    $('#date_stat').datetimepicker({
        format: 'yyyy-mm-dd',
        language:"zh-CN",
        minView:2,
        autoclose:true
    });
    $('#date_end').datetimepicker({
        format: 'yyyy-mm-dd',
        language:"zh-CN",
        minView:2,
        autoclose:true
    });

</script>
</block>