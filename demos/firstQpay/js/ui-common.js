$(function () {
	// 탭메뉴
	$('.tab-list li.on a').each(function () {
		var tg = $(this).attr('href');
		if ($(tg).hasClass('tab-cont')) {
			$(tg).show().siblings('.tab-cont').hide();
		}
	});
	$('.tab-list a').on('click', function (e) {
		var tg = $(this).attr('href');
		$(tg).show().siblings('.tab-cont').hide();
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
		e.preventDefault();
	});

	// 토글목록
	$('.js-toggle-list dt.on').each(function () {
		$(this).next('dd').show();
	});
	$('.js-toggle-list dt a').on('click', function () {
		$(this).parent('dt').toggleClass('on').next('dd').slideToggle('fast');
	});
});

// 타이틀 고정
$(window).on('load scroll', function() {
	if ($('#header + .popup .popup-header').length > 0) {
		if ($(window).scrollTop() >= 45) {
			$('html').addClass('title-fixed');
		} else {
			$('html').removeClass('title-fixed');
		}
	}
});