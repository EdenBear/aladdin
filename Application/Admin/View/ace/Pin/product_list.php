 <include file="Public:iframe" />
 <style>
 body{width:600px;over;padding: 20px 10px 10px;}
 
 </style>
<form action="{:U('')}" method='get' style='margin-bottom:3px;' class="search-form">

    <select name="select" id="">
        <option value="select_name" >商品名称</option>
        <option value="select_code" >商品编号</option>
    </select>
    <input type="text" name='keyword' />
    <label for="">
        <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}" ><i class='icon-search'></i>搜索</button>  
        <a href="{:U('')}" class="btn btn-sm btn-primary" class="btn">清空搜索条件</a>    
    </label>
</form>
    
    <table class='table table-striped table-bordered table-hover dataTable' class='pinproduct'>
        <thead>
            <td>选择</td>
            <th>图片</th>
            <th>商品名称</th>
            <th>商品编号</th>
        </thead>
        <tbody>
            <notempty name='list'>
                <volist name='list' id='vo'>
                    <tr>
                        <td><input type="radio" name='proid' value='{$vo.id}' /></td>
                        <td id="img_{$vo.id}"><img src="{$vo.img}" alt="" width='80' /></td>
                        <td id='name_{$vo.id}'>{$vo.productname}</td>
                        <td id='code_{$vo.id}'>{$vo.productcode}</td>
                        <input type="hidden" id='supply_{$vo.id}' value='{$vo.supplyid}' />
                        <input type="hidden" id='price_{$vo.id}' value='{$vo.price}' />
                    </tr>
                </volist>
            <else/>
                aOh! 暂时还没有内容!
            </notempty>
        </tbody>
        
    </table>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-8">
            <include file="Public/page"/>
        </div>
    </div> 

 <include file="Public:commonjs" />
<script>

function getInfo(){
	var proInfo = new Array();
	var id = $("input[name='proid']:checked").val();
	proInfo.img = $('#img_'+id).find('img').attr("src");
	proInfo.name = $('#name_'+id).text();
	proInfo.code = $('#code_'+id).text();
	proInfo.id = id;
	proInfo.supply = $('#supply_'+id).val();
	proInfo.price = $('#price_'+id).val();
	return proInfo;
}


</script>
