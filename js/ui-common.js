$(function () {
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		$('body').addClass('ios');
	}
	$(window).on('load', function () {
		$('#loading').delay(100).fadeOut(1000);
	});
	$('.btn-help a').on('click', function () {
		$('.help').addClass('opened');
		return false;
	});
	$('.btn-back').on('click', function () {
		$('.help').removeClass('opened');
		return false;
	});
});
