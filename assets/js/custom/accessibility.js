/* eslint-disable vars-on-top */
jQuery( document ).ready( function() {

	// get pricing tables
	var pricingTable = $( 'div.et_pb_pricing_table_wrap' );

	// get divi accordions
	var diviAccordions = $( 'div.et_pb_accordion' );

	// get divi CTAs
	var diviCtas = $( 'div.et_pb_promo' );

	// get divi circle counters
	var diviCircleCounters = $( 'div.et_pb_circle_counter' );

	// get divi countdown timers
	var diviCountdownTimers = $( 'div.et_pb_countdown_timer' );

	// get divi number counters
	var diviNumberCounters = $( 'div.et_pb_number_counter' );

	// get divi persons
	var diviPersons = $( 'div.et_pb_team_member' );

	// get divi tab controls for weird empty link glitch
	var tab_modules = $( 'div' ).filter( function() {
		return this.className.match( /\bet_pb_tabs_\d\b/ );
	});

	// get panel modules
	var cawebPanels = $( 'div.et_pb_ca_panel' );

	// get media slides with links
	var cawebMediaSlides = $( 'div.cacm_media_slider_slide' );

	// get caweb cards
	var cawebCards = $( 'div.et_pb_ca_card' );

	// get divi images
	var diviImages = $( 'div.et_pb_image img' );

	/*
    Divi Blog Module Accessibility
    Retrieve all Divi Blog Modules
    */
	var blog_modules = $( 'div' ).filter( function() {
		return this.className.match( /\bet_pb_blog_\d\b/ );
	});

	/*
	Divi Blurb Module Accessibility
	Retrieve all Divi Blurb Modules
	*/
	var blurb_modules = $( 'div.et_pb_blurb' );

	/*
    Divi Button Module Accessibility
    Retrieve all Divi Button Modules
    */
	var button_modules = $( 'a.et_pb_button' );

	/*
   Divi Slides (Standard & Fullwidth) Accessibility
   Slide Module is a child module used in the following modules:
   Slider (Standard & Fullwidth)
   Post Slider (Standard & Fullwidth)
   Retrieve all Divi Slide Modules
   */
	var slide_modules = $( 'div.et_pb_slide' );

	/*
   Divi Slider Arrows Accessibility
   Retrieve all Divi Slider Arrows
   */
	var slider_arrows = $( 'div.et-pb-slider-arrows' );

	/*
   Divi Post Slider (Standard & Fullwidth) Accessibility
   Retrieve all Divi Post Slider Modules
   */
	var slider_modules = $( 'div' ).filter( function() {
	   return this.className.match( /\bet_pb_slider_\d\b|\bet_pb_fullwidth_slider_\d\b/ );
	});


	/*
   Divi Post Slider (Standard & Fullwidth) Accessibility
   Retrieve all Divi Post Slider Modules
   */
	var post_slider_modules = $( 'div' ).filter( function() {
	   return this.className.match( /\bet_pb_post_slider_\d\b|\bet_pb_fullwidth_post_slider_\d\b/ );
	});

	/*
   Divi Fullwidth Header Module Accessibility
   Retrieve all Divi Fullwidth Header Modules
   */
	var fullwidth_header_modules = $( 'section' ).filter( function() {
	   return this.className.match( /\bet_pb_fullwidth_header_\d\b/ );
	});

	/*
    Divi Video Module Accessibility
    Retrieve all Divi Video Modules
   */
  var video_modules = $( 'div.et_pb_video' );

  /*
  Divi Toggle Module Accessibility
  Retrieve all Divi Toggle Modules
 */
  var toggle_modules = $( 'div.et_pb_toggle' );


	// find pricing tables and add tabindex to links
	if ( pricingTable.length ) {

		pricingTable.each( function( index, element ) {

			// get linked item
			var link =  $( element ).find( 'div.et_clickable' );

			link.attr( 'tabIndex', 0 );

		});
	}

	if ( diviAccordions.length ) {

		diviAccordions.each( function( index, element ) {

			// get main accodrion item
			var link =  $( element ).find( 'h5.et_pb_toggle_title' );

			link.attr( 'tabIndex', 0 );

		});
	}

	if ( diviCtas.length ) {

		diviCtas.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( diviCircleCounters.length ) {

		diviCircleCounters.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( diviCountdownTimers.length ) {

		diviCountdownTimers.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( diviNumberCounters.length ) {

		diviNumberCounters.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( diviPersons.length ) {

		diviPersons.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( tab_modules.length ) {
		tab_modules.each( function( index, element ) {

			// Grab each tab control list
			var tab_list =  $( element ).find( 'ul.et_pb_tabs_controls' );
			var lis = $( tab_list ).find( 'li' );

			tab_list.each( function( i ) {
				var t =  $( tab_list[i]);

				var tabs =  $( element ).find( 'a' );
				tabs.each( function( t ) {
					var tab = $( tabs[t]);
					tab.attr( 'tabindex', 0 );

					if ( $( tab ).is( ':empty' ) ) {
						$( this ).hide();
					}

					tab.on( 'focus', function() {

						lis.each( function( l ) {
							$( this ).removeClass( 'et_pb_tab_active' );
						});
						tab.parent().addClass( 'et_pb_tab_active' );
						tab.addClass( 'keyboard-outline' );
					});

				});
			});
		});
	}

	if ( cawebPanels.length ) {

		cawebPanels.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( cawebMediaSlides.length ) {

		cawebMediaSlides.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( cawebCards.length ) {

		cawebCards.each( function( index, element ) {

			if ( $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).attr( 'tabIndex', 0 );
			}

		});
	}

	if ( diviImages.length ) {

		diviImages.each( function( index, element ) {

			//console.log( element );
			if ( '' == element.alt ) {

				// im sure this could be better

				var path = element.src;

				var file = path.replace( /^.*[\\\/]/, '' )
					.split( '.' ).slice( 0, -1 ).join( '.' )
					.replace( /-/g, ' ' );

				$( element ).attr( 'alt', file );
			}

		});
	}

	// Run only if there is a Blog Module on the current page
	if ( blog_modules.length ) {
		blog_modules.each( function( index, element ) {

			// Grab each blog article
			blog =  $( element ).find( 'article' );
			blog.each( function( i ) {
				b =  $( blog[i]);

				// Grab the article title
				title = b.children( '.entry-title' ).text();

				// Grab the More Information Button from the Post content
				// Divi appends the More Information button as the last child of the content
				read_more = b.children( '.post-content' ).children( '.more-link:last-child' );

				// If there is a More Information Button append SR Tag with Title
				if ( read_more.length ) {
					read_more.append( '<span class="sr-only">' + title + '</span>' );
				}
			});
		});
	}


	// Run only if there is a Blog Module on the current page
	if ( blurb_modules.length ) {
		blurb_modules.each( function( index, element ) {
			var header = $( element ).find( '.et_pb_module_header' );
			var header_title = header.length ?
				( $( header ).children( 'a' ).length ? $( header ).children( 'a' )[0].innerText : header[0].innerText ) : '';

			if ( ! $( element ).find( 'a' ).length && $( element ).hasClass( 'et_clickable' ) ) {
				$( element ).prepend( '<a href="#"><span class="sr-only">' + header_title + '</span></a>' );
			} else if ( $( element ).find( '.et_pb_main_blurb_image' ).children( 'a' ).length ) {
				var blurb_img = $( element ).find( '.et_pb_main_blurb_image' );

				$( blurb_img ).removeAttr( 'aria-hidden' );

				$( $( blurb_img ).children( 'a' )[0]).prepend( '<span class="sr-only">' + header_title + '</span>' );
			}

			$( element ).children( 'a' ).on( 'focusin', function() {
				$( this ).parent().css( 'outline', '#2ea3f2 solid 2px' );
			});

			$( element ).children( 'a' ).on( 'focusout', function() {
				$( this ).parent().css( 'outline', '0' );
			});
		});
	}

	// Run only if there is a Button Module on the current page
	if ( button_modules.length ) {
		button_modules.each( function( index, element ) {

			// Add no-underline to each button module
			$( element ).addClass( 'no-underline' );
		});
	}

	// Run only if there is a Slide Module on the current page
	if ( slide_modules.length ) {
		slide_modules.each( function( index, element ) {

			// Grab each more button control
			var more_button =  $( element ).find( 'a.et_pb_more_button' );

			more_button.addClass( 'no-underline' );

		});
	}

	// Run only if there are Slide Arrows on the current page
	if ( slider_arrows.length ) {
		slider_arrows.each( function( index, element ) {

			// Grab each more button control
			var prev_button =  $( element ).find( 'a.et-pb-arrow-prev' );
			var next_button =  $( element ).find( 'a.et-pb-arrow-next' );

			prev_button.addClass( 'no-underline' );
			prev_button.find( 'span' ).addClass( 'sr-only' );
			prev_button.prepend( '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span>' );

			next_button.addClass( 'no-underline' );
			next_button.find( 'span' ).addClass( 'sr-only' );
			next_button.prepend( '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span>' );

		});
	}

	// Run only if there is a Slider Module on the current page
	if ( slider_modules.length ) {
		slider_modules.each( function( index, element ) {

			// Grab Post Slider Controllers
			var controller = $( element ).find( '.et-pb-controllers a' );
			controller.each( function( c ) {
				controller[c].text = 'Slide ' + controller[c].text;
			});
		});
	}


	// Run only if there is a Post Slider Module on the current page
	if ( post_slider_modules.length ) {
		post_slider_modules.each( function( index, element ) {

			// Grab all slides
			slides =  $( element ).find( 'div.et_pb_slide' );
			slides.each( function( i ) {
				s =  $( slides[i]);

				// Grab the slide title
				title = s.find( '.et_pb_slide_title' );
				title_link = title.find( 'a' );
				title_link.addClass( 'no-underline' );

				// Grab the More Button from Slide
				more_button = s.find( '.et_pb_more_button' );

				// If there is a More Button append SR Tag with Title
				if ( more_button.length ) {
					more_button.append( '<span class="sr-only">' + title.text() + '</span>' );
				}
			});

			// Grab Post Slider Controllers
			var controller = $( element ).find( '.et-pb-controllers a' );
			controller.each( function( c ) {
				controller[c].text = 'Slide ' + controller[c].text;
			});
		});
	}


	// Run only if there is a Fullwidth Header Module on the current page
	if ( fullwidth_header_modules.length ) {
		fullwidth_header_modules.each( function( index, element ) {

			// Grab all More Buttons
			more_buttons =  $( element ).find( '.et_pb_more_button' );
			more_buttons.each( function( i ) {
				m =  $( more_buttons[i]);

				m.addClass( 'no-underline' );
			});
		});
	}

	// Run only if there is a Video Module on the current page
	if ( video_modules.length  ) {
		video_modules.each( function( index, element ) {
			var frame = $( element ).find( 'iframe' );
			frame.attr( 'title', 'Divi Video Module IFrame' );
			$( frame ).removeAttr( 'frameborder' );
		});
	}

	// Run only if there is a Video Module on the current page
	if ( toggle_modules.length  ) {
		toggle_modules.each( function( index, element ) {

			$( element ).off( 'keydown', function( e ) {
				console.log( 'Key Down ' + e.keyCode );
			});

			$( element ).off( 'keypress', function( e ) {
				console.log( 'Key Press ' + e.keyCode );
			});

			$( element ).off( 'keyup', function( e ) {
				console.log( 'Key Up ' + e.keyCode );
			});

			$( element ).on( 'focusin', function() {
				toggleExpansion( this );
			});

		});

		function toggleExpansion( ele ) {
			var expanded = $( ele ).hasClass( 'et_pb_toggle_open' ) ?  'true' : 'false' ;

			$( ele ).attr( 'aria-expanded', expanded );
		}
	}


});
