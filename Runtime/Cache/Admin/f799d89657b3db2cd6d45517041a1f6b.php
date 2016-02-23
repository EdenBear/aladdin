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
	                            
<script type="text/javascript" src="/Public/static/uploadify/jquery.uploadify.min.js"></script>
	
<div class="tabbable">
	<ul class="nav nav-tabs">
		<li class="active">
			<a data-toggle="tab" href="#home">
				<i class="green icon-home bigger-110"></i>
				基 础
			</a>
		</li>

		<li>
			<a data-toggle="tab" href="#profile">
			    <i class="green icon-external-link bigger-110"></i>
				高 级
			</a>
		</li>

	</ul>
    <form action="<?php echo U();?>" method="post" class="form-horizontal">
	<div class="tab-content">
		<div id="home" class="tab-pane in active">
		    <div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">上级分类</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" class="width-100" disabled="disabled" value="<?php echo ((isset($category['title']) && ($category['title'] !== ""))?($category['title']):'无'); ?>"/>
				</div>
				<span class="check-tips"></span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					分类名称
				</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="title" class="width-100" value="<?php echo ((isset($info["title"]) && ($info["title"] !== ""))?($info["title"]):''); ?>">
				</div>
				<span class="check-tips">（名称不能为空）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					分类标识
				</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="name" class="width-100" value="<?php echo ((isset($info["name"]) && ($info["name"] !== ""))?($info["name"]):''); ?>">
				</div>
				<span class="check-tips">（英文字母）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">分组定义</label>
				<div class="col-xs-12 col-sm-6">
					<textarea name="groups" class="form-control"><?php echo ((isset($info["groups"]) && ($info["groups"] !== ""))?($info["groups"]):''); ?></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					发布内容
				</label>
				<div class="col-xs-12 col-sm-6">
					<label><input type="radio" class="ace" name="allow_publish" value="0"><span class="lbl">不允许&nbsp;</span></label>
					<label><input type="radio" class="ace" name="allow_publish" value="1" checked><span class="lbl">仅允许后台&nbsp;</span></label>
					<label><input type="radio" class="ace" name="allow_publish" value="2" ><span class="lbl">允许前后台&nbsp;</span></label>
				</div>
				<span class="check-tips">（是否允许发布内容）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					是否审核
				</label>
				<div class="col-xs-12 col-sm-6">
					<label><input type="radio" class="ace" name="check" value="0" checked><span class="lbl">不需要&nbsp;</span></label>
					<label><input type="radio" class="ace" name="check" value="1"><span class="lbl">需要&nbsp;</span></label>
				</div>
				<span class="check-tips">（在该分类下发布的内容是否需要审核）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">允许文档类型</label>
				<div class="col-xs-12 col-sm-6">
					<?php $_result=C('DOCUMENT_MODEL_TYPE');if(is_array($_result)): $i = 0; $__LIST__ = $_result;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><label>
							<input type="checkbox" class="ace" name="type[]" value="<?php echo ($key); ?>"><span class="lbl"> <?php echo ($type); ?>&nbsp;</span>
						</label><?php endforeach; endif; else: echo "" ;endif; ?>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">列表绑定文档模型</label>
				<div class="col-xs-12 col-sm-6">
					<?php $_result=get_document_model();if(is_array($_result)): $i = 0; $__LIST__ = $_result;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$list): $mod = ($i % 2 );++$i;?><label>
							<input type="checkbox" class="ace" name="model[]" value="<?php echo ($list["id"]); ?>"><span class="lbl"> <?php echo ($list["title"]); ?>&nbsp;</span>
						</label><?php endforeach; endif; else: echo "" ;endif; ?>
				</div>
				<span class="check-tips">（列表支持发布的文档模型）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">子文档绑定绑定模型</label>
				<div class="col-xs-12 col-sm-6">
					<?php $_result=get_document_model();if(is_array($_result)): $i = 0; $__LIST__ = $_result;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$list): $mod = ($i % 2 );++$i;?><label>
							<input type="checkbox" class="ace" name="model_sub[]" value="<?php echo ($list["id"]); ?>"><span class="lbl"> <?php echo ($list["title"]); ?>&nbsp;</span>
						</label><?php endforeach; endif; else: echo "" ;endif; ?>
				</div>
				<span class="check-tips">（子文档支持发布的文档模型）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">分类图标</label>
				<div class="col-xs-12 col-sm-6">
    				<input type="file" id="upload_picture">
    				<input type="hidden" name="icon" id="icon" value="<?php echo ((isset($info['icon']) && ($info['icon'] !== ""))?($info['icon']):''); ?>"/>
    				<div class="upload-img-box">
        				<?php if(!empty($info['icon'])): ?><div class="upload-pre-item"><img src="<?php echo (get_cover($info["icon"],'path')); ?>"/></div><?php endif; ?>
    				</div>
				</div>
			</div>
			<script type="text/javascript">
			//上传图片
		    /* 初始化上传插件 */
			$("#upload_picture").uploadify({
		        "height"          : 30,
		        "swf"             : "/Public/static/uploadify/uploadify.swf",
		        "fileObjName"     : "download",
		        "buttonText"      : "上传图片",
		        "uploader"        : "<?php echo U('File/uploadPicture',array('session_id'=>session_id()));?>",
		        "width"           : 120,
		        'removeTimeout'	  : 1,
		        'fileTypeExts'	  : '*.jpg; *.png; *.gif;',
		        "onUploadSuccess" : uploadPicture,
		        'onFallback' : function() {
		            alert('未检测到兼容版本的Flash.');
		        }
		    });
			function uploadPicture(file, data){
		    	var data = $.parseJSON(data);
		    	var src = '';
		        if(data.status){
		        	$("#icon").val(data.id);
		        	src = data.url || '' + data.path;
		        	$("#icon").parent().find('.upload-img-box').html(
		        		'<div class="upload-pre-item"><img src="' + src + '"/></div>'
		        	);
		        } else {
		        	updateAlert(data.info);
		        	setTimeout(function(){
		                $('#top-alert').find('button').click();
		                $(that).removeClass('disabled').prop('disabled',false);
		            },1500);
		        }
		    }
			</script>
		</div>

		<div id="profile" class="tab-pane">
			
            <div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">可见性</label>
				<div class="col-xs-12 col-sm-6">
					<select name="display">
						<option value="1">所有人可见</option>
						<option value="0">不可见</option>
						<option value="2">管理员可见</option>
					</select>
				</div>
				<span class="check-tips">（是否对用户可见，针对前台）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					排序
				</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="sort" class="col-xs-3" value="<?php echo ((isset($info["sort"]) && ($info["sort"] !== ""))?($info["sort"]):0); ?>">
				</div>
				<span class="check-tips">（仅对当前层级分类有效）</span>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">
					列表行数
				</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="list_row" class="col-xs-3" value="<?php echo ((isset($info["list_row"]) && ($info["list_row"] !== ""))?($info["list_row"]):10); ?>">
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">网页标题</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="meta_title" class="width-100" value="<?php echo ((isset($info["meta_title"]) && ($info["meta_title"] !== ""))?($info["meta_title"]):''); ?>">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">关键字</label>
				<div class="col-xs-12 col-sm-6">
					<textarea name="keywords" class="form-control"><?php echo ((isset($info["keywords"]) && ($info["keywords"] !== ""))?($info["keywords"]):''); ?></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">描述</label>
				<div class="col-xs-12 col-sm-6">
					<textarea name="description" class="form-control"><?php echo ((isset($info["description"]) && ($info["description"] !== ""))?($info["description"]):''); ?></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">频道模板</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="template_index" class="width-100" value="<?php echo ((isset($info["template_index"]) && ($info["template_index"] !== ""))?($info["template_index"]):''); ?>">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">列表模板</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="template_lists" class="width-100" value="<?php echo ((isset($info["template_lists"]) && ($info["template_lists"] !== ""))?($info["template_lists"]):''); ?>">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">详情模板</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="template_detail" class="width-100" value="<?php echo ((isset($info["template_detail"]) && ($info["template_detail"] !== ""))?($info["template_detail"]):''); ?>">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-12 col-sm-2 control-label no-padding-right">编辑模板</label>
				<div class="col-xs-12 col-sm-6">
					<input type="text" name="template_edit" class="width-100" value="<?php echo ((isset($info["template_edit"]) && ($info["template_edit"] !== ""))?($info["template_edit"]):''); ?>">
				</div>
			</div>
		</div>
        <input type="hidden" name="id" value="<?php echo ((isset($info["id"]) && ($info["id"] !== ""))?($info["id"]):''); ?>">
        <input type="hidden" name="pid" value="<?php echo isset($category['id'])?$category['id']:$info['pid'];?>">
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
	    
	<script type="text/javascript">
		<?php if(isset($info["id"])): ?>Think.setValue("allow_publish", <?php echo ((isset($info["allow_publish"]) && ($info["allow_publish"] !== ""))?($info["allow_publish"]):1); ?>);
		Think.setValue("check", <?php echo ((isset($info["check"]) && ($info["check"] !== ""))?($info["check"]):0); ?>);
		Think.setValue("model[]", <?php echo (json_encode($info["model"])); ?> || [1]);
		Think.setValue("model_sub[]", <?php echo (json_encode($info["model_sub"])); ?> || [1]);
		Think.setValue("type[]", <?php echo (json_encode($info["type"])); ?> || [2]);
		Think.setValue("display", <?php echo ((isset($info["display"]) && ($info["display"] !== ""))?($info["display"]):1); ?>);
		Think.setValue("reply", <?php echo ((isset($info["reply"]) && ($info["reply"] !== ""))?($info["reply"]):0); ?>);
		Think.setValue("reply_model[]", <?php echo (json_encode($info["reply_model"])); ?> || [1]);<?php endif; ?>
		$(function(){
			showTab();
			$("input[name=reply]").change(function(){
				var $reply = $(".form-group.reply");
				parseInt(this.value) ? $reply.show() : $reply.hide();
			}).filter(":checked").change();
		});
		//导航高亮
		highlight_subnav('<?php echo U('Category/index');?>');
	</script>

    </body>
</html>