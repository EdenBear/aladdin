<extend name="Public/base" />
<block name="body">
<div>

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#idx_normal" aria-controls="home" role="tab" data-toggle="tab">普通订单</a></li>
    <li role="presentation"><a href="#" aria-controls="profile" role="tab" data-toggle="tab">退款订单</a></li>
    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">待发货订单</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="">
    <div  class="tab-pane active" id="idx_normal">

        <iframe src="{:U('index_normal')}" id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width='100%' onLoad="iFrameHeight()"></iframe>
    </div>
<!--     <div role="tabpanel" class="tab-pane" id="idx_refund"></div> -->
<!--     <div role="tabpanel" class="tab-pane" id="idx_wait"></div> -->

  </div>

</div>

</block>