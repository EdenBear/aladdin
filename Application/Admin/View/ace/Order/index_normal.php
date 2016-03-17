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
?>
<!--搜索 时间-->
<div class='search-panel'>
    <div class='left' style='margin-right: 10px;'>下单时间：</div>
    <div class='left'>
        <label for="day_7"><input type="radio" name='search_day' id='day_7' />近7天</label>
        <label for="day_15"><input type="radio" name='search_day' id='day_15' />近7天</label>
        <label for="day_30"><input type="radio" name='search_day' id='day_30' />近7天</label>    
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
        <label for="stu_all"><input type="radio" name='search_status' id='stu_all' />全部</label>
        <label for="stu_waitsend"><input type="radio" name='search_status' id='stu_waitsend' />待发货</label>
        <label for="stu_waitpay"><input type="radio" name='search_status' id='stu_waitpay' />待付款</label>    
        <label for="stu_waitrece"><input type="radio" name='search_status' id='stu_waitrece' />待收货</label>    
        <label for="stu_complete"><input type="radio" name='search_status' id='stu_complete' />已完成</label>    
        <label for="stu_close"><input type="radio" name='search_status' id='stu_close' />已关闭</label>    
    </div>
</div>
<!--搜索 具体条件-->
<div class="search-panel">
	<label class='left'>
		<select name="" id=""></select>
	</label>
	<label for="">
		<select name="keyword" id="">
			<option value="">订单编号</option>
			<option value="">收货人姓名</option>
			<option value="">收货人手机号码</option>
			<option value="">商品自编号</option>
		</select>
		<input type="text" name="{$_GET['keyword']}"/>
	</label>
	<label for="" class='search-btn' >
		<button class='btn btn-sm btn-primary' type='button'>搜索</button>
		<button class='btn btn-sm btn-primary' type='button'>导出表格</button>
		<button class='btn btn-sm btn-primary' type='button'>飞豆运单导出</button>
		<button class='btn btn-sm btn-primary' type='button'>订单回填</button>
	</label>
</div>

  <!--表格数据panel-->
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
    					<div style='height: 24px;line-height: 24px;margin-bottom: 5px;'>订单编号：<span>{$item.ord_info.ordercode}</span></div>
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
    				<td>缺少公司抬头</td>
    				<td>{$item.ord_info.postfee}</td>
    				<td>{$item.ord_info.psum}</td>
    				<td><a href="">订单详情</a></td>
    			</tr>
    		</tbody>
    		  </volist>      
    	</table>    
    	
      </div>
    
    </div>
</volist>
<div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-8">
        <include file="Public/page"/>
    </div>
</div> 
<include file="Public:commonjs" />
</block>



