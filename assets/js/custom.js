/*
				    .ooooo.          ooo. .oo.     .ooooo.    oooo d8b
				   d88" `88b         `888P"Y88b   d88" `88b   `888""8P
				   888888888  88888   888   888   888   888    888
				   888        88888   888   888   888   888    888
				   `"88888"          o888o o888o  `Y8bod8P"   d888b

***********************************************************************************************************
Copyright 2014 by E-Nor Inc.
Author: Ahmed Awwad.
Automatically tag links for Google Tag Manager to track file downloads, outbound links, social media follow and email clicks.
Version: 2.1
Last Updated: 2017/01/10
***********************************************************************************************************/


var domains_to_track = ["ca.gov"];
var folders_to_track = "";
var extDoc = [".doc",".docx",".xls",".xlsx",".xlsm",".ppt",".pptx",".exe",".zip",".pdf",".js",".txt",".csv"];
var socSites = "flickr.com/groups/californiagovernment|twitter.com/cagovernment|pinterest.com/cagovernment|youtube.com/user/californiagovernment";
var isSubDomainTracker = false;
var isSeparateDomainTracker = false;
var isGTM = false;
var isLegacy = true;
var eValues = {
			downloads: {category : 'Downloads', action: 'Download',label : '',value : 0, nonInteraction: 0 },
			outbound_downloads: {category : 'Outbound Downloads', action:'Download',label : '',value : 0, nonInteraction: 0 },
			outbounds: {category : 'Outbound Links', action:'Click',label : '',value : 0, nonInteraction: 0 },
			email: {category : 'Email Clicks', action:'Click',label : '',value : 0, nonInteraction: 0 },
			outbound_email: {category : 'Outbound Email Clicks', action:'Click',label : '',value : 0, nonInteraction: 0 },
			telephone: {category : 'Telephone Clicks', action:'Click',label : '',value : 0, nonInteraction: 0 },
			social: {category : 'Social Profiles', action:'Click',label : '',value : 0, nonInteraction: 0 }
			};


var mainDomain = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/);
//mainDomain = mainDomain.toLowerCase();

if(isSubDomainTracker == true)
{
	mainDomain = document.location.hostname.replace('www.', '').toLowerCase();
}


var arr = document.getElementsByTagName("a");
for(i=0; i < arr.length; i++)
 {
	var flag = 0;
	var mDownAtt = arr[i].getAttribute("onmousedown");
	var doname ="";
	var linkType = '';
	var mailPattern = /^mailto\:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i;
	var urlPattern = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
	var telPattern = /^tel\:(.*)([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i;
	if(mailPattern.test(arr[i].href) || urlPattern.test(arr[i].href) || telPattern.test(arr[i].href))
	{
		try
		{
			if(urlPattern.test(arr[i].href) && !mailPattern.test(arr[i].href) && !telPattern.test(arr[i].href))
			{
				doname = arr[i].hostname.toLowerCase().replace("www.","");
				linkType = 'url';
			}
			else if(mailPattern.test(arr[i].href) && !telPattern.test(arr[i].href) && !urlPattern.test(arr[i].href))
			{
				doname = arr[i].href.toLowerCase().split('@')[1];
				linkType = 'mail';
			}
			else if(telPattern.test(arr[i].href) && !urlPattern.test(arr[i].href) && !mailPattern.test(arr[i].href) )
			{
				doname = arr[i].href.toLowerCase();
				linkType = 'tel';
			}
		}
		catch(err)
		{
			continue;
		}
	}
	else
	{
		continue;
	}


	if (mDownAtt != null)
	{
		mDownAtt = String(mDownAtt);
		if (mDownAtt.indexOf('dataLayer.push') > -1 || mDownAtt.indexOf("('send'") > -1)
		continue;
	}

	var condition = false;

	if (isSeparateDomainTracker)
	{
		condition = (doname == mainDomain);
	}
	else
	{
		condition = (doname.indexOf(mainDomain) != -1);
	}

	if(condition)
	{
		// Tracking internal email clicks
		if (linkType === 'mail')
		{
			// Tracking internal email clicks
			eValues.email.label = arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i);
			_tagLinks(arr[i], eValues.email.category, eValues.email.action, eValues.email.label, eValues.email.value, eValues.email.nonInteraction,  mDownAtt);
		}
		else if(linkType === 'url')
		{
			if(folders_to_track == '' || _isInternalFolder(arr[i].href))
			{
				if(_isDownload(arr[i].href))
				{
					// Tracking Downloads - doc, xls, pdf, exe, zip
					_setDownloadData(arr[i].href, doname);
					_tagLinks(arr[i], eValues.downloads.category, eValues.downloads.action, eValues.downloads.label, eValues.downloads.value, eValues.downloads.nonInteraction, mDownAtt);
				}
			}
			else
			{
				if(_isDownload(arr[i].href))
				{
					// Tracking Outbound Downloads - doc, xls, pdf, exe, zip
					_setDownloadData(arr[i].href, doname);
					_tagLinks(arr[i], eValues.outbound_downloads.category, eValues.outbound_downloads.action, eValues.outbound_downloads.label, eValues.outbound_downloads.value, eValues.outbound_downloads.nonInteraction, mDownAtt);
				}
				else
				{
					// Tracking outbound links off site
					eValues.outbounds.label = arr[i].href.toLowerCase().replace('www.', '').split("//")[1];
					_tagLinks(arr[i], eValues.outbounds.category, eValues.outbounds.action, eValues.outbounds.label, eValues.outbounds.value, eValues.outbounds.nonInteraction, mDownAtt);
				}

			}
		}
	}
	else
	{
		for (var k = 0; k < domains_to_track.length; k++)
		{
			var condition1 = false;

			if (isSeparateDomainTracker)
			{
				condition1 = (doname == domains_to_track[k]);
			}
			else
			{
				condition1 = (doname.indexOf(domains_to_track[k]) != -1);
			}

			if(!condition1)
			{
				flag++;
				if(flag == domains_to_track.length)
				{
					if(linkType === 'mail')
					{
						// Tracking Outbound mailto links
						eValues.outbound_email.label = arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
						_tagLinks(arr[i], eValues.outbound_email.category, eValues.outbound_email.action, eValues.outbound_email.label, eValues.outbound_email.value, eValues.outbound_email.nonInteraction, mDownAtt);
					}
					if(linkType === 'tel')
					{
						// Tracking Tel Clicks
						eValues.telephone.label = arr[i].href.toLowerCase().split("tel:")[1];
						_tagLinks(arr[i], eValues.telephone.category , eValues.telephone.action, eValues.telephone.label, eValues.telephone.value, eValues.telephone.nonInteraction, mDownAtt);
					}
					if(linkType === 'url')
					{
						if(_isDownload(arr[i].href))
						{
							// Tracking Outbound Downloads - doc, xls, pdf, exe, zip
							_setDownloadData(arr[i].href, doname);
							_tagLinks(arr[i], eValues.outbound_downloads.category, eValues.outbound_downloads.action, eValues.outbound_downloads.label, eValues.outbound_downloads.value, eValues.outbound_downloads.nonInteraction, mDownAtt);
						}
						else if(_isSocial(arr[i].href))
						{
							// Tracking Social Follow Links
							eValues.social.label = arr[i].href.toLowerCase().replace('www.', '').split("//")[1];
							eValues.social.action = eValues.social.label.split(".")[0];
							_tagLinks(arr[i], eValues.social.category, eValues.social.action, eValues.social.label, eValues.social.value, eValues.social.nonInteraction, mDownAtt);
						}
						else
						{
							// Tracking outbound links off site
							eValues.outbounds.label = arr[i].href.toLowerCase().replace('www.', '').split("//")[1];
							_tagLinks(arr[i], eValues.outbounds.category, eValues.outbounds.action, eValues.outbounds.label, eValues.outbounds.value, eValues.outbounds.nonInteraction, mDownAtt);
						}
					}
				}
			}
			else
			{
				if(linkType === 'mail')
				{
					// Tracking whitelist email clicks
					eValues.email.label = arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i);
					_tagLinks(arr[i], eValues.email.category, eValues.email.action, eValues.email.label, eValues.email.value, eValues.email.nonInteraction, mDownAtt);
				}
				else if(linkType === 'url')
				{

					if(folders_to_track == '' || _isInternalFolder(arr[i].href))
					{
						if(_isDownload(arr[i].href))
						{
							// Tracking Whitelist Downloads - doc, xls, pdf, exe, zip
							_setDownloadData(arr[i].href, doname);
							_tagLinks(arr[i], eValues.downloads.category, eValues.downloads.action, eValues.downloads.label, eValues.downloads.value, eValues.downloads.nonInteraction, mDownAtt);
						}
						else
						{
							//Auto-Linker
						}
					}
					else
					{
						if(_isDownload(arr[i].href))
						{
							// Tracking Downloads - doc, xls, pdf, exe, zip
							_setDownloadData(arr[i].href, doname);
							_tagLinks(arr[i], eValues.outbound_downloads.category, eValues.outbound_downloads.action, eValues.outbound_downloads.label, eValues.outbound_downloads.value, eValues.outbound_downloads.nonInteraction, mDownAtt);
						}
						else
						{
							// Tracking outbound links off site
							eValues.outbounds.label = arr[i].href.replace('www.', '').split("//")[1];
							_tagLinks(arr[i], eValues.outbounds.category, eValues.outbounds.action, eValues.outbounds.label, eValues.outbounds.value, eValues.outbounds.nonInteraction, mDownAtt);
						}
					}
				}
			}
		}
	}
}

function _isSocial(ahref) {
	if( socSites != '')
	{
		if(ahref.toLowerCase().replace(/[+#]/,'').match(new RegExp("^(.*)(" + socSites.toLowerCase() + ")(.*)$")) != null) {
			return true;
		}
		else {
			return false;
			}
	}
	else
	{
		return false;
		}
}

function _isInternalFolder(ahref) {
	if( folders_to_track != '')
	{
		if(ahref.toLowerCase().match(new RegExp("^(.*)(" + folders_to_track + ")(.*)$")) != null) {
		return true;
		}
		else {
		return false;
		}
	}
	else {
		return false;
	}
}


function _isDownload(ahref) {
var dFlag = 0;
for(var j = 0; j < extDoc.length; j++)
	{
		var arExt = ahref.split(".");
		var ext = arExt[arExt.length-1].split(/[#?&?]/);
		if("."+ext[0].toLowerCase() == extDoc[j])
		{
			return true;
			break;
		}
		else
		{
			dFlag++;
			if(dFlag == extDoc.length)
			{
				return false;
			}
		}

	}
}

function _setDownloadData(ahref, domain) {
	var arExt = ahref.toLowerCase().split(".");
	var ext = arExt[arExt.length-1].split(/[#?&?]/);
	var fullPath = ahref.toLowerCase().split(domain);
	var path = fullPath[1].split(/[#?&?]/);
	eValues.downloads.action = eValues.outbound_downloads.action = ext;
	eValues.downloads.label = eValues.outbound_downloads.label = path;
}

function _tagLinks(evObj, evCat, evAct, evLbl, evVal, evNonInter, exisAttr)
{
	if(isGTM)
	{
		evObj.setAttribute("onmousedown",""+((exisAttr != null) ? exisAttr + '; ' : '')+"dataLayer.push({'event': 'eventTracker', 'eventCat': '"+evCat+"', 'eventAct':'"+evAct+"', 'eventLbl': '"+evLbl+"', 'eventVal': "+evVal+", 'nonInteraction': "+evNonInter+"});");

	}
	else
	{
		if(!isLegacy)
		{
			evObj.setAttribute("onmousedown",""+((exisAttr != null) ? exisAttr + '; ' : '')+"ga('send', 'event', '"+evCat+"', '"+evAct+"', '"+evLbl+"', "+evVal+", {nonInteraction:("+evNonInter+" == 0) ? false : true});");
		}
		else
		{
			evObj.setAttribute("onmousedown",""+((exisAttr != null) ? exisAttr + '; ' : '')+"_gaq.push(['_trackEvent', '"+evCat+"', '"+evAct+"', '"+evLbl+"', "+evVal+", "+evNonInter+"]); _gaq.push(['b._trackEvent', '"+evCat+"', '"+evAct+"', '"+evLbl+"', "+evVal+", "+evNonInter+"]);");
		}
	}
}

// cookie for alert banners

jQuery( document ).ready( function() {

	//alert(GetCookie("dismissed-notifications"));
	//hide dismissed notifications
	if ( GetCookie( 'dismissed-notifications' ) ) {
		jQuery( GetCookie( 'dismissed-notifications' ) ).hide();
	}
	jQuery( '.close' ).click( function() {
		var alertId = jQuery( this ).closest( '.alert' ).attr( 'id' ); //get the id of the notification to be dismissed
		var dismissedNotifications = GetCookie( 'dismissed-notifications' ) + ',#' + alertId; //this is the new value of the dismissed notifications cookie with the array of ids
		jQuery( this ).closest( '.alert-message' ).fadeOut( 'slow' ); //dimsiss notification
		SetCookie( 'dismissed-notifications', dismissedNotifications.replace( 'null,', '' ) ); //update cookie
	});


	// Create a cookie with the specified name and value.
	function SetCookie( sName, sValue ) {
	  document.cookie = sName + '=' + escape( sValue );

	  // Expires the cookie in one month
	  var date = new Date();
	  date.setMonth( date.getMonth() + 1 );
	  document.cookie += ( '; expires=' + date.toUTCString() );
	}


	// Retrieve the value of the cookie with the specified name.
	function GetCookie( sName ) {

	  // cookies are separated by semicolons
	  var aCookie = document.cookie.split( '; ' );
	  for ( var i = 0; i < aCookie.length; i++ ) {

	    // a name/value pair (a crumb) is separated by an equal sign
	    var aCrumb = aCookie[i].split( '=' );
	    if ( sName == aCrumb[0])
	      {return unescape(aCrumb[1]);}
	  }

	  // a cookie with the requested name does not exist
	  return null;
	}


});



$( document ).ready( function() {

	// Requires fancyBox v2.1.5
	// Enable lightbox functionality
	$( '.gallery .et_pb_module .et_pb_module_inner .item a.gallery-item, .carousel-gallery .item a, a.gallery-item' ).fancybox({groupAttr: 'data-gallery'});

	//   EQ Heights for Gallery Items
	$( '.gallery' ).eqHeight( '.item' );

	// Trick eqHeights into running as tabs are focused so image galleries in tabs get height applied.
	// eqHeight plugin would not run using normal selection methods. Triggering resize event to trick eqHeight to run on tab focus
	$( 'a[data-toggle="tab"]' ).on( 'shown.bs.tab', function( e ) {
		window.dispatchEvent( new Event( 'resize' ) );
	});
});

// Last update 8/5/2019 @ 3:20pm
$ = jQuery.noConflict();

jQuery( document ).ready( function() {

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
    Divi Tab Module Accessibility
    Retrieve all Divi Tab Modules
    */
	var tab_modules = $( 'div' ).filter( function() {
		return this.className.match( /\bet_pb_tabs_\d\b/ );
	});

	/*
    Divi Image Module (Standard & Fullwidth) Accessibility
    Retrieve all Divi Image Modules
    */
	var image_modules = $( 'div' ).filter( function() {
		return this.className.match( /\bet_pb_image_\d\b|\bet_pb_fullwidth_image_\d\b/ );
	});

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
    Divi Accessibility Plugin Adds a "Skip to Main Content" anchor tag
    Retrieve all a[href="#main-content"]
   */
	var main_content_anchors = $( 'a[href="#main-content"]' );

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

	// Run only if there is a Tab Module on the current page
	if ( tab_modules.length ) {
		tab_modules.each( function( index, element ) {

			// Grab each tab control list
			var tab_list =  $( element ).find( 'ul.et_pb_tabs_controls' );
			var lis = $( tab_list ).find( 'li' );

			tab_list.each( function( i ) {
				var t =  $( tab_list[i]);

				// Lowercase the Tab Control Role
				t.attr( 'role', t.attr( 'role' ).toLowerCase() );

				// Grab each tab control
				var tabs =  $( element ).find( 'a' );
				tabs.each( function( t ) {
					var tab = $( tabs[t]);
					tab.attr( 'tabindex', 0 );

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

	// Run only if there is a Image Module on the current pageI m
	if ( image_modules.length ) {
		var imgs = [];

		image_modules.each( function( index, element ) {

			// Grab each img control
			var img =  $( element ).find( 'img' );

			if ( ! img.attr( 'alt' ) ) {
				imgs[index] = img.attr( 'src' );
			}

		});
		var data = {
			'action': 'caweb_attachment_post_meta',
			'imgs': imgs
		};

		// calling localized script to get post name image is attached to
		jQuery.post( accessibleargs.ajaxurl, data, function( response ) {
			var alts = jQuery.parseJSON( response );

			imgs.forEach( function( element, index ) {

				// Grab each img control
				var img =  $( image_modules[index]).find( 'img' );
				img.attr( 'alt', alts[index]);
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

	// Run only if there is more than 1 a[href="#main-content"] on the current page
	if ( 1 < main_content_anchors.length  ) {
		main_content_anchors.each( function( index, element ) {

			// Remove all anchors not in the header
			if ( ! $( $( element ).parent().parent() ).is( 'header' ) ) {
$( element ).remove();
			}

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

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', args.ca_google_analytic_id]); // Step 4: your google analytics profile code, either from your own google account, or contact eServices to have one set up for you
_gaq.push(['_gat._anonymizeIp']);
_gaq.push(['_setDomainName', '.ca.gov']);
_gaq.push(['_trackPageview']);

_gaq.push(['b._setAccount', 'UA-3419582-2']); // statewide analytics - do not remove or change
_gaq.push(['b._setDomainName', '.ca.gov']);
_gaq.push(['b._trackPageview']);

if("" !== args.caweb_multi_ga){
  _gaq.push(['b._setAccount', args.caweb_multi_ga]); // CAWeb Multisite analytics - do not remove or change
  _gaq.push(['b._setDomainName', '.ca.gov']);
  _gaq.push(['b._trackPageview']);
}
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' :
    'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

// Google Custom Search
(function() {

	window.__gcse = {
    callback: myCallback
  };

  function myCallback() {
		var $searchContainer = $("#head-search");
		var $searchText = $searchContainer.find(".gsc-input");
		var $resultsContainer = $('.search-results-container');
		var $body = $("body");

			// Helpers
		function addSearchResults() {
			$body.addClass("active-search");
			$searchContainer.addClass('active');
			$resultsContainer.addClass('visible');
			// close the the menu when we are search
			$('#navigation').addClass('mobile-closed');
			// fire a scroll event to help update headers if need be
			$(window).scroll();

			$.event.trigger('cagov.searchresults.show');
		}

		function removeSearchResults() {
			$body.removeClass("active-search");
			$searchContainer.removeClass('active');
			$resultsContainer.removeClass('visible');


			// fire a scroll event to help update headers if need be
			$(window).scroll();

			$.event.trigger('cagov.searchresults.hide');
		}

  }

  if("" !== args.ca_google_search_id){
    var cx = args.ca_google_search_id;
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script');
    s[s.length - 1].parentNode.insertBefore(gcse, s[s.length - 1]);
  }

})();
  /* Google Translate */
if( args.ca_google_trans_enabled ){
  function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en', gaTrack: true, autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.VERTICAL}, 'google_translate_element');
  }
  var gtrans = document.createElement('script');
	gtrans.type = 'text/javascript';
  gtrans.async = true;
  gtrans.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  var s = document.getElementsByTagName('script');
  s[s.length - 1].parentNode.insertBefore(gtrans, s[s.length - 1]);
}

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

});
