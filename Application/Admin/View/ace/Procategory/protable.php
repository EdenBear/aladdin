<link rel="stylesheet" href="__ACE__/css/bootstrap.min.css"/>
<link rel="stylesheet" href="__ACE__/css/ace.min.css" />
<style>
	ul{margin: 0px;}
	ul li{list-style-type:none;}
	.table{font-size: 12px;}
	.operate a{display: block;}
	html{overflow: hidden;}
</style>
<?php 
    $status = ['UP#'=>'上架','DW#'=>'下架','HOL'=>'暂不上架'];
    $curday = date('Y-m-d');
?>
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
	        <th>价格</th>
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
                <td>
                	<ul>
                		<li>供货价：{:mony_format($item['applyprice'],'yuan')}</li>
                		<li>销售价：{:mony_format($item['price'],'yuan')}</li>
                	</ul>
                </td>
                <td>{$item.sellcount}</td>
                <td>{$status[$item['status']]}</td>
                <td>{$item.createtime}</td>
                <td class='operate'>
                		
                    <switch name='item.status'>
                        <case value='DW#'>
                            <a href="{:U('goods/add',array('proid'=>$item['id']))}" target='_blank'>编辑</a>
                            <a href="{:U('goods/setStatus',array('id'=>$item['id'],'status'=>'UP#'))}">上架</a>
                            <a href="{:U('goods/setStatus',array('id'=>$item['id'],'status'=>'DEL'))}">删除</a>
                        </case>
                        <case value='HOL'>
                            <a href="{:U('goods/add',array('proid'=>$item['id']))}" target='_blank'>编辑</a>
                            <a href="{:U('goods/setStatus',array('id'=>$item['id'],'status'=>'UP#'))}">上架</a>
                            <a href="{:U('goods/setStatus',array('id'=>$item['id'],'status'=>'DEL'))}">删除</a>
                            
                        </case>
                        <case value='UP#'>
                            <a href="{:U('goods/setStatus',array('id'=>$item['id'],'status'=>'DW#'))}">下架</a>
                        </case>
                    </switch>
                </td>
                <td>
                    <a href="">推广情况</a>
                </td>
            </tr>
        </volist>
		<else/>
		<td colspan="13" class="text-center"> aOh! 暂时还没有内容! </td>
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
