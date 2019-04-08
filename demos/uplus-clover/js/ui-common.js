// 레이어팝업 호출
$(document).on('click', '.js-layer-open', function () {
	var tg = $(this).attr('href');
	$(tg).addClass('show');
	$('html').addClass('modal-opened').on('touchmove', function (e) {
		e.preventDefault();
	});
}).on('click', '.btn-layer-close', function () {
	$(this).closest('.layer-popup').removeClass('show');
	$('html').removeClass('modal-opened').off('touchmove');
});
