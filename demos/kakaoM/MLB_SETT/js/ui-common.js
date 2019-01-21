// GNB
$(function () {
	var active = $('#gnb > li.on');
	$(document).on('mouseenter focus', '#gnb > li > a', function () {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	}).on('mouseleave', '#header', function () {
		$(active).addClass('on').siblings('li').removeClass('on');
	}).on('keydown', '#gnb > li:first-child > a', function (e) {
		if (e.keyCode == 9 && e.shiftKey) { // shift + tab
			$(active).addClass('on').siblings('li').removeClass('on');
		}
	}).on('keydown', '#gnb > li:last-child > .lnb > li:last-child > a', function (e) {
		if (e.keyCode == 9 && !e.shiftKey) { // tab
			$(active).addClass('on').siblings('li').removeClass('on');
		}
	});
});

// 패널 토글
$(document).on('click', '.pannel .ico-collapse', function () {
	$(this).closest('.pannel').children('.pannel-body').slideToggle('fast');
	return false;
});

// 셀렉트 메뉴
$('.js-select-menu').each(function () {
	$('#' + $(this).val()).show();
});
$(document).on('click', '.js-select-btn', function () {
	$('#' + $(this).prev('.js-select-menu').val()).show().siblings('.js-select-content').hide();
});

// 모달 레이어
$(document).on('click', 'a.js-layer-open', function (e) {
	var tg = $(this).attr('href');
	modalOpen(tg);
	e.preventDefault();
}).on('click', '.js-layer-close', function () {
	modalClose(this);
});

function modalOpen(_target, _opener) {
	$('#divCalendar').remove();
	if (_opener) {
		modalOpener = _opener;
	} else {
		modalOpener = $(event.target);
	}
	$(_target).addClass('show');
	$('body').addClass('modal-opened');
}

function modalClose(tg) {
	$('#divCalendar').remove();
	$('body').removeClass('modal-opened');
	$(tg).closest('.layer-popup').removeClass('show')
}
