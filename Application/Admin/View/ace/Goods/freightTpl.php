
<style>
	.next,.prev{height: 32px;}
	.freaighttpl{width: 475px;margin: 5px;}
</style>

<table class="table table-striped table-bordered table-hover freaighttpl">

    <thead>
        <th width='10%'>选项</th>
        <th width='10%'>编号</th>
        <th width='80%'>名称</th>
    </thead>
    <tobody>
        <notempty name='list'>
            <volist name='list' id='vo' >
                <tr>
                    <td><input type="radio" name='freightid' value='{$vo.id}' /></td>
                    <td>{$vo.id}</td>
                    <td>{$vo.freightname}</td>
                </tr>        
            </volist>  
         <else/>

         <td colspan="3" class="text-center"> aOh! 暂时还没有内容! </td>         
        </notempty>


    </tobody>
</table>
<div class="row">
    <div class="col-sm-4">
    </div>
    <div class="col-sm-8">
        <include file="Public/page"/>
    </div>
</div> 
<script>
//更新产品时，设置选中操作
if (freightVal !== ''){
	$("input[value="+freightVal+"]").attr('checked',true)
}






</script>