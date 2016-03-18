<extend name="Public/base" />

<block name="body">
<style>
.panebox .left{float:left;margin-right: 15px;}
.panebox{width: 100%;overflow: hidden;}
li {list-style-type:none;}
ul{margin: 0 0 0 5px;}
textarea{resize: none;}
.txt, .title{display: inline-block;}
.ord_info .title{width: 68px;}
.ord_info, .send_info, .transport_info{height: 400px;}
.send_info .title{width: 54px;}
.panel-body li{margin: 5px 0px;}
.transport_info .title{width:70px}
.pro{border: 1px solid #bce8f1;padding: 7px;width: 40%;}
.pro p{max-width:310px}
.pro .til{display:inline-block; width: 68px;}
</style>
<?php 
    $status = ['CAN'=>'已取消','COM'=>'已完成'];
    $stu_pay = ['ALI'=>'支付宝','WXP'=>'微信','PAY'=>'贝宝','SUM'=>'余额支付'];

?>
<div class='order'>
    <div class="panebox">
            
        <div class="panel panel-info ord_info left" style='width:30%'>
          <div class="panel-heading">订单信息</div>
          <div class="panel-body">
            <ul>
                <li><span class='title'>订单号:</span><span class='txt'>{$ord_parent.ordercode}</span></li>
                <li><span class='title'>支付方式:</span><span class='txt'>{$ord_parent.paytye}</span></li>
                <li><span class='title'>支付单号:</span><span class='txt'>{$ord_parent.paynum|default='未支付'}</span></li>
                <li><span class='title'>支付时间:</span><span class='txt'>{$ord_parent.paytime|default='未支付'}</span></li>
                <li><span class='title'>下单时间:</span><span class='txt'>{$ord_parent.createtime}</span></li>
                <li><span class='title'>订单状态:</span><span class='txt'>{:get_status($ord_parent['orderstatus'],'order')}</span></li>
                <li><span class='title'>订单类型:</span><span class='txt'>{$ord_parent.ordetype}</span></li>
                <li><span class='title'>发货时间:</span><span class='txt'>{$ord_parent.sendtime}</span></li>
                <li><span class='title'>买家姓名:</span><span class='txt'>{$user_info.nickname}</span></li>
                <li><span class='title'>买家电话:</span><span class='txt'>{$user_info.mobilenum}</span></li>
                <li><span class='title'>订单金额:</span><span class='txt'>{:mony_format($ord_parent['ordersum'],'yuan')}</span></li>
                <li><span class='title'>运费:</span><span class='txt'>{:mony_format($ord_parent['pfee'],'yuan')}</span></li>
                <li><span class='title'>实付款:</span><span class='txt'>{:mony_format($ord_parent['psum'],'yuan')}</span></li>
        
            </ul>
          </div>
        </div>
        
        <div class="panel panel-info send_info left" style='width:32%'>
          <div class="panel-heading">发货信息</div>
          <div class="panel-body">
           <form action="" class='search-form'>
                <ul>
                    <li>
                        <span class='title'>收货人</span>
                        <span class='txt'><input type="text" style='width: 223px;' value='{$ord_parent.recname}' /></span>
                    </li>
                    <li>
                        <span class='title'>联系电话</span>
                        <span class='txt'><input type="text" style='width: 223px;' value='{$ord_parent.recmobile}' /></span>
                    </li>
                    <li>
                        <span class='title'>收货地址</span>
                        <span class='txt'><textarea name="" id="" cols="28" rows="3">{$ord_parent.addressall}</textarea></span>
                    </li>
                    <li>
                        <span class='title'>客服备注</span>
                        <span class='txt'><textarea name="" id="" cols="28" rows="3"></textarea></span>
                    </li>
                    <li>
                        <span class='title'>添加备注</span>
                        <span class='txt'><textarea name="" id="" cols="28" rows="3"></textarea></span>
                    </li>
                    <li>
                        <span class='title'>客服跟进</span>
                        <span class='txt'><input type="checkbox" name='is_kefu'/></span>
                    </li>
                </ul>   
                <label for="" style='text-align: center;width: 100%;'>
                    <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}">确定</button>
                    <a href="{:U('')}" class="btn btn-sm btn-primary" class="btn">取消</a> 
                </label>        
           </form>

          </div>
        </div>
        
        <div class="panel panel-info transport_info left" style='width:30%'>
          <div class="panel-heading">物流信息</div>
          <div class="panel-body">
           <form action="" class='search-form'>
                <ul>
                    <li>
                        <span class='title'>物流公司</span>
                        <span class='txt'>
                            <select name="" id="" style='width: 223px;'>
                                <option value="">韵达快递</option>
                                <option value="">顺丰快递</option>
                            </select>
                        
                        </span>
                    </li>
                    <li>
                        <span class='title'>物流单号</span>
                        <span class='txt'><input type="text" style='width: 223px;' value='{$ord_parent.logisticsnum}' /></span>
                    </li>
                    <li>
                        <span class='title'>供应商备注</span>
                        <span class='txt'><textarea name="" id="" cols="28" rows="3"></textarea></span>
                    </li>

                </ul>   
                <label for="" style='text-align: center;width: 100%; margin-top: 5px;'>
                    <button class="btn btn-sm btn-primary" type="button" id="search-btn" url="{:U('')}">修改物流</button>
                    <a href="{:U('')}" class="btn btn-sm btn-primary" class="btn">查看物流</a> 
                </label>        
           </form>

          </div>
        </div>
        
        
    </div>

</div>
<div style='clear:both'> </div>
<div class="panebox">
<div class="panel panel-info transport_info" >
    <div class="panel-heading">商品信息</div>
    <div class="panel-body" >
        <volist name='ord_son' id='vo'>
            <div class="pro left">
                <div class="img left"><img src="{$vo.img}" alt="" width='90px' /></div>
                <div class='pro_con left'>
                    <p><span class='til'>商品名称：</span><span class='con'>{$vo.productname}</span></p>            
                    <p><span class='til'>供应商：</span><span class='con'>{$vo.supname}</span></p>            
                    <p><span class='til'>订单号：</span><span class='con'>{$vo.ordercode}</span></p>            
                    <p><span class='til'>规格：</span><span class='con'>{$vo.skuname}</span></p>            
                    <p><span class='til'>数量：</span><span class='con'>{$vo.buynum}</span></p>            
                    <p><span class='til'>成交价：</span><span class='con'>￥{:mony_format($vo['ordersum'],'yuan')}</span></p>            
                    <p><span class='til'>运费：</span><span class='con'>{$vo.postfee}</span></p>            
                    <p><span class='til'>小计：</span><span class='con'>￥{:mony_format($vo['paysum'],'yuan')}</span></p>            
                </div>
                
            </div>        
        </volist>

    
    </div>    
</div>


</block>
