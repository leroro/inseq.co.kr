/* ui.js */

$(document).ready(function() {
	// GNB
	var gnbCols = $('#gnb>.inner>ul>li').length;
	$('#gnb>.inner>ul').addClass('col'+gnbCols);	

	var subH = [];
	$('#gnb>.inner>ul>li>ul').each(function(i) {
		subH[i] = $(this).outerHeight();
	});
	
	var maxH = 0;
	for (var i=0; i < gnbCols; i++) {
		if (maxH < subH[i]) maxH = subH[i];
	}

	var gnbClosedH = 62;
	var gnbOpenedH = maxH + 62;

	if ($('#gnb>.inner>ul>li>ul').length) {
		$('#gnb>.inner>ul').on('mouseenter', function() {
			$('#gnb').addClass('hover');
			$('#gnb>.inner').stop().animate({'height' : gnbOpenedH}, 300);
			$('#gnb>.inner>ul>li>ul').css({'bottom': 0});
		});
		$('#gnb').on('mouseleave', function() {
			$('#gnb>.inner').stop().animate({'height' : gnbClosedH}, 300);
			setTimeout(function() {$('#gnb').removeClass('hover')}, 300);
		});
		$('#gnb>.inner>ul>li:first-child>a').on('focus', function() {
			$('#gnb').addClass('hover');
			$('#gnb>.inner').stop().animate({'height' : gnbOpenedH}, 300);
		});
	}

	// Kendo UI
	$('select').not('.multi').kendoDropDownList();
	$('.k-search').kendoComboBox({
		dataTextField: 'text',
		dataValueField: 'value',
		dataSource: [
			{ text: '조회', value: '0' },
			{ text: '옵션1', value: '1' },
			{ text: '옵션2', value: '2' },
			{ text: '옵션3', value: '3' },
			{ text: '옵션4', value: '4' }
		],
		filter: 'contains',
		suggest: true,
		index: 0
	});
	$('.tb_list table').kendoGrid({
		height: 550,
		sortable: true,
		pageable: true,
		pageSize: 20
	});
	$(".datepicker").kendoDatePicker({
		format: "yyyy-MM-dd"
	});
	
	// 영업현황
	$('.accordion.on').children('.cont').show();
	$('.btnset_chart .on').each(function() {
		var viewType = $(this).children().attr('class');
		$(this).closest('.tit').next('.cont').children('.'+viewType).show();
	});
	$('.accordion .btn_open').click(function() {
		$(this).closest('.tit').next('.cont').slideToggle('fast');
		$(this).closest('.accordion').toggleClass('on').siblings('.accordion').removeClass('on').children('.cont').slideUp('fast');
		return false;
	});
	$('.switch button').click(function() {
		if ($(this).closest('.accordion').hasClass('on')) {
			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
		}
		if ($(this).closest('ul').hasClass('btnset_chart')) {
			var viewType = $(this).attr('class');
			$(this).closest('.tit').next('.cont').children('.'+viewType).show().siblings('.tab').hide();
		}
	});
	
	// 게시판 목록
	$('.tb_bbs .subject').click(function() {
		$(this).closest('tr').next('.bbs_cont').children('td').slideToggle(300).end('tr').siblings().filter(function(index) {
			if ($(this).hasClass('bbs_cont') || $(this).hasClass('bbs_reply')) {
				var result = $(this);
			}
			return result;
		}).children('td').slideUp(300);
		$(this).closest('tr').next('.bbs_cont').next('.bbs_reply').children('td').slideToggle(300);
		return false;
	});
	
	// 레이어 버튼
	$('.layer_location button').click(function() {
		$(this).addClass('on').siblings('button').removeClass('on');		
	});

	// 상세조회 탭
	$('.tap_setting li button, .tap_list li a').click(function() {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
		return false;
	});

	// 택시운행위치정보
	$('#snb a').click(function () {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	});
	$('.option input').each(function () {
		if ($(this).prop('checked')) {
			$(this).closest('.option').find('label').removeClass('on');
			$(this).closest('.option').find('.input').slideUp('fast');
			$(this).parent('label').addClass('on');
			$(this).parent('label').next('.input').slideDown('fast');
		} else {
			$(this).parent('label').removeClass('on');
		}
	}).change(function () {
		if ($(this).prop('checked')) {
			$(this).closest('.option').find('label').removeClass('on');
			$(this).closest('.option').find('.input').slideUp('fast');
			$(this).parent('label').addClass('on');
			$(this).parent('label').next('.input').slideDown('fast');
		} else {
			$(this).parent('label').removeClass('on');
		}
	});
	$('.tit_toggle').click(function () {
		$(this).toggleClass('open');
		$(this).next().toggle();
	});
	$('.weather .btn_more').click(function () {
		$('.select_location').toggle();
	});	
	$('.select_location .btn_close').click(function () {
		$('.select_location').hide();
	});	
	$('.data_board .btn_databoard').click(function () {
		var container = $(this).closest('.data_board');
		if ($(container).hasClass('closed')) {
			$(container).removeClass('closed').animate({'right' : 0}, 300);
		} else {
			$(container).addClass('closed').animate({'right' : -549}, 300);
		}
	});
	$('.tap_pannel a').click(function () {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	});
	
});

function pannelOpen(obj) {
	var posL = 0;
	if ($(obj).closest('.pannel').hasClass('search')) {
		$('.pannel.search').removeClass('closed').animate({'left' : 70}, 300);
		if ($('.pannel.result').hasClass('closed')) {
			$('.pannel.result').animate({'left' : 0}, 300);
			posL = 310;
		} else {
			$('.pannel.result').animate({'left' : 380}, 300);
			posL = 690;
		}
		$('.pannel.search .btn_open_pannel').fadeOut(300);
	} else {
		$('.pannel.result').removeClass('closed');
		if ($('.pannel.search').hasClass('closed')) {
			$('.pannel.result').animate({'left' : 70}, 300);
			posL = 380;
		} else {
			$('.pannel.result').animate({'left' : 380}, 300);
			posL = 690;
		}
		$('.pannel.result .btn_open_pannel').fadeOut(300);
	}
	$('.legend_area').animate({left : posL}, 300);
}
function pannelClose(obj) {
	var posL = 0;
	if ($(obj).closest('.pannel').hasClass('search')) {
		$('.pannel.search').addClass('closed').animate({'left' : -240}, 300);
		if ($('.pannel.result').hasClass('closed')) {
			$('.pannel.result').animate({'left' : -310}, 300);
			var posL = 0;
		} else {
			$('.pannel.result').animate({'left' : 70}, 300);
			var posL = 380;
		}
		setTimeout(function() {$('.pannel.search .btn_open_pannel').fadeIn(300)}, 200);
	} else {
		$('.pannel.result').addClass('closed');
		if ($('.pannel.search').hasClass('closed')) {
			$('.pannel.result').animate({'left' : -310}, 300);
			var posL = 0;
		} else {
			$('.pannel.result').animate({'left' : 0}, 300);
			var posL = 310;
		}
		setTimeout(function() {$('.pannel.result .btn_open_pannel').fadeIn(300)}, 200);
	}
	$('.legend_area').animate({left : posL}, 300);
}

// 특이영업 패널
function pannelOpen2(obj) {
	$('.pannel.search').removeClass('closed').animate({'left' : 0}, 300);
	$('.pannel.search .btn_open_pannel').fadeOut(300);
}
function pannelClose2(obj) {
	$('.pannel.search').addClass('closed').animate({'left' : -460}, 300);
	setTimeout(function() {$('.pannel.search .btn_open_pannel').fadeIn(300)}, 200);
}
