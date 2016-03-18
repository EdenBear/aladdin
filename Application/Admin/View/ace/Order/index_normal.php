<include file="Public:iframe" />

<style>
.search-panel{height: 39px;margin: 3px;line-height: 36px;}
.search-panel label{margin-right: 5px;}
.left{float:left}
.order-tb-head label{margin-right: 20px;}
.order-tb-head label span{margin-right: 20px;width: 162px;display: inline-block;}
</style>
<?php 
    $status = ['CAN'=>'已取消','COM'=>'已完成','HOL'=>'暂不上架'];
    $curday = date('Y-m-d');
    $dayBef_7 = date('Y-m-d', strtotime('-7 days'));
    $dayBef_15 = date('Y-m-d', strtotime('-15 days'));
    $dayBef_30 = date('Y-m-d', strtotime('-30 days'));
?>
<form method='get' class='search-form'>
    <!--搜索 时间-->
    <div class='search-panel'>
        <div class='left' style='margin-right: 10px;'>下单时间：</div>
        <div class='left'>
            <label for="day_7"><input type="radio" name='search_day' id='day_7'   value="{$dayBef_7}"  <if condition="$_GET.search_day eq $dayBef_7">checked</if> />近7天</label>
            <label for="day_15"><input type="radio" name='search_day' id='day_15' value="{$dayBef_15}" <if condition="$_GET.search_day eq $dayBef_15">checked</if> />近15天</label>
            <label for="day_30"><input type="radio" name='search_day' id='day_30' value="{$dayBef_30}" <if condition="$_GET.search_day eq $dayBef_30">checked</if> />近30天</label>    
        </div>
        <label class='left'>
            <input class="span2" size="16" type="text" value="{$_GET['date_stat']|default=''}" name='date_stat' placeholder='{$curday}'  id='date_stat' class='datepicker'>至
            <input class="span2" size="16" type="text" value="{$_GET['date_end']|default=''}" name='date_end' placeholder='{$curday}'  id='date_end' class='datepicker'>
        </label>
    </div>
    <!--搜索 状态-->
    <div class='search-panel'>
        <div class='left' style='margin-right: 10px;'>订单状态：</div>
        <div class='left'>
            <label for="stu_all"><input type="radio" name='search_status' value='stu_all' />全部</label>
            <label for="stu_waitsend"><input type="radio" name='search_status' value='stu_waitsend' id='stu_waitsend' <if condition="$_GET.search_status eq stu_waitsend">checked</if> />待发货</label>
            <label for="stu_waitpay"><input type="radio" name='search_status' value='stu_waitpay'   id ='stu_waitpay' <if condition="$_GET.search_status eq stu_waitpay">checked</if> />待付款</label>    
            <label for="stu_waitrece"><input type="radio" name='search_status' value='stu_waitrece' id ='stu_waitrece'<if condition="$_GET.search_status eq stu_waitrece">checked</if>/>待收货</label>    
            <label for="stu_complete"><input type="radio" name='search_status' value='stu_complete' id ='stu_complete'<if condition="$_GET.search_status eq stu_complete">checked</if>/>已完成</label>    
            <label for="stu_close"><input type="radio" name='search_status' value='stu_close'       id ='stu_close'   <if condition="$_GET.search_status eq stu_close">checked</if> />已关闭</label>    
        </div>
    </div>
    <!--搜索 具体条件-->
    <div class="search-panel">
    	<label class='left'>
    		<select name="" id="">
    		  <volist name='supplier' id='vo'>
    		      <option value="{$vo.id}">{$vo.name}</option>
    		  </volist>
    		</select>
    	</label>
    	<label for="">
    		<select name="select" >
    			<option value="">请选择查询条件</option>
    			<option value="ord_code"    <if condition="$_GET.select eq ord_code">selected</if>>订单编号</option>
    			<option value="ord_rename"  <if condition="$_GET.select eq ord_rename">selected</if>>收货人姓名</option>
    			<option value="ord_remobile"<if condition="$_GET.select eq ord_remobile">selected</if>>收货人手机号码</option>
    			<option value="pro_code"    <if condition="$_GET.select eq pro_code">selected</if>>商品自编号</option>
    		</select>
    		<input type="text" name="keyword" value="{$_GET['keyword']}" placeholder="请输查询条件"/>
    	</label>
    	<label for="" class='search-btn' >
    		<button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}">搜索</button>
    		<a href="{:U('')}" class="btn btn-sm btn-primary" class="btn">清空搜索条件</a> 
    		<button class='btn btn-sm btn-primary' type='button'>导出表格</button>
    		<button class='btn btn-sm btn-primary' type='button'>飞豆运单导出</button>
    		<button class='btn btn-sm btn-primary' type='button'>订单回填</button>
    	</label>
    </div>
</form>

  <!--表格数据panel-->
<notempty name='list'>
<volist name='list' id='vo'>
    <div class="panel panel-info">
    
      <div class="panel-heading order-tb-head">
    		<label for="">下单时间: <span>{$vo.parent_ord.createtime}</span></label>
    		<label for="">订单编号: <span>{$vo.parent_ord.ordercode}</span></label>
    		<label for="">订单状态: <span>{$status[$vo['parent_ord']['orderstatus']]}</span></label>
      </div>
    
      <div class="panel-body">
        <table class='table table-bordered'>
    		<thead>
    			<tr>
    				<th width='30%'>商品</th>
    				<th>单价</th>
    				<th>供应商</th>
    				<th>数量</th>
    				<th>收货人</th>
    				<th>下单时间</th>
    				<th>备注</th>
    				<th>发票抬头</th>
    				<th>运费</th>
    				<th>订单金额</th>
    				<th>操作</th>
    			</tr>
    		</thead>
    		<tbody>
    		  <volist name='vo.order' id='item'>
    		  
    			<tr>
    				<td>
    					<div style='height: 24px;line-height: 24px;margin-bottom: 1px;'>订单编号：<span>{$item.ord_info.ordercode}</span></div>
    					<div style='height: 24px;line-height: 24px;margin-bottom: 1px;'>商品编号：<span>{$item.pro_info.productcode}</span></div>
    					<div>
    						<div class='left' style='width: 31%; margin-right: 11px;'><img src="{$item.pro_info.img}" alt="" width='100px' /></div>
    						<div class='left' style='width: 65%;'>
    							<p>{$item.pro_info.productname}</p>
    							<p>{$item.pro_ord_info.skuname}</p>
    						</div>
    					</div>
    				</td>
    				<td>{$item.pro_info.price}</td>
    				<td>{$item.pro_ord_info.supname}</td>
    				<td>{$item.pro_ord_info.buynum}</td>
    				<td>
    					<p>{$vo.parent_ord.recname}</p>
    					<p>{$vo.parent_ord.recmobile}</p>
    				</td>
    				<td>{$item.ord_info.createtime}</td>
    				<td>缺少备注字段</td>
    				<td>{$vo.parent_ord.invoicename}</td>
    				<td>{$item.ord_info.postfee}</td>
    				<td>{$item.ord_info.psum}</td>
    				
    				<td><a href="{:U('detail',array('ordId'=>$vo['parent_ord']['id']))}" target="_blank">订单详情</a></td>
    			</tr>
    		</tbody>
    		  </volist>      
    	</table>    
    	
      </div>
    
    </div>
</volist>
<else/>
aOh! 暂时还没有内容!
</notempty> 

<div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-8">
        <include file="Public/page"/>
    </div>
</div> 
<include file="Public:commonjs" />

<script>


</script>



