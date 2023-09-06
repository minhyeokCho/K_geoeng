$(document).ready(function(){
	AOS.init();
	$(window).on('load', function () {
		AOS.refresh();
	})
// AOS플러그인
	//$("body").niceScroll(); //페이지 스크롤 커스텀
	$('.site_menu').length && siteMenu(); //전체메뉴
	$('.main_slide').length && mainSlide(); //main slide
	$('#header').length && headVisual(); //스크롤시 헤더 노출
	$('.scroll_down').length && scrollDown(); //스크롤시 헤더 노출
	$('.main_head').length && mainHeadFixed(); //메인 헤더 상단 고정 시 fixed
	$('.go_top').length && goTop(); //페이지상단이동
	$('.sticky_menu').length && stickyMenu(); //서브 우측 메뉴
	$('.sub_tab').length && subTab(); //서브 탭 메뉴
	$('.busi_wrap').length && busiSlide(); //business slide
	$('.cursor').length && cursorStyle(); //마우스 커서 커스텀
	$('.work_slide').length && workSlide(); //Work slide
});

function siteMenu() { //전체메뉴
	$('.btn_menu').on('click', function(){
		$('.site_menu').addClass('active')
	})
	$('.btn_close').on('click', function(){
		$('.site_menu').removeClass('active')
	})
}

function mainSlide(){ //main slide
	$('.main_slide').slick({
		speed:1000,
		autoplay:true,
		autoplaySpeed: 10000,
		infinite: true,
		slidesToScroll: 1,
		focusOnSelect: true,
		arrows: true,
		pauseOnHover:false,
		pauseOnFocus:false,
		loop:true,
		dots:true,
		prevArrow: $('.sec_01').find('.btn_arrow.prev'),
		nextArrow: $('.sec_01').find('.btn_arrow.next'),
	});
}

function scrollDown() { //scroll down
	var scrollAni = $(".scroll_down span");
	setInterval(function() {
		var scrollAni_last = $(".scroll_down span svg:last-child");
		scrollAni.prepend(scrollAni_last)
	}, 2000);

	var secTop = $('.sec_02').offset().top
	$('.down_btn').on('click', function() {
		$('html, body').animate({
			scrollTop: secTop
		}, 400);
		return false;
	});
}

function headVisual () { //스크롤시 헤더 노출
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5; // 동작의 구현이 시작되는 위치
	var navbarHeight = $('header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		if(Math.abs(lastScrollTop - st) <= delta){
			return;
		}
		if (st > lastScrollTop && st > navbarHeight){
			$('header').addClass('h_up');
			$('.sticky_menu').addClass('pt_top')
		} else {
			if(st + $(window).height() < $(document).height()) {
				$('header').removeClass('h_up');
				$('.sticky_menu').removeClass('pt_top')
			}
		}
		lastScrollTop = st;
	}
}

function mainHeadFixed () {// 메인 헤더 상단 고정 시 fixed
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		if(scrollTop == 0){
			$('header').addClass('fixed')
		}else{
			$('header').removeClass('fixed')
		}
	});
}

function goTop(){ //페이지상단이동
	var goTop = $('.go_top')
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 0){
			goTop.addClass('active')
		}else{
			goTop.removeClass('active')
		}
	});

	goTop.on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		return false;
	});


}

function stickyMenu(){ //서브 우측 메뉴
	var menuList = $('.sticky_menu li');
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop(),
		contentTop = $('.sub_content').offset().top
		if(scrollTop > contentTop){
			$('.sticky_menu').addClass('active')
		}else{
			$('.sticky_menu').removeClass('active')
		}

		var sec = $('.intro_sec section')

		for(let i = 0; i<sec.length; i++){
			let secTop = sec.eq(i).offset().top;
			if(scrollTop >= secTop - 100) {
				menuList.removeClass('on')
				menuList.eq(i).addClass('on')
			}
		}
	});

	$('.sticky_menu a').on('click', function() {
		var ww = $(window).width(),
		scrollValue = 0;
		menuList.removeClass('on');
		$(this).parent().addClass('on')
		if(ww > 1280){
			scrollValue = 50
		}else{
			scrollValue = -50;
		}
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top + scrollValue
		}, 300);
		return false;
	});
}

function subTab() {//sub tab scroll
	$('.sub_tab a').on('click', function() {
		var ww = $(window).width(),
		scrollValue = 0;
		if(ww > 1280){
			scrollValue = 50
		}else{
			scrollValue = -50;
		}
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top + scrollValue
		}, 300);
		return false;
	});
}

function busiSlide(){ //business slide
	var slider = $('.business_slider')
	slider.slick({
		speed:600,
		autoplay:true,
		autoplaySpeed: 4000,
		infinite: true,
		slidesToScroll: 1,
		focusOnSelect: true,
		variableWidth: true,
		arrows: true,
		pauseOnHover:false,
		pauseOnFocus:false,
		loop:true,
		swipe: false,
		touchMove: false,
		draggable: false,
		dots:true,

		prevArrow: $('.busi_wrap').find('.btn_arrow.prev'),
		nextArrow: $('.busi_wrap').find('.btn_arrow.next'),
		customPaging: function (slider, i) {
			return '<span class="crt">' + '0' + (i + 1) + '</span>' + ' / ' + '<span class="total">' + '0' + slider.slideCount + '</span>';
		},
		responsive: [
			{ breakpoint: 1280,
				settings: {
					centerMode: true,
					centerPadding: '5px',
			}}
		]
	});
	if(typeof $.fn.Slick === 'undefined'){
		slider.find('.b_silde1').addClass('on');
		$('.business_slider .item.on').next().next().addClass('slick-on');
		slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			slider.find('div[class*="b_silde"]').removeClass('on');
			$('.business_slider .item').removeClass('slick-on');
			slider.find('.item:not(.slick-cloned).b_silde'+(nextSlide+1)).addClass('on');
			$('.business_slider .item.on:not(.slick-cloned)').next().next().addClass('slick-on');
		});
	}
}

function cursorStyle() { //마우스 커서 커스텀
	let mouseCursor = document.querySelector(".cursor");
	window.addEventListener("scroll", cursor);
	window.addEventListener("mousemove", cursor);
	function cursor(e) {
		mouseCursor.style.left = e.pageX + "px";
		mouseCursor.style.top = e.pageY - scrollY + "px";
	}
	$(".business_slider figure img").on('mouseover', function() {
		mouseCursor.classList.add("active");
		mouseCursor.style.zIndex = "99";
	})
	$(".business_slider figure img").on('mouseleave', function() {
		mouseCursor.classList.remove("active");
		mouseCursor.style.zIndex = "0";
	})
}

function workSlide(){ //work slide
	var slider = $('.work_slide')
	slider.slick({
		speed:1000,
		autoplay:true,
		autoplaySpeed: 4000,
		infinite: true,
		slidesToScroll: 1,
		focusOnSelect: true,
		variableWidth: true,
		arrows: true,
		pauseOnHover:false,
		pauseOnFocus:false,
		loop:true,
		swipe: false,
		touchMove: false,
		draggable: false,
		dots:true,
		prevArrow: $('.work_wrap').find('.btn_arrow.prev'),
		nextArrow: $('.work_wrap').find('.btn_arrow.next'),
		customPaging: function (slider, i) {
			return '<span class="crt">' + '0' + (i + 1) + '</span>' + ' / ' + '<span class="total">' + '0' + slider.slideCount + '</span>';
		},
		responsive: [
			{ breakpoint: 1280,
				settings: {
					centerMode: true,
					centerPadding: '5px',
			}}
		]
	});
}