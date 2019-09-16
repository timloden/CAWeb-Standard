jQuery( document ).ready( function() {
    
    var pricingTable = $( 'div.et_pb_pricing_table_wrap' );

	if ( pricingTable.length ) {

		//console.log( pricingTable );

		pricingTable.each( function( index, element ) {

			// Grab each more button control
			var link =  $( element ).find( 'div.et_clickable' );

			link.attr( 'tabIndex', 0 );

		});
    }
    
    
});
