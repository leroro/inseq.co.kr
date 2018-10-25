/* 대시보드 */
$(document).ready(function() {
	$('select').not('.multi').kendoDropDownList();

	var openBtn = $(".k-win-open"),
		closeBtn = $(".k-button-cancel"),
		myWindow = $("#window_setting");

	$(openBtn).click(function() {
		myWindow = $(".k-win-open").attr("href");
		$(myWindow).data("kendoWindow").open();
		return false;
	});
	
	$(closeBtn).click(function() {
		$(myWindow).data("kendoWindow").close();
	});

	$("#window_setting").kendoWindow({
		width: 980,
		title: "[운수회사] 대시보드 사용자 설정",
		visible: false,
		modal: true,
		pinned: true,
		position: { top: 100 },
		actions: [
			"Pin",
			"Minimize",
			"Maximize",
			"Close"
		]
	}).data("kendoWindow").center();
	
	$('.setting_period button').click(function() {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	});
});
