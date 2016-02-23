<extend name="Public/base" />

<block name="body">
<div class="table-responsive">
	<div class="dataTables_wrapper">
		<!-- 配置列表 -->
		<table class="table table-striped table-bordered table-hover dataTable">
			<thead>
    			<th width='30%'>配置项</th>
    			<th width='70%'>内容选项</th>
			</thead>
			<tbody>
				<tr>
					<td>自动收货时间</td>
					<td><select name="" id="">
							<option value="">3天</option>
							<option value="">5天</option>
							<option value="">7天</option>
							<option value="">15天</option>
							<option value="">1一个月</option>
					</select></td>
				</tr>
				<tr>
					<td>订单自动关闭时间</td>
					<td><select name="" id="">
							<option value="">1小时</option>
							<option value="">1天</option>
							<option value="">3天</option>
							<option value="">7天</option>
							<option value="">1一个月</option>
							<option value="">永不关闭</option>
					</select></td>
				</tr>
				<tr>
					<td>可退货时间</td>
					<td>订单在 <select name="" id="">
							<option value="">待收货</option>
							<option value="">待发货</option>
							<option value="">已完成</option>
					</select>后 <input type="text" placeholder='15' style='width: 50px' />天内(含)可退货
					</td>
				</tr>
				<tr>
					<td>可换货时间</td>
					<td>订单在 <select name="" id="">
							<option value="">待收货</option>
							<option value="">待发货</option>
							<option value="">已完成</option>
					</select>后 <input type="text" placeholder='15' style='width: 50px' />天内(含)可退货
					</td>
				</tr>
				<tr>
					<td>订单佣金比例</td>
					<td><input type="text" placeholder='5' style='width: 50px' />%</td>
				</tr>
			</tbody>
		</table>
		<div class="row">
			<div class="col-sm-4">
				<a class="btn btn-white" href="/admin.php?s=/config/add.html">保存</a>
				<a class="btn list_sort btn-white" href="/admin.php?s=/config/sort">取消 </a>
			</div>
		</div>
	</div>
</div>
</block>


