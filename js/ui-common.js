$(function () {
	var agent = navigator.userAgent.toLowerCase();
	if (/iphone|ipad|ipod/i.test(agent)) {
		$('body').addClass('ios');
	} else if (agent.indexOf('windows 10') || agent.indexOf('windows 8.1')) {
		$('body').addClass('win8gt');
	}
	$(window).on('load', function () {
		$('#loading').delay(100).fadeOut(1000);
	});

	// 견적문의
	$('a[href="#contact"]').on('click', function () {
		contactOpen();
	});
	$('.btn-back').on('click', function () {
		$('body').removeClass('modal-opened');
		$('#contact').removeClass('opened');
		return false;
	});

	// 포트폴리오 마우스오버 효과
	$('.portfolio-list img').on('mouseenter', function () {
		$(this).addClass('hover').siblings('img').removeClass('hover');
	}).on('mouseleave', function () {
		$(this).removeClass('hover');
	});
	$('.portfolio-list a').on('click', function () {
		return false;
	});

	// 전체메뉴
	$('.portfolio-list a').on('click', function () {
		return false;
	});
});

// 견적문의
function contactOpen() {
	$('#contact').addClass('opened');
	$('body').addClass('modal-opened');
	return false;
}

// GNB 
$('#btn-allmenu').on('click', function () {
	$('#gnb').addClass('show');
	return false;
});
$('#btn-allmenu-close').on('click', function () {
	$('#gnb').removeClass('show');
});

// 메인 전용 스크립트
if ($('body').hasClass('main')) {
	/*
		// 헤더 스크롤 노출
		var didScroll;
		var lastScrollTop = 0;
		var delta = 10;
		var navbarHeight = $('.header').outerHeight();

		$(window).scroll(function (e) {
			didScroll = true;
		});

		setInterval(function () {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();
			var vh = $(window).height();
			if (Math.abs(lastScrollTop - st) <= delta) return;
			if (st > lastScrollTop && st > vh - 150) {
				$('body').addClass('header-hide');
			} else {
				if (st + vh < $(document).height()) {
					$('body').removeClass('header-hide');
				}
			}
			lastScrollTop = st;
		}
	*/

	// 스크롤 제어
	var lastId,
		topMenu = $('.header'),
		menuItems = topMenu.find('.nav-scroll'),
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr('href'));
			if (item.length) {
				return item;
			}
		});

	menuItems.click(function (e) {
		var href = $(this).attr('href');
		var offsetTop = href === '#' ? 0 : $(href).offset().top - 35;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, {
			duration: 1000,
			easing: 'easeOutQuint'
		});
		e.preventDefault();
	});

	$(window).scroll(function () {
		var currentScrollTop = $(this).scrollTop();
		var fromTop = currentScrollTop - 10;
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop + 60) {
				return this;
			}
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		if (lastId !== id) {
			lastId = id;
			menuItems.removeClass('active');
			menuItems.filter('[href="#' + id + '"]').addClass('active');
		}

		// 헤더 컬러
		if (currentScrollTop > $(window).height() - 150) {
			$('.header').addClass('header-white');
		} else {
			$('.header').removeClass('header-white');
		}
	});

	// 포트폴리오 슬라이더
	$('.portfolio-list').slick({
		dots: false,
		arrows: false,
		easing: 'easeOutQuint',
		speed: 1500,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 3,
		slidesToScroll: 3,
		centerMode: true,
		centerPadding: 0,
		variableWidth: true,
		initialSlide: 2
	});
}
