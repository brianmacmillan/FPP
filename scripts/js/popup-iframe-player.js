// popup examples
$( document ).on( "pagecreate", function() {
	//alert("on page create");
	// The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
	function scale( width, height, padding, border ) {
		var scrWidth = $( window ).width() - 30,
			scrHeight = $( window ).height() - 30,
			ifrPadding = 2 * padding,
			ifrBorder = 2 * border,
			ifrWidth = width + ifrPadding + ifrBorder,
			ifrHeight = height + ifrPadding + ifrBorder,
			h, w;

		if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
			w = ifrWidth;
			h = ifrHeight;
		} else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
			w = scrWidth;
			h = ( scrWidth / ifrWidth ) * ifrHeight;
		} else {
			h = scrHeight;
			w = ( scrHeight / ifrHeight ) * ifrWidth;
		}

		return {
			'width': w - ( ifrPadding + ifrBorder ),
			'height': h - ( ifrPadding + ifrBorder )
		};
	};

	$( ".ui-popup iframe" )
		.attr( "width", 0 )
		.attr( "height", "auto" );

	$( "#popupNewPlayer iframe" ).contents().find( "#map_canvas" )
		.css( { "width" : 0, "height" : 0 } );

	$( "#popupNewPlayer" ).on({
		popupbeforeposition: function() {
			var size = scale( 640, 480, 0, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupNewPlayer iframe" )
				.attr( "width", w )
				.attr( "height", h );

			$( "#popupNewPlayer iframe" ).contents().find( "#map_canvas" )
				.css( { "width": w, "height" : h } );
		},
		popupafterclose: function() {
			$( "#popupNewPlayer iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );

			$( "#popupNewPlayer iframe" ).contents().find( "#map_canvas" )
				.css( { "width": 0, "height" : 0 } );
		}
	});
});
