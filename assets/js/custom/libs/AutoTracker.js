var domains_to_track=["ca.gov"],folders_to_track="",extDoc=".doc .docx .xls .xlsx .xlsm .ppt .pptx .exe .zip .pdf .js .txt .csv".split(" "),socSites="flickr.com/groups/californiagovernment|twitter.com/cagovernment|pinterest.com/cagovernment|youtube.com/user/californiagovernment",isSubDomainTracker=!1,isSeparateDomainTracker=!1,isGTM=!1,isLegacy=!0,eValues={downloads:{category:"Downloads",action:"Download",label:"",value:0,nonInteraction:0},outbound_downloads:{category:"Outbound Downloads",action:"Download",
label:"",value:0,nonInteraction:0},outbounds:{category:"Outbound Links",action:"Click",label:"",value:0,nonInteraction:0},email:{category:"Email Clicks",action:"Click",label:"",value:0,nonInteraction:0},outbound_email:{category:"Outbound Email Clicks",action:"Click",label:"",value:0,nonInteraction:0},telephone:{category:"Telephone Clicks",action:"Click",label:"",value:0,nonInteraction:0},social:{category:"Social Profiles",action:"Click",label:"",value:0,nonInteraction:0}},mainDomain=document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
mainDomain=mainDomain.toLowerCase();1==isSubDomainTracker&&(mainDomain=document.location.hostname.replace("www.","").toLowerCase());var arr=document.getElementsByTagName("a");
for(i=0;i<arr.length;i++){var flag=0,mDownAtt=arr[i].getAttribute("onmousedown"),doname="",linkType="",mailPattern=/^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,urlPattern=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,telPattern=/^tel:(.*)([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i;if(mailPattern.test(arr[i].href)||urlPattern.test(arr[i].href)||telPattern.test(arr[i].href)){try{!urlPattern.test(arr[i].href)||mailPattern.test(arr[i].href)||telPattern.test(arr[i].href)?
!mailPattern.test(arr[i].href)||telPattern.test(arr[i].href)||urlPattern.test(arr[i].href)?!telPattern.test(arr[i].href)||urlPattern.test(arr[i].href)||mailPattern.test(arr[i].href)||(doname=arr[i].href.toLowerCase(),linkType="tel"):(doname=arr[i].href.toLowerCase().split("@")[1],linkType="mail"):(doname=arr[i].hostname.toLowerCase().replace("www.",""),linkType="url")}catch(a){continue}if(null!=mDownAtt&&(mDownAtt=String(mDownAtt),-1<mDownAtt.indexOf("dataLayer.push")||-1<mDownAtt.indexOf("('send'")))continue;
var condition=!1;if(condition=isSeparateDomainTracker?doname==mainDomain:-1!=doname.indexOf(mainDomain))"mail"===linkType?(eValues.email.label=arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i),_tagLinks(arr[i],eValues.email.category,eValues.email.action,eValues.email.label,eValues.email.value,eValues.email.nonInteraction,mDownAtt)):"url"===linkType&&(""==folders_to_track||_isInternalFolder(arr[i].href)?_isDownload(arr[i].href)&&(_setDownloadData(arr[i].href,doname),
_tagLinks(arr[i],eValues.downloads.category,eValues.downloads.action,eValues.downloads.label,eValues.downloads.value,eValues.downloads.nonInteraction,mDownAtt)):_isDownload(arr[i].href)?(_setDownloadData(arr[i].href,doname),_tagLinks(arr[i],eValues.outbound_downloads.category,eValues.outbound_downloads.action,eValues.outbound_downloads.label,eValues.outbound_downloads.value,eValues.outbound_downloads.nonInteraction,mDownAtt)):(eValues.outbounds.label=arr[i].href.toLowerCase().replace("www.","").split("//")[1],
_tagLinks(arr[i],eValues.outbounds.category,eValues.outbounds.action,eValues.outbounds.label,eValues.outbounds.value,eValues.outbounds.nonInteraction,mDownAtt)));else for(var k=0;k<domains_to_track.length;k++){var condition1=!1;condition1=isSeparateDomainTracker?doname==domains_to_track[k]:-1!=doname.indexOf(domains_to_track[k]);condition1?"mail"===linkType?(eValues.email.label=arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i),_tagLinks(arr[i],eValues.email.category,
eValues.email.action,eValues.email.label,eValues.email.value,eValues.email.nonInteraction,mDownAtt)):"url"===linkType&&(""==folders_to_track||_isInternalFolder(arr[i].href)?_isDownload(arr[i].href)&&(_setDownloadData(arr[i].href,doname),_tagLinks(arr[i],eValues.downloads.category,eValues.downloads.action,eValues.downloads.label,eValues.downloads.value,eValues.downloads.nonInteraction,mDownAtt)):_isDownload(arr[i].href)?(_setDownloadData(arr[i].href,doname),_tagLinks(arr[i],eValues.outbound_downloads.category,
eValues.outbound_downloads.action,eValues.outbound_downloads.label,eValues.outbound_downloads.value,eValues.outbound_downloads.nonInteraction,mDownAtt)):(eValues.outbounds.label=arr[i].href.replace("www.","").split("//")[1],_tagLinks(arr[i],eValues.outbounds.category,eValues.outbounds.action,eValues.outbounds.label,eValues.outbounds.value,eValues.outbounds.nonInteraction,mDownAtt))):(flag++,flag==domains_to_track.length&&("mail"===linkType&&(eValues.outbound_email.label=arr[i].href.toLowerCase().match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/),
_tagLinks(arr[i],eValues.outbound_email.category,eValues.outbound_email.action,eValues.outbound_email.label,eValues.outbound_email.value,eValues.outbound_email.nonInteraction,mDownAtt)),"tel"===linkType&&(eValues.telephone.label=arr[i].href.toLowerCase().split("tel:")[1],_tagLinks(arr[i],eValues.telephone.category,eValues.telephone.action,eValues.telephone.label,eValues.telephone.value,eValues.telephone.nonInteraction,mDownAtt)),"url"===linkType&&(_isDownload(arr[i].href)?(_setDownloadData(arr[i].href,
doname),_tagLinks(arr[i],eValues.outbound_downloads.category,eValues.outbound_downloads.action,eValues.outbound_downloads.label,eValues.outbound_downloads.value,eValues.outbound_downloads.nonInteraction,mDownAtt)):_isSocial(arr[i].href)?(eValues.social.label=arr[i].href.toLowerCase().replace("www.","").split("//")[1],eValues.social.action=eValues.social.label.split(".")[0],_tagLinks(arr[i],eValues.social.category,eValues.social.action,eValues.social.label,eValues.social.value,eValues.social.nonInteraction,
mDownAtt)):(eValues.outbounds.label=arr[i].href.toLowerCase().replace("www.","").split("//")[1],_tagLinks(arr[i],eValues.outbounds.category,eValues.outbounds.action,eValues.outbounds.label,eValues.outbounds.value,eValues.outbounds.nonInteraction,mDownAtt)))))}}}function _isSocial(a){return""!=socSites?null!=a.toLowerCase().replace(/[+#]/,"").match(new RegExp("^(.*)("+socSites.toLowerCase()+")(.*)$"))?!0:!1:!1}
function _isInternalFolder(a){return""!=folders_to_track?null!=a.toLowerCase().match(new RegExp("^(.*)("+folders_to_track+")(.*)$"))?!0:!1:!1}function _isDownload(a){for(var c=0,b=0;b<extDoc.length;b++){var d=a.split(".");if("."+d[d.length-1].split(/[#?&?]/)[0].toLowerCase()==extDoc[b])return!0;c++;if(c==extDoc.length)return!1}}
function _setDownloadData(a,c){var b=a.toLowerCase().split(".");b=b[b.length-1].split(/[#?&?]/);var d=a.toLowerCase().split(c)[1].split(/[#?&?]/);eValues.downloads.action=eValues.outbound_downloads.action=b;eValues.downloads.label=eValues.outbound_downloads.label=d}
function _tagLinks(a,c,b,d,f,g,e){isGTM?a.setAttribute("onmousedown",(null!=e?e+"; ":"")+"dataLayer.push({'event': 'eventTracker', 'eventCat': '"+c+"', 'eventAct':'"+b+"', 'eventLbl': '"+d+"', 'eventVal': "+f+", 'nonInteraction': "+g+"});"):isLegacy?a.setAttribute("onmousedown",(null!=e?e+"; ":"")+"_gaq.push(['_trackEvent', '"+c+"', '"+b+"', '"+d+"', "+f+", "+g+"]); _gaq.push(['b._trackEvent', '"+c+"', '"+b+"', '"+d+"', "+f+", "+g+"]);"):a.setAttribute("onmousedown",(null!=e?e+"; ":"")+"ga('send', 'event', '"+
c+"', '"+b+"', '"+d+"', "+f+", {nonInteraction:("+g+" == 0) ? false : true});")};
