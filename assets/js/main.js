/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');
	// let scrolls=0;
	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});
		$window.on('scroll', function(){
			let scrollPosition = $window.scrollTop();
			if (scrollPosition > 500){
				scrollPosition = 500;
			}
			else if (scrollPosition<210){
				scrollPosition = 210;
			}
			let scrollPosString = String("+="+String(scrollPosition)); 
			let CSSscrollPosString = String((42/(scrollPosition/10000))/100)+"%";
			let CSSscrollPosOpacity = String(200/scrollPosition);
			console.log(scrollPosString);
			console.log(CSSscrollPosString);
			// $("#header").animate({scale: scrollPosString}, {queue: false, duration: 1});
			$("#header").animate({width: CSSscrollPosString,
								  opacity: CSSscrollPosOpacity},
									{duration:5});

			// $("#header")
			// $("#nav").toggle("scale",{percent:30,direction:"horizontal"},2000);
			// $nav_a.removeClass('active');
		}) 

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {
				console.log("Nav Active")
				var $this = $(this);
				console.log($nav_a)
				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					// console.log($nav_a);
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			// .on('scroll', function(){
			// 	console.log("I am scrolling");
			// 	$nav_a.removeClass('active');
			// }) 
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);