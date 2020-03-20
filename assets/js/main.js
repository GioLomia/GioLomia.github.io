/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');
		$nav_text = $('#nav > ul > li > a > span');
		console.log($nav_text);
	// $('#main').width($window.width());
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
		
		console.log($window.width());
		if ($window.width()>=960){		
			$window.on('scroll', function(){
				
			if ($window.width()>=960){
				let scrollPosition = $window.scrollTop();
				if (scrollPosition>=300){
					$('#software_eng').animate({opacity: 0, height: 30}, {duration: 1});
				}
				else{$('#software_eng').animate({opacity: 1, height: 30}, {duration: 1});}
				
				if (scrollPosition > ($window.width()*0.2508)+183.12){
					scrollPosition = ($window.width()*0.2508)+183.12;
				}
				else if (scrollPosition<210){
					scrollPosition = 210;
				}
				let CSSscrollPosString = String((45/(scrollPosition/10000))/100)+"%";
				let CSSscrollPosOpacity = String(30/scrollPosition);
				console.log(CSSscrollPosString);
				// console.log(CSSscrollPosOpacity);
				console.log(scrollPosition)
				
				if (scrollPosition > 380){
					// console.log($("#links-to-me span:first"));
					$('#intro-tab, #about-tab, #education-tab, #projects-tab, #contact-tab, #pers_title').animate({opacity: 0, height: 30}, {duration: 1});
				}
				else {
					$('#intro-tab, #about-tab, #education-tab, #projects-tab, #contact-tab, #pers_title').animate({opacity: 1, height: 30}, {duration: 1});
					$nav_text.animate({opacity: 1}, {duration: 1});
					
				}
				$("#header").animate({width: CSSscrollPosString},
									//   opacity: CSSscrollPosOpacity},
										{duration:10});
				$('#main').animate({marginLeft: CSSscrollPosString},{duration: 10});
			}
		}) 
		}
		
		$('#berea').mouseover(function(){
			$('<div id="headerToggle">' +
			'<a href="#header" class="toggle"></a>' +
		'</div>').appendTo($body);
		});
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