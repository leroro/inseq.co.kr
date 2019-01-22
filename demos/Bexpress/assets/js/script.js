$(document).ready(function(){
	
	/* 타이틀 메뉴 */
	$("header .menu-select .title-btn").not(".off , .open-bottom").on("click" , function(){
		$("header").toggleClass("on");
		return false;
	});

	/* 하단 플로팅 메뉴 */
	$("header .menu-select .title-btn.open-bottom, .pay-content a.bottom-floating, .sms-content a.bottom-floating").not(".off").on("click" , function(){
		$("header").toggleClass("open");
		$(".layer-pop.coin").toggleClass("on");
		return false;
	});

	/* 하단 플로팅 메뉴 앵커 */
	$(".select-btn").not(".off").on("click" , function(){
		$(this).toggleClass("on");
		var tg = $(this).attr("href");
		$(tg).toggleClass("on");
		return false;
	});

	/* 테이블 가로 스크롤 fixed */	
	$(window).on("scroll.fixedTable" , function(){		
		if( $(".common-fixed-table").length == 0 ) return;
	
		var top_point = $(".common-fixed-table th:nth-of-type(2)").offset().top;
		var scroll_top = $(this).scrollTop();
		$(".common-fixed-table th:nth-of-type(1)").css("top" , top_point - scroll_top);
		$(".common-fixed-table td:nth-of-type(1)").each(function(){
			var top_point = $(this).next("td").offset().top;
			$(this).css("top" , top_point - scroll_top);
		});	
	});
	if( $(".common-fixed-table").length > 0 ){
		var intervalID = setInterval( function(){
			$(window).trigger("scroll.fixedTable")
		} , 100);
	};
	
	// 마켓 테이블 헤더 너비 싱크
	var marketCellW = [];
	var rate = [];
	$('.market-table tbody tr:first-child td').each(function(i) {
		marketCellW[i] = $(this).outerWidth();
		rate[i] = marketCellW[i] / $('.market-table').outerWidth() * 100
		$(this).closest('.market-table').find('thead th').each(function(i, obj) {
			$(obj).outerWidth(rate[i]+'%');
		});
	});

	/* 지갑 내역 스크롤 */
	if( $(".history-list-content").length > 0 ){
		$(window).on("resize.history" , function(){
			var w_height = $(window).height();
			var gap = 391;	// 간격
			$(".history-list-content .list-area").height(w_height - gap);
		});
		$(window).trigger("resize.history");
	}

	/* 공통 가로 고정 테이블 */
	if( $(".common-fixed-table").length > 0 ){
		$(window).on("resize.fixedTable" , function(){
			var w_width = $(window).width();
			var table_width = $(".common-fixed-table table").width() + 20;	/* 마진 20 */

			if(w_width >= table_width){
				$(".common-fixed-table").removeClass("arrow");
			}else{
				$(".common-fixed-table").addClass("arrow");
			}
		});
		$(window).trigger("resize.fixedTable");
	}

	/* 코인 선택 레이어 팝업 닫기 */
	$(".layer-pop.coin .close-btn").on("click" , function(){
		$("header").removeClass("open");
		$(this).parents(".layer-pop.coin").removeClass("on");		
		return false;
	});
	
	/* 은행 선택 레이어 팝업 닫기 */
	$(".layer-pop.banks .close-btn").on("click" , function(){
		var opener = $(this).closest('.layer-pop.banks').attr("id");
		console.log(opener);
		$(".select-btn[href='#"+opener+"']").removeClass("on");
		$(this).parents(".layer-pop.banks").removeClass("on");
		return false;
	});

	/* 입출금 내역 필터 */
	if( $(".filter-content").length > 0 ){
		/*
		$(".filter-content a").on("click" , function(){
			setTimeout(function(){
				$(window).trigger("scroll.fixedTable");
			},0);			
		});
		*/

		$(".filter-content .btn a").on("click" , function(){
			$(this).parents(".btn").find("a").removeClass("on");
			$(this).addClass("on");
			return false;
		});
		/*
		$(".filter-content .period-cnt a").on("click" , function(){
			if( $(this).parent().index() == 4){
				$(".filter-content .period-box").show();
			}else{
				$(".filter-content .period-box").hide();
			}			
			return false;
		});
		*/

		$(".filter-content .view-area li a").on("click" , function(){
			$(".filter-content").addClass("on");
			return false;
		});

		$(".detail-view-area .top-cnt .close-btn").on("click" , function(){
			$(".filter-content").removeClass("on");
			return false;
		});

		$(".detail-view-area .coin-list .txt").on("click" , function(){
			$(".detail-view-area .coin-list").toggleClass("on");
			return false;
		});

	}

	/* 하단 버튼 input 값에 따른 disabled */
	$(".receive .pay-area input , .receive .qr-area").on("change" , function(){
		var pay_num = $(".receive .pay-area input").val();
		if( $(".receive .qr-input").length == 0 ){
			if(pay_num == "" || pay_num == 0){
				$(".floating-container .send").addClass("disabled");
			}else{
				$(".floating-container .send").removeClass("disabled");
			}
		}else{
			var qr = $(".receive .qr-input").val();			
			if(pay_num == "" || pay_num == 0 || qr == ""){
				$(".floating-container .send").addClass("disabled");
			}else{
				$(".floating-container .send").removeClass("disabled");
			}
		}		
	});
	
	/* 배경 색상 */
	$(window).on("resize.backBg" , function(){
		var w_height = $(window).height();
		var container_height = $("#wrap").height();
		if(container_height < w_height){
			$("#wrap").css("min-height" , w_height);
		}
	});
	$(window).trigger("resize.backBg");

	/* 호가 레이어 창*/
	$(".common-price-list li a").on("click" , function(){
		var layerTop = $(this).offset().top - $(window).scrollTop();
		$(".layer-pop.price").addClass("on");
		$(".layer-pop.price > .content").css("top" , layerTop)
		return false;
	});
	$(".layer-pop.price > .bg").on("click" , function(){
		$(".layer-pop.price").removeClass("on");
		return false;
	});

	
	/*
	// input[type=date] placeholder
	$('input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="month"], input[type="time"], input[type="week"]').each(function() {
		var el = this, type = $(el).attr('type');
		if ($(el).val() == '') $(el).attr('type', 'text');
		$(el).focus(function() {
			$(el).attr('type', type);
			el.click();
		});
		$(el).blur(function() {
			if ($(el).val() == '') $(el).attr('type', 'text');
		});
	});	
	*/
});