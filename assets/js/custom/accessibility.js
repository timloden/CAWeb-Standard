jQuery( document ).ready( function() {

	// get pricing tables
	var pricingTable = $( 'div.et_pb_pricing_table_wrap' );

	// get divi accordions
	var diviAccordions = $( 'div.et_pb_accordion' );

	// get divi CTAs
	var diviCtas = $( 'div.et_pb_promo' );

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

});
