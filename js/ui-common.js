$(function () {
	var agent = navigator.userAgent.toLowerCase();
	if (/iphone|ipad|ipod/i.test(agent)) {
		$('body').addClass('ios');
	} else if (agent.indexOf('windows nt 10') >= 0 || agent.indexOf('windows nt 6.3') >= 0) {
		$('body').addClass('win8gt');
	}

	$('#loading').delay(600).fadeOut(1000);
	$(window).on('load', function () {
		$('#contact .contact-us').html('<iframe id="googleFrm" src="https://docs.google.com/forms/d/e/1FAIpQLSeeTeMwUH9Wls54iMo7CKUiw1TcnKpOwtxvD4L85zmmhui6dA/viewform" title="인시퀀스 상담신청 구글설문">로드 중...</iframe>');
	});

	// 견적문의
	$('a[href="#contact"]').on('click', function () {
		contactOpen();
		return false;
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
	$('.portfolio-list a').on('click', function (e) {
		e.preventDefault();
	});

	//	// 전체메뉴
	//	$('.portfolio-list a').on('click', function () {
	//		return false;
	//	});
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

	// 포트폴리오 썸네일 목록 data 구현
	$('.portfolio-open').each(function () {
		var tg = $(this);
		var dataImage = tg.data('image');
		var dataTitle = tg.data('title');
		var dataDate = tg.data('date');
		var dataTag = tg.data('tag');

		tg.append('<div class="hover-content"><dl><dt class="hover-tit">' + dataTitle + '</dt><dd><p class="date">' + dataDate + '</p><ul class="hash-tag-wrap"></ul></dd></dl></div>');

		$.each(dataImage, function (index, value) {
			$('.hover-content', tg).before('<img src="images/portfolio-detail/' + value + '" alt="' + dataTitle + '">');
		});
		$.each(dataTag, function (index, value) {
			$('.hash-tag-wrap', tg).append('<li>' + value + '</li>');
		});
	});

	// 포트폴리오 슬라이더
	$(window).load(function () {
		if ($('.portfolio-list').length) {
			$('.portfolio-list').owlCarousel({
				loop: true,
				fallbackEasing: 'easeOutQuint',
				center: true,
				autoplay: true,
				autoplaySpeed: 1500,
				dragEndSpeed: 600,
				autoplayHoverPause: true,
				mouseDrag: true,
				touchDrag: true,
				autoWidth: true,
				dots: false,
				nav: true,
				navSpeed: 600,
				navText: ['<span class="fa fa-chevron-left"><span class="tts">이전</span></span>', '<span class="fa fa-chevron-right"><span class="tts">다음</span></span>'],
				responsive: {
					1025: {
						mouseDrag: false,
						touchDrag: false,
						navSpeed: 1500
					}
				}
			});
		}
	});

	// 포트폴리오 상세 레이어팝업
	$(function () {
		$('.main').append('<div class="portfolio-popup"><div class="portfolio-nav"><button type="button" class="btn-prev"><span class="tts">이전</span></button><button type="button" class="btn-next"><span class="tts">다음</span></button></div><div class="portfolio-inner"><div class="portfolio-loading"><div class="loader"><div class="loader__bar"></div><div class="loader__bar"></div><div class="loader__bar"></div><div class="loader__bar"></div><div class="loader__bar"></div><div class="loader__ball"></div></div></div><div class="portfolio-container"><div class="portfolio-content"></div><a href="#" class="btn-close-popup">닫기</a></div></div></div>');

		$('.portfolio-popup.show').each(function () {
			modalOpen($(this), null);
		});
	});

	var modalOpener = null;
	$(document).on('click', 'a.portfolio-open', function (e) {
		var tg = $(this).attr('href');
		modalOpen('.portfolio-popup', modalOpener);
		e.preventDefault();

		$('a.portfolio-open').parents().removeClass('active');
		$(this).parents().addClass('active');
		$('.portfolio-content').load(tg + ' ' + '.portfolio-header, .portfolio-body', function (data, status) {
			if (status == "success") {
				$(".portfolio-content").hide();
				loadedImage(data);
			}
		});
	}).on('click', '.btn-close-popup', function (e) {
		var target = $(this).closest('.portfolio-popup').attr('id');
		modalClose('#' + target, modalOpener);
		e.preventDefault();
		
		$('.portfolio-content').empty();
	}).on('keydown', '.portfolio-popup .btn-close-popup', function (e) {
		if (e.keyCode == 9 && !e.shiftKey) { // tab
			e.preventDefault();
			$(this).siblings('.portfolio-title').attr('tabindex', '0').focus();
		}
	}).on('keydown', '.portfolio-title', function (e) {
		if (e.keyCode == 9 && e.shiftKey) { // shift + tab
			e.preventDefault();
			$(this).siblings('.btn-close-popup').focus();
		}
	}).on('click', '.portfolio-nav .btn-prev', function () {
		var act = $('.portfolio-list .active');
		var next = act.prev('.portfolio-list .owl-item');
		$('.portfolio-content').empty();
		$('.portfolio-list .owl-item').removeClass('active');
		if (next.length === 0) {
			next = $('.portfolio-list .owl-item:last').prev();
		}
		next.addClass('active');

		var tg = $('a', next).attr('href');
		$('.portfolio-content').load(tg + ' ' + '.portfolio-header, .portfolio-body', function (data, status) {
			if (status == "success") {
				$(".portfolio-content").hide();
				loadedImage(data);
			}
		});
	}).on('click', '.portfolio-nav .btn-next', function () {
		var act = $('.portfolio-list .active');
		var next = act.next('.portfolio-list .owl-item');
		$('.portfolio-content').empty();
		$('.portfolio-list .owl-item').removeClass('active');
		if (next.length === 0) {
			next = $('.portfolio-list .owl-item:first').next();
		}
		next.addClass('active');

		var tg = $('a', next).attr('href');
		$('.portfolio-content').load(tg + ' ' + '.portfolio-header, .portfolio-body', function (data, status) {
			if (status == "success") {
				$(".portfolio-content").hide();
				loadedImage(data);
			}
		});
	});

	function modalOpen(_target, _opener) {
		modalOpener = _opener;
		$(_target).fadeIn('fast').addClass('show').find('.portfolio-title').attr('tabindex', '0').focus();
		bodyScroll(true, $('body').width());
	}

	function modalClose(_target, _opener) {

		bodyScroll(false);
		var tg = null;

		if (_opener) {
			tg = $(_target);
			modalOpener = $(_opener);
		} else {
			tg = $('.portfolio-popup.show');
			modalOpener = null;
		}

		$(tg).removeClass('show');
		if (modalOpener !== null) {
			modalOpener.focus();
			modalOpener = null;
		}
	}

	function bodyScroll(_status, _orgWidth) {
		var $fixedObj = $('body, .fixed');
		if (_status) {
			$('body').addClass('portfolio-opened');
			if ($('html').get(0).scrollWidth > $('html').width() === false) {
				$fixedObj.css('margin-right', $('body').width() - _orgWidth);
			}
		} else {
			$fixedObj.css('margin-right', '');
			$('body').removeClass('portfolio-opened');
		}
	}

	function loadedImage(data) {
		$('.portfolio-loading').show();

		var bgUrl = $('.portfolio-header').css('background-image');
		var images = $(data).find("img");
		var imgLoaded = 0;
		var img;

		var bgLoad = function () {
			var bgImg = new Image();
			bgImg.src = bgUrl.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
			bgImg.onload = function () {
				imageLoad();
			};
		};

		var imageLoad = function () {
			for (var i = 0; i < images.length; i++) {
				img = new Image();
				img.src = images[i].src;
				img.onload = function () {
					imgLoaded++;
					if (imgLoaded === images.length) {
						$('.portfolio-content').show();
						$('.portfolio-loading').fadeOut(1000);
					}
				};
			}
		};

		if (bgUrl) {
			bgLoad();
		} else {
			imageLoad();
		}
	}

	// 포트폴리오 hover 효과
	$(document).on('mouseenter', '.portfolio-list a', function () {
		$(this).find('.hover-content').show().stop().animate({
			'opacity': 1,
			'duration': 5000
		});
		if ($(window).width()) {
			if ($(this).attr('class') == "portfolio-list a") {
				$(this).find('.hover-content .hash-tag-wrap').stop().animate({
					'opacity': 1,
					'top': '0'
				});
			} else {
				$(this).find('.hover-content dl').stop().animate({
					'opacity': 1,
					'top': '50%'
				});
			}
		}
	});

	$(document).on('mouseleave', '.portfolio-list a', function () {
		$(this).find('.hover-content').show().stop().animate({
			'opacity': 0
		});

		$(this).find('.hover-content dl').stop().animate({
			'opacity': 0,
			'top': '100%'
		});
	});

}
