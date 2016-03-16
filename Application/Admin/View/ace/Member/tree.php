
<volist name="tree" id="list">
	<dl class="cate-item">
		<dt class="cf">
			
				<div class="btn-toolbar opt-btn cf" style="width: 150px;text-align: center;">{$list.inserttime}</div>
				<div class="fold" ><i></i></div>
				<div class="order" style="width: 150px;text-align: center;">3</div>
				<div class="order" style="width: 150px;text-align: center;">{$list.mobilenum}</div>
				<div class="name">
					<span class="tab-sign"></span>
					<input type="hidden" id="id" value="{$list.id}">
					<input type="text" name="title" disabled class="text" style="width: 130px;" value="{$list.nickname}（第{$list.level}层）">

					<span class="help-inline msg"></span>
				</div>
			    <div style="clear: both;"></div>
			
		</dt>
		<notempty name="list['_']">
			<dd>
				{:R('Category/tree', array($list['_']))}
			</dd>
		</notempty>
	</dl>
</volist>

                
                
