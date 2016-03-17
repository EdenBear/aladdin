<script>
/*时间控件*/
$('#date_stat').datetimepicker({
    format: 'yyyy-mm-dd',
    language:"zh-CN",
    minView:2,
    autoclose:true
});
$('#date_end').datetimepicker({
    format: 'yyyy-mm-dd',
    language:"zh-CN",
    minView:2,
    autoclose:true
});

/*消息通知插件配置*/
toastr.options = {
		closeButton: !0,
		debug: !1,
		positionClass: "toast-bottom-right",
		onclick: null,
		showDuration: "300",
		hideDuration: "1000",
		timeOut: "5000",
		extendedTimeOut: "1000",
		showEasing: "swing",
		hideEasing: "linear",
		showMethod: "fadeIn",
		hideMethod: "fadeOut"
	}
</script>
