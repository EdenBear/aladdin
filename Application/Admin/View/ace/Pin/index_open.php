<extend name="Public/base" />
<block name='body'>
<div class="table-responsive">
    <div class="dataTables_wrapper">
        <!-- 拼图列表  -->
        <div  class="tab-pane" id="idx_normal">
            <form action="{:U('')}" method='post'>
            
            	<div class="row">
                    <select name="select_time" id="">
                        <option value="">查找时间</option>
                        <option value="createTime">创建时间</option>
                        <option value="beginTime">开始时间</option>
                        <option value="endTime">结束时间</option>
                    </select>
                    <label for="">
        			    <input class="span2" size="16" type="text" value="{:I('date_stat')}" name='date_stat' placeholder="{:date('Y-m-d')}"  id='date_stat' class='datepicker'>至
        			    <input class="span2" size="16" type="text" value="{:I('date_end')}" name='date_end' placeholder="{:date('Y-m-d')}"  id='date_end' class='datepicker'>
                    </label>
                    
                    <select name="select_status" id="">
                        <option value="">全部</option>
                        <option value="UP#">正在拼团</option>
                        <option value="DW#">结束拼团</option>
                    </select>
                    <button class="btn btn-sm btn-primary" type="submit" id="search-btn"><i class='icon-search'></i>搜索</button>  
                    <a href="{:U('')}" class="btn btn-sm btn-primary">清空查询条件</a>  
                 </div>
            </form>        
        </div>
        <!--end 拼图列表  -->
        <table class='table table-striped table-bordered table-hover dataTable'> 
            <thead>
                <th>编号</th>
                <th width='25%'>商品</th>
                <th width='7%'>拼团价</th>
                <th width='7%'>开团人数</th>
                <th width='7%'>参团人数</th>
                <th width='7%'>团长</th>
                <th width='7%'>是否成功</th>
                <th width='15%'>时间</th>
                <th width='7%'>开团状态</th>
            </thead>
        
            <tbody>
                <notempty name='list'>
                    <volist name='list' id='vo'>
                        <tr>
                            <td>{$vo.pincode}</td>
                            <td>
                                <p>商品编号：{$vo.productcode}</p>
                                <p>商品名称：{$vo.productname}</p>
                                <p><img src="{$vo['imgpath']}" alt="" width='50' /></p>
                            </td>
                            <td>{:mony_format($vo['pinprice'],'yuan')}</td>
                            <td>{$vo.pincount|default=0}</td>
                            <td>{$vo.people|default=0}</td>
                            <td>{$vo.successcount|default=0}</td>
                            <td>{$vo.sells|default=0}</td>
                            <td>
                                <p>{$vo.begintime}</p>
                                <p>至</p>
                                <p>{$vo.endtime}</p>   
                            </td>
                            <td>{:get_status($vo['status'],'pin')}</td>
                            <td>
                                <switch name='vo.status'>
                                
                                    <case value='DW#'><a href="{:U('setStatus',array('id'=>$vo['id'],'status'=>'UP#'))}" class='ajax-get'>上架</a></case>
                                    <case value='UP#'><a href="{:U('setStatus',array('id'=>$vo['id'],'status'=>'DW#'))}" class='ajax-get'>下架</a></case>
                                    
                                </switch>
                                
                                <a href="{:U('edit',array('pinid'=>$vo['id']))}" target="_blank" style='display: block'>编辑</a>
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
 

</block>

