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

	var cawebCards = $( 'div.et_pb_ca_card' );

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

					if( $( tab ).is(':empty') ) {
						$( this ).hide();
					}
					
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

});
