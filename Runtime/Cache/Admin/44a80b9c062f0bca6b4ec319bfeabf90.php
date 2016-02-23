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
        
<style>
/* 拖动排序列表 */
.edit_sort {
    display: inline-block;
    border:1px solid #cdcdcd;
    color: #404040;
    line-height: 35px;
    width: 100%;
    height: 376px;

}
.edit_sort span {
    background: #EEEEEE;
    width: 100%;
    display: inline-block;
    font-weight: bold;
    text-indent: 10px;
    border-bottom: 1px solid #cdcdcd;
    margin-bottom:5px;
}
.edit_sort ul {
    padding: 0 5px;
    overflow-y:scroll;
    height: 334px;
}
.edit_sort_l {
    float: left;
    margin-right: 20px;
}
.dragsort li {
    margin-bottom: 5px;
    padding: 0 6px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    background-color: #fff;
    overflow: hidden;
}
.dragsort li em {
    font-style: normal;
}
.dragsort li b {
    display: none;
    float: right;
    padding: 0 6px;
    font-weight: bold;
    color: #000;
}
.dragsort li:hover b {
    display: block;
}
.dragsort .draging-place {
    border-style: dashed;
    border-color: #ccc;
}
</style>

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
	                            
<div class="tabbable">
    <ul class="nav nav-tabs padding-18">
        <li class="active"><a data-toggle="tab" href="#tab1"><i class="green icon-edit"></i>基 础</a></li>
        <li><a data-toggle="tab" href="#tab2"><i class="pink icon-dashboard"></i>设 计</a></li>
        <li><a data-toggle="tab" href="#tab3"><i class="blue icon-rocket"></i>高 级</a></li>
    </ul>
	<!-- 表单 -->
	<form id="form" action="<?php echo U('update');?>" method="post" class="form-horizontal doc-modal-form">
        <div class="tab-content no-border padding-24">
			<!-- 基础 -->
            <div id="tab1" class="tab-pane active">
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">模型标识</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100 " name="name" value="<?php echo ($info["name"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（请输入文档模型标识）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">模型名称</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100 " name="title" value="<?php echo ($info["title"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（请输入模型的名称）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">模型类型</label>
					<div class="col-xs-12 col-sm-5">
						<select name="extend" class="width-100">
							<option value="0">独立模型</option>
							<option value="1">文档模型</option>
						</select>
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（目前只支持独立模型和文档模型）</span>
				</div>
                <?php
 echo ace_radio(['label_text'=>'是否需要列表管理','help'=>'勾选需要，则会在列表页面显示出数据的链接'],['name'=>'need_datalist'],$info['need_datalist'],['不需要 &nbsp;','需要 ']); ?>
                <?php
 echo ace_radio(['label_text'=>'是否需要批量操作','help'=>'勾选需要，则会在列表页面显示批量操作项'],['name'=>'need_batch_handle'],$info['need_batch_handle'],['不需要 &nbsp;','需要 ']); ?>
			</div>

			<div id="tab2" class="tab-pane">
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">字段管理</label>

					<div class="col-xs-12 col-sm-5">
						<div class="cf edit_sort edit_sort_l form_field_sort">
							<span>字段列表 		[ <a href="<?php echo U('Attribute/add?model_id='.$info['id']);?>" target="_balnk">新增</a>
							<a href="<?php echo U('Attribute/index?model_id='.$info['id']);?>" target="_balnk">管理</a> ] </span>
							<ul class="dragsort">
								<?php if(is_array($fields)): foreach($fields as $k=>$field): ?><li >
											<em ><input class="ids" type="checkbox" name="attribute_list[]" value="<?php echo ($field['id']); ?>" <?php if(in_array($field['id'],$info['attribute_list'])): ?>checked="checked"<?php endif; ?> /> <?php echo ($field['title']); ?> [<?php echo ($field['name']); ?>]</em>
										</li><?php endforeach; endif; ?>
							</ul>
						</div>

					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（只有新增了字段，该表才会真正建立）</span>
				</div>
                <div class="form-group">
                       <label class="col-xs-12 col-sm-2 control-label no-padding-right">字段别名定义</label>
                       <div class="col-xs-12 col-sm-5">
                           <textarea name="attribute_alias" rows="5" cols="30" class="form-control"><?php echo ($info["attribute_alias"]); ?></textarea>
                       </div>
                       <span class="help-block col-xs-12 col-sm-reset inline">（用于表单显示的名称）</span>
                </div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">表单显示分组</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="field_group" value="<?php echo ($info["field_group"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（用于表单显示的分组，以及设置该模型表单排序的显示）</span>
				</div>
				<div class="form-group">
    				<label class="col-xs-12 col-sm-2 control-label no-padding-right">表单显示排序</label>
    				<div class="col-xs-12 col-sm-5">
        				<?php $_result=parse_field_attr($info['field_group']);if(is_array($_result)): $i = 0; $__LIST__ = $_result;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="cf edit_sort edit_sort_l form_field_sort">
        						<span><?php echo ($vo); ?></span>
        						<ul class="dragsort needdragsort" data-group="<?php echo ($key); ?>">
        							<?php if(is_array($fields)): foreach($fields as $k=>$field): if((($field['group'] == $key) or($i == 1 and !isset($field['group']))) and ($field['is_show'] == 1)): ?><li class="getSort">
        										<em data="<?php echo ($field['id']); ?>"><?php echo ($field['title']); ?> [<?php echo ($field['name']); ?>]</em>
        										<input type="hidden" name="field_sort[<?php echo ($key); ?>][]" value="<?php echo ($field['id']); ?>"/>
        									</li><?php endif; endforeach; endif; ?>
        						</ul>
        					</div>
        					<div class="hr hr32 hr-dotted"></div><?php endforeach; endif; else: echo "" ;endif; ?>
    				</div>
    				<span class="help-block col-xs-12 col-sm-reset inline">（直接拖动进行排序）</span>
				</div>

				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">列表定义</label>
					<div class="col-xs-12 col-sm-5">
					   <textarea name="list_grid" rows="5" cols="30" class="form-control"><?php echo ($info["list_grid"]); ?></textarea>
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（默认列表模板的展示规则）</span>
				</div>

				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">默认搜索字段</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="search_key" value="<?php echo ($info["search_key"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（默认列表模板的默认搜索项）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">高级搜索字段</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="search_list" value="<?php echo ($info["search_list"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（默认列表模板的高级搜索项）</span>
				</div>
			</div>

			<!-- 高级 -->
			<div id="tab3" class="tab-pane">
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">列表模板</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="template_list" value="<?php echo ($info["template_list"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（自定义的列表模板，放在Application\Admin\View\Think下，不写则使用默认模板）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">新增模板</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="template_add" value="<?php echo ($info["template_add"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（自定义的新增模板，放在Application\Admin\View\Think下，不写则使用默认模板）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">编辑模板</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="template_edit" value="<?php echo ($info["template_edit"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（自定义的编辑模板，放在Application\Admin\View\Think下，不写则使用默认模板）</span>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-2 control-label no-padding-right">列表数据大小</label>
					<div class="col-xs-12 col-sm-5">
						<input type="text" class="width-100" name="list_row" value="<?php echo ($info["list_row"]); ?>">
					</div>
					<span class="help-block col-xs-12 col-sm-reset inline">（默认列表模板的分页属性）</span>
				</div>
			</div>

            <input type="hidden" name="id" value="<?php echo ($info['id']); ?>"/>
            <?=ace_srbtn()?>
        </div>
	</form>
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
	    
<script type="text/javascript" src="/Public/static/jquery.dragsort-0.5.2.min.js"></script>
<script type="text/javascript" charset="utf-8">
Think.setValue("extend", <?php echo ((isset($info["extend"]) && ($info["extend"] !== ""))?($info["extend"]):0); ?>);

//导航高亮
highlight_subnav('<?php echo U('Model/index');?>');
//拖曳插件初始化
$(function(){
	$(".needdragsort").dragsort({
	     dragSelector:'li',
	     placeHolderTemplate: '<li class="draging-place">&nbsp;</li>',
	     dragBetween:true,	//允许拖动到任意地方
	     dragEnd:function(){
	    	 var self = $(this);
	    	 self.find('input').attr('name', 'field_sort[' + self.closest('ul').data('group') + '][]');
	     }
	 });
})
</script>

    </body>
</html>