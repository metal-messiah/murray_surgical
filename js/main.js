(function($) {
	'use strict';

	/*--------------------------
  preloader
  ---------------------------- */
	$(window).on('load', function() {
		var pre_loader = $('#preloader');
		pre_loader.fadeOut('slow', function() {
			$(this).remove();
		});
	});

	/*---------------------
   TOP Menu Stick
  --------------------- */
	var s = $('#sticker');
	var pos = s.position();
	$(window).on('scroll', function() {
		var windowpos = $(window).scrollTop() > 300;
		if (windowpos > pos.top) {
			s.addClass('stick');
		} else {
			s.removeClass('stick');
		}
	});

	/*----------------------------
   Navbar nav
  ------------------------------ */
	var main_menu = $('.main-menu ul.navbar-nav li ');
	main_menu.on('click', function() {
		main_menu.removeClass('active');
		$(this).addClass('active');
	});

	/*----------------------------
   wow js active
  ------------------------------ */
	new WOW().init();

	$('.navbar-collapse a:not(.dropdown-toggle)').on('click', function() {
		$('.navbar-collapse.collapse').removeClass('in');
	});

	//---------------------------------------------
	//Nivo slider
	//---------------------------------------------
	// $('#ensign-nivoslider').nivoSlider({
	// 	effect: 'random',
	// 	slices: 15,
	// 	boxCols: 12,
	// 	boxRows: 8,
	// 	animSpeed: 500,
	// 	pauseTime: 5000,
	// 	startSlide: 0,
	// 	directionNav: true,
	// 	controlNavThumbs: false,
	// 	pauseOnHover: true,
	// 	manualAdvance: true
	// });

	//------
	// CUSTOM SLIDER
	// ----

	const slides = [
		{ url: 'img/slider/lobby_pano.jpg', align: 'bottom', center: 'left' },
		{ url: 'img/slider/exterior.png', align: 'top', center: 'center' }
// 		{ url: 'img/slider/operating_room.jpg', align: 'center', center: 'center' }
	];
	let curr = 0;
	let lastSlide;
	setInterval(() => {
		lastSlide = curr;
		curr = curr < slides.length - 1 ? curr + 1 : 0;

		$('.custom-slider').css('opacity', 0);

		setTimeout(() => {
			$('.custom-slider').css('opacity', 1);
			$('.custom-slider').css('backgroundImage', `url(${slides[curr].url})`);

			if (slides[curr].align === 'bottom') {
				$('.custom-slider').addClass('bottom');
				$('.custom-slider').removeClass('top');
				$('.custom-slider').removeClass('center-y');
			} else if (slides[curr].align === 'top') {
				$('.custom-slider').addClass('top');
				$('.custom-slider').removeClass('bottom');
				$('.custom-slider').removeClass('center-y');
			} else {
				$('.custom-slider').addClass('center-y');
				$('.custom-slider').removeClass('bottom');
				$('.custom-slider').removeClass('top');
			}

			if (slides[curr].center === 'left') {
				$('.custom-slider').addClass('left');
				$('.custom-slider').removeClass('center');
			} else {
				$('.custom-slider').addClass('center');
				$('.custom-slider').removeClass('left');
			}

			// $('.custom-slider').css('background-position', `url(${slides[curr].align})`);

			$(`#slide_${curr}`).css('display', 'block');
			$(`#slide_${lastSlide}`).css('display', 'none');
		}, 1000);
	}, 10000);

	/*----------------------------
   Scrollspy js
  ------------------------------ */
	var Body = $('body');
	Body.scrollspy({
		target: '.navbar-collapse',
		offset: 80
	});

	/*---------------------
    Venobox
  --------------------- */
	var veno_box = $('.venobox');
	veno_box.venobox();

	/*----------------------------
  Page Scroll
  ------------------------------ */
	// var page_scroll = $('a.page-scroll');
	// page_scroll.on('click', function(event) {
	// 	var $anchor = $(this);
	// 	$('html, body').stop().animate(
	// 		{
	// 			scrollTop: $($anchor.attr('href')).offset().top - 55
	// 		},
	// 		1500,
	// 		'easeInOutExpo'
	// 	);
	// 	event.preventDefault();
	// });

	/*--------------------------
    Back to top button
  ---------------------------- */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});

	$('.back-to-top').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*----------------------------
   Parallax
  ------------------------------ */
	var well_lax = $('.wellcome-area');
	well_lax.parallax('50%', 0.4);
	var well_text = $('.wellcome-text');
	well_text.parallax('50%', 0.6);

	/*--------------------------
   collapse
  ---------------------------- */
	var panel_test = $('.panel-heading a');
	panel_test.on('click', function() {
		panel_test.removeClass('active');
		$(this).addClass('active');
	});

	// $(window).scroll(function() {
	// 	let crnas = 4;
	// 	let nurses = 3;

	// 	var hT = $('#crnas').offset().top,
	// 		hH = $('#crnas').outerHeight(),
	// 		wH = $(window).height(),
	// 		wS = $(this).scrollTop();
	// 	if (wS > hT + hH - wH) {
	// 		incrementElement('crnas', crnas);
	// 		incrementElement('nurses', nurses);
	// 	}
	// });

	// const incrementElement = (id, limit, offset) => {
	// 	const step = 100;
	// 	offset = offset || 100;
	// 	let val = Number($(`#${id}`).html());
	// 	if (val < limit) {
	// 		offset += step;
	// 		setTimeout(() => {
	// 			val++;
	// 			$(`#${id}`).text(val);
	// 			incrementElement(id, limit, offset);
	// 		}, offset);
	// 	}
	// };

	/*---------------------
   Testimonial carousel
  ---------------------*/
	var test_carousel = $('.testimonial-carousel');
	test_carousel.owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});
	/*----------------------------
   isotope active
  ------------------------------ */
	// portfolio start
	$(window).on('load', function() {
		var $container = $('.awesome-project-content');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
		var pro_menu = $('.project-menu li a');
		pro_menu.on('click', function() {
			var pro_menu_active = $('.project-menu li a.active');
			pro_menu_active.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});
	});
	//portfolio end

	/*---------------------
   Circular Bars - Knob
--------------------- */
	if (typeof $.fn.knob != 'undefined') {
		var knob_tex = $('.knob');
		knob_tex.each(function() {
			var $this = $(this),
				knobVal = $this.attr('data-rel');

			$this.knob({
				draw: function() {
					$(this.i).val(this.cv);
				}
			});

			$this.appear(
				function() {
					$({
						value: 0
					}).animate(
						{
							value: knobVal
						},
						{
							duration: 2000,
							easing: 'swing',
							step: function() {
								$this.val(Math.ceil(this.value)).trigger('change');
							}
						}
					);
				},
				{
					accX: 0,
					accY: -150
				}
			);
		});
	}
})(jQuery);
