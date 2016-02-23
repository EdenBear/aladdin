<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="cn">
    <head>
        <meta charset="utf-8" />
        
        <title><?php echo ($meta_title); if(!empty($meta_title)): ?>|<?php echo C('WEB_SITE_TITLE'); endif; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- basic styles -->
        <link rel="stylesheet" href="/Public/Ace/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/Public/Ace/css/font-awesome.min.css" />

        <!--[if IE 7]>
          <link rel="stylesheet" href="/Public/Ace/css/font-awesome-ie7.min.css" />
        <![endif]-->

        <!-- page specific plugin styles -->

        <!-- fonts -->

        <link rel="stylesheet" href="/Public/Ace/css/font-googleapis.css" />

        <!-- ace styles -->

        <link rel="stylesheet" href="/Public/Ace/css/ace.min.css" />
        <link rel="stylesheet" href="/Public/Ace/css/ace-rtl.min.css" />
        <link rel="stylesheet" href="/Public/Ace/css/ace-skins.min.css" />
        <link rel="stylesheet" href="/Public/Admin/css/common.css" />

        <!--[if lte IE 8]>
          <link rel="stylesheet" href="/Public/Ace/css/ace-ie.min.css" />
        <![endif]-->

        <!-- inline styles related to this page -->
        
        <!-- ace settings handler -->

        <script src="/Public/Ace/js/ace-extra.min.js"></script>

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

        <!--[if lt IE 9]>
        <script src="/Public/Ace/js/html5shiv.js"></script>
        <script src="/Public/Ace/js/respond.min.js"></script>
        <![endif]-->
        
	    <!--[if lt IE 9]>
	    <script type="text/javascript" src="/Public/static/jquery-1.10.2.min.js"></script>
	    <![endif]-->
	    <!--[if gte IE 9]><!-->
	    <script type="text/javascript" src="/Public/static/jquery-2.0.3.min.js"></script>
	    <!--<![endif]-->
    </head>
    
    <body class="skin-2">
        <!--top-->
        <div class="navbar navbar-default" id="navbar">
            <script type="text/javascript">
                try{ace.settings.check('navbar' , 'fixed')}catch(e){}
            </script>
            
            <div class="navbar-container" id="navbar-container">
                <div class="navbar-header pull-left">
                    <a href="#" class="navbar-brand">
                        <small>
                            <i class="icon-leaf"></i>
                            <?php echo C('WEB_SITE_TITLE');?>
                        </small>
                    </a><!-- /.brand -->
                </div><!-- /.navbar-header -->
            
                <div class="navbar-header pull-right" role="navigation">
                    <ul class="nav ace-nav">
                        <li class="purple">
                            <a href="<?=U('information/inbox',['status'=>'NO#'])?>" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="icon-bell-alt icon-animated-bell"></i>
                                <span class="badge badge-important">
                                    <?=$unread_count?>
                                </span>
                            </a>

                            <ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">

                                <li>
                                    <a href="<?=U('information/inbox',['status'=>'NO#'])?>">
                                        <div class="clearfix">
											<span class="pull-left">
												<i class="btn btn-xs no-hover btn-pink icon-envelope"></i>
												查看新通知
											</span>
                                            <span class="pull-right badge badge-info">+8</span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="<?=U('information/inbox')?>">
                                        查看所有通知
                                        <i class="icon-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="light-blue">
                            <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                                <img class="nav-user-photo" src="/Public/Ace/avatars/avatar2.png" alt="Jason's Photo" />
                                <span class="user-info">
                                    <small>欢迎光临,</small>
                                    <?php echo session('user_auth.username');?>
                                </span>
            
                                <i class="icon-caret-down"></i>
                            </a>
                            <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">

                                <li>
                                    <a href="<?php echo U('User/updatePassword');?>">
                                        <i class="icon-key"></i>
                                                                                                  修改密码
                                    </a>
                                </li>
            
                                <li>
                                    <a href="<?php echo U('User/updatenickname');?>">
                                        <i class="icon-user"></i>
                                                                                                 修改昵称
                                    </a>
                                </li>
            
                                <li class="divider"></li>
            
                                <li>
                                    <a id="logout" href="javascript:">
                                        <i class="icon-off"></i>
                                                                                                        退出
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul><!-- /.ace-nav -->
                </div><!-- /.navbar-header -->
            </div><!-- /.container -->
        </div>
        <!--top-->
        <script>
        $(document).ready(function(){
            $("#logout").click(function(){
                layer.confirm('您确定退出？',{icon:3},function(index){
                    layer.close(index);
                    $.get('<?php echo U('Public/logout');?>',function(resp){
                        window.location = resp.url;
                    })
                });
                return false;
            })
        })
        </script>
        <div class="main-container" id="main-container">
            <script type="text/javascript">
                try{ace.settings.check('main-container' , 'fixed')}catch(e){}
            </script>

            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>
                
                <div class="sidebar" id="sidebar">
                    <script type="text/javascript">
                        try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
                    </script>

                    <ul class="nav nav-list">
		                <?php if(!empty($_extra_menu)): ?>
		                    <?php echo extra_menu($_extra_menu,$__MENU__); endif; ?>
                        <?php if(is_array($__MENU__["main"])): $i = 0; $__LIST__ = $__MENU__["main"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$menu): $mod = ($i % 2 );++$i;?><li class="<?php echo ((isset($menu["class"]) && ($menu["class"] !== ""))?($menu["class"]):''); ?>">
			                    <a <?php if(!empty($menu["child"])): ?>class="dropdown-toggle" href="javascript:"<?php else: ?>href="<?php echo (U($menu["url"])); ?>"<?php endif; ?>>
	                                <i class="<?php echo ($menu["class_fix"]); ?>"></i>
	                                <span class="menu-text"><?php echo ($menu["title"]); ?></span>
	                                <?php if(!empty($menu["child"])): ?><b class="arrow icon-angle-down"></b><?php endif; ?>
	                            </a>
	                            <?php if(!empty($menu["child"])): ?><ul class="submenu">
		                            <?php if(is_array($menu["child"])): foreach($menu["child"] as $key=>$sub_menu): ?><!-- 子导航 -->
		                            <?php if(!empty($sub_menu)): ?><li>
		                                <a href="<?php echo (U($sub_menu["url"])); ?>">
		                                <i class="icon-double-angle-right"></i>
		                                <?php echo ($sub_menu["title"]); ?>
		                                </a>
		                            </li><?php endif; ?>
		                            <!-- /子导航 --><?php endforeach; endif; ?>
                                </ul><?php endif; ?>
			                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul><!-- /.nav-list -->

                    <div class="sidebar-collapse" id="sidebar-collapse">
                        <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
                    </div>

                    <script type="text/javascript">
                        try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
                    </script>
                </div>
                
                <div class="main-content">
                    <div class="breadcrumbs" id="breadcrumbs">
                        <script type="text/javascript">
                            try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                        </script>

                        <ul class="breadcrumb">
                            <?php $i = '1'; ?>
			                <?php if(is_array($__MENU__["_nav"])): foreach($__MENU__["_nav"] as $k=>$nav): if($i == 1 AND $nav["title"] != '首页'): ?><li class="active">
		                                <i class="icon-home home-icon"></i> 首页
		                            </li><?php endif; ?>
			                    <li <?php if($i == count(__MENU__._nav)): ?>class="active"<?php endif; ?>>
			                        <?php if($nav["title"] == '首页'): ?><i class="icon-home home-icon"></i><?php endif; ?>
	                                <?php echo ($nav["title"]); ?>
	                            </li>
			                    <?php $i = $i+1; endforeach; endif; ?>
                        </ul>
                        <!-- .breadcrumb -->
                    </div> 
                    <!--内容-->
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
						        <!-- PAGE CONTENT BEGINS -->
						
						        <!--[if lte IE 7]>
						        <div class="alert alert-block alert-warning">
						            <button type="button" class="close" data-dismiss="alert">
						                <i class="icon-remove"></i>
						            </button>
						
						            <i class="icon-lightbulb "></i>
						            <strong>您使用的浏览器版本过低,请使用IE8以上浏览器 浏览本后台</strong>
						        </div>
						        <![endif]--> 
						        <!--msg -->
                                
								<div id="top-alert" class="alert alert-danger" style="display: none;">
	                                <button data-dismiss="alert" class="close" type="button">
	                                    <i class="icon-remove"></i>
	                                </button>
	                                <div class="alert-content"></div>
	                            </div>
	                            
<div class="message-container">
    <div id="id-message-list-navbar" class="message-navbar align-center clearfix">
        <div class="message-bar">
            <div class="message-infobar" id="id-message-infobar">
                <span class="blue bigger-150">通知列表</span>
                <span class="grey bigger-110">(<?=$unread_count?> 未读)</span>
            </div>

            <div class="message-toolbar hide">
                <div class="inline position-relative align-left">
                    <a href="#" class="btn-message btn btn-sm dropdown-toggle" data-toggle="dropdown">
                        <span class="bigger-110">操作</span>

                        <i class="icon-caret-down icon-on-right"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">

                        <li>
                            <a href="<?=U('setbox',['status'=>'1'])?>" class="ajax-post" target-form="ids">
                                <i class="icon-eye-open blue"></i>
                                &nbsp; 标记为已读
                            </a>
                        </li>

                        <li>
                            <a href="<?=U('setbox',['status'=>'0'])?>" class="ajax-post" target-form="ids">
                                <i class="icon-eye-close green"></i>
                                &nbsp; 标记为未读
                            </a>
                        </li>
                    </ul>
                </div>

                <a href="<?=U('setbox',['status'=>'2'])?>" class="btn btn-sm btn-message ajax-post confirm" target-form="ids">
                    <i class="icon-trash bigger-125"></i>
                    <span class="bigger-110">删除</span>
                </a>
            </div>
        </div>

        <div>

            <?php
 $type = [ 'TDR'=>'招标', 'OTH'=>'其他', ]; $class_list = [ 'TDR'=>'badge-success', 'OTH'=>'badge-pink', ]; ?>

            <form class="form-search" action="<?=U('inbox')?>" method="get" >
            <div class="messagebar-item-left">
                <label class="middle">
                    <input type="checkbox" id="id-toggle-all" class="ace" />
                    <span class="lbl"></span>
                </label>

                &nbsp;
                <div class="inline position-relative">
                    <a href="#" class="btn-message btn btn-sm dropdown-toggle" data-toggle="dropdown">
                        <span class="bigger-110">请选择类别</span>

                        <i class="icon-caret-down icon-on-right"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125 drop-select">
                        <li>
                            <a href="javascript:" value="">
                                &nbsp; 全部
                            </a>
                        </li>
                        <?php foreach($type as $key=>$val):?>
                        <li>
                            <a href="javascript:" value="<?=$key?>">
                                &nbsp; <?=$val?>
                            </a>
                        </li>
                        <?php endforeach;?>
                    </ul>
                    <input type="hidden" name="type" value="<?=I('type')?>">
                </div>
                <div class="inline position-relative">
                    <a href="#" class="btn-message btn btn-sm dropdown-toggle" data-toggle="dropdown">
                        <span class="bigger-110">请选择状态</span>

                        <i class="icon-caret-down icon-on-right"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125 drop-select">
                        <li>
                            <a href="javascript:" value="">
                                &nbsp; 全部
                            </a>
                        </li>
                        <li>
                            <a href="javascript:" value="YES">
                                &nbsp; 已读
                            </a>
                        </li>
                        <li>
                            <a href="javascript:" value="NO#">
                                &nbsp; 未读
                            </a>
                        </li>
                    </ul>
                    <input type="hidden" name="status" value="<?=I('status')?>">
                    <div class="nav-search minimized">
                        <span class="input-icon">
                            <input name="keyword" type="text" autocomplete="off" value="<?=I('keyword')?>" class="input-small nav-search-input" placeholder="搜索通知消息 ..." />
                            <i class="icon-search nav-search-icon"></i>
                        </span>
                    </div>
                </div>
            </div>

            </form>
        </div>
    </div>

    <div class="message-list-container">
        <div class="message-list" id="message-list">

            <?php foreach($list as $item):?>
            <div class="message-item <?=($item['status'] == 'NO#' ? 'message-unread' : '')?>">
                <label class="">
                    <input type="checkbox" class="ace ids" name="id[]" value="<?=$item['id']?>" />
                    <span class="lbl"></span>
                </label>
                <span class="">
                    <span class="badge <?=$class_list[$item['notice_type']]?> mail-tag">
                        <?=$type[$item['notice_type']]?>
                    </span>
                </span>
                <span class="sender">
                    <?=$item['mobile_num']?>
                </span>
                <span class="summary">
                    <span class="text" item_id="<?=$item['id']?>">
                        <?=$item['notice_title']?>
                    </span>
                </span>
                <span class="time"><?=$item['insert_time']?></span>
            </div>
            <?php endforeach;?>
        </div>
    </div><!-- /.message-list-container -->

    <div class="message-footer clearfix">
                        <div class="dataTables_paginate paging_bootstrap">
                    <ul class="pagination">
                    <?php echo ($_page); ?>
                    </ul>
                </div>
    </div>

</div>

                            </div>
                        </div>
                    </div><!-- /.page-content -->
                </div><!-- /.main-content -->

            </div><!-- /.main-container-inner -->

            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div><!-- /.main-container -->
	    
	    <script type="text/javascript">
	    (function(){
	        var ThinkPHP = window.Think = {
	            "ROOT"   : "", //当前网站地址
	            "APP"    : "/admin.php?s=", //当前项目地址
	            "PUBLIC" : "/Public", //项目公共目录地址
	            "DEEP"   : "<?php echo C('URL_PATHINFO_DEPR');?>", //PATHINFO分割符
	            "MODEL"  : ["<?php echo C('URL_MODEL');?>", "<?php echo C('URL_CASE_INSENSITIVE');?>", "<?php echo C('URL_HTML_SUFFIX');?>"],
	            "VAR"    : ["<?php echo C('VAR_MODULE');?>", "<?php echo C('VAR_CONTROLLER');?>", "<?php echo C('VAR_ACTION');?>"]
	        }
	    })();
	    </script>
	    <script type="text/javascript" src="/Public/static/think.js"></script>
	    <script type="text/javascript" src="/Public/static/layer/layer.min.js"></script>
	    
        <script type="text/javascript">
            if("ontouchend" in document) document.write('<script src="/Public/Ace/js/jquery.mobile.custom.min.js">'+'</'+'script>');
        </script>
        <script src="/Public/Ace/js/bootstrap.min.js"></script>
        <script src="/Public/static/respond.js"></script>
        <!-- 自动补全输入框 js -->
        <script src="/Public/Ace/js/typeahead-bs2.min.js"></script>
        
        <!-- page specific plugin scripts -->

        <script src="/Public/Ace/js/jquery-ui-1.10.3.custom.min.js"></script>
        <script src="/Public/Ace/js/jquery.ui.touch-punch.min.js"></script>

        <!-- ace scripts -->

        <script src="/Public/Ace/js/ace-elements.min.js"></script>
        <script src="/Public/Ace/js/ace.min.js"></script>
        <!-- inline scripts related to this page -->
        
	    <script type="text/javascript" src="/Public/Admin/js/common.js"></script>
	    <script type="text/javascript" src="/Public/static/common.js"></script>
	    <script type="text/javascript">
	        +function(){
	            /* 左边菜单高亮 */
	            var $subnav = $("#sidebar");
	            url = window.location.pathname + window.location.search;
	            url = url.replace(/(\/(p)\/\d+)|(&\w*=.+)/, "");
	            $subnav.find("a[href='" + url + "']").parent().addClass("active");
	        }();
	    </script>
	    
<script>
    $(function(){
        $(".form-search").submit(function(){

            var url = this.action;
            var query  = $(this).serialize();
            if( url.indexOf('?')>0 ){
                url += '&' + query;
            }else{
                url += '?' + query;
            }
            window.location.href = url;
            return false;
        });
        $(".drop-select a").click(function(){
            $(this).closest('.drop-select').next('input[type=hidden]').val($(this).attr('value'));
            $(".form-search").submit();
        })

        //check/uncheck all messages
        $('#id-toggle-all').removeAttr('checked').on('click', function(){
            if(this.checked) {
                Inbox.select_all();
            } else Inbox.select_none();
        });



        $('.message-list').delegate('.message-item input[type=checkbox]' , 'click', function() {
            $(this).closest('.message-item').toggleClass('selected');
            if(this.checked)
                Inbox.display_bar(1);//display action toolbar when a message is selected
            else {
                Inbox.display_bar($('.message-list input[type=checkbox]:checked').length);
                //determine number of selected messages and display/hide action toolbar accordingly
            }
        });

        var Inbox = {
            //displays a toolbar according to the number of selected messages
            display_bar : function (count) {
                if(count == 0) {
                    $('#id-toggle-all').removeAttr('checked');
                    $('#id-message-list-navbar .message-toolbar').addClass('hide');
                    $('#id-message-list-navbar .message-infobar').removeClass('hide');
                }
                else {
                    $('#id-message-list-navbar .message-infobar').addClass('hide');
                    $('#id-message-list-navbar .message-toolbar').removeClass('hide');
                }
            }
            ,
            select_all : function() {
                var count = 0;
                $('.message-item input[type=checkbox]').each(function(){
                    this.checked = true;
                    $(this).closest('.message-item').addClass('selected');
                    count++;
                });

                $('#id-toggle-all').get(0).checked = true;

                Inbox.display_bar(count);
            }
            ,
            select_none : function() {
                $('.message-item input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');
                $('#id-toggle-all').get(0).checked = false;

                Inbox.display_bar(0);
            }
        };
        //display second message right inside the message list
        $('.message-list .message-item .text').on('click', function(){
            var item_id = $(this).attr('item_id');
            var message = $(this).closest('.message-item');

            //if message is open, then close it
            if(message.hasClass('message-inline-open')) {
                message.removeClass('message-inline-open').find('.message-content').hide();
                return;
            }
            if(message.data('opend')){

                message.addClass('message-inline-open').find('.message-content').show();
                return;
            }

            var loading = layer.load();
            $.post('<?=U('boxdetail')?>',{'id':item_id},function(html){
                if(message.hasClass('message-unread')){
                    message.removeClass('message-unread');
                }

                message
                    .data('opend',true)
                    .addClass('message-inline-open')
                    .append('<div class="message-content" />')
                message.find('.message-content:last').html( html );

            },'html').always(function(){
                layer.close(loading);
            });

        });
    })
</script>

    </body>
</html>