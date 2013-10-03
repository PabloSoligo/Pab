function maximaLongitud(texto,maxlong){var tecla, int_value, out_value;if (texto.value.length > maxlong){in_value = texto.value;out_value = in_value.substring(0,maxlong);texto.value = out_value;return false;}return true;}
function trim(auxTxt){ini = /^ /;fin = / $/;txt = new String(auxTxt);while(txt.search(ini)!=-1){txt=txt.replace(ini,"");}while(txt.search(fin)!=-1){txt = txt.replace(fin,"");}return txt;}
function ltrim(cadena) {return cadena.replace(/^\s+/,"");}
function validarEmail(valor) {var valor1 = trim(valor);if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valor1)){return (true);} else {return (false);}}	
function inArray(needle, haystack) {var length = haystack.length;for(var i = 0; i < length; i++) {if(haystack[i] == needle) return true;}return false;}
function TamVentana() {var Tamanyo = [0, 0];if (typeof window.innerWidth != 'undefined'){Tamanyo = [window.innerWidth,window.innerHeight];}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){Tamanyo = [document.documentElement.clientWidth,document.documentElement.clientHeight];}else{Tamanyo = [document.getElementsByTagName('body')[0].clientWidth,document.getElementsByTagName('body')[0].clientHeight];}return Tamanyo;}
function loadScript(url, callback){var script = document.createElement("script");script.type = "text/javascript";if (script.readyState){script.onreadystatechange = function(){if (script.readyState == "loaded" || script.readyState == "complete"){script.onreadystatechange = null;callback();}};} else {script.onload = function(){callback();};}script.src = url;document.getElementsByTagName("head")[0].appendChild(script);}
function loadCss(url) {var link = document.createElement("link");link.type = "text/css";link.rel = "stylesheet";link.href = url;document.getElementsByTagName("head")[0].appendChild(link);}
function downloadURL(url, id, tipo) {var hiddenIFrameID = id,iframe = document.getElementById(hiddenIFrameID);if (iframe === null) {iframe = document.createElement('iframe');iframe.id = hiddenIFrameID;iframe.style.display = 'none';document.body.appendChild(iframe);}iframe.src = url;};
function getCookie(name){var cname = name + "=";var dc = document.cookie;if (dc.length > 0) {begin = dc.indexOf(cname);if (begin != -1) {begin += cname.length;end = dc.indexOf(";", begin);if (end == -1) end = dc.length;return unescape(dc.substring(begin, end));}}return null;}
function setCookie(name, value, expires, path, domain, secure) {document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : "; expires=" + expires.toGMTString()) + ((path == null) ? "" : "; path=" + path) + ((domain == null) ? "" : "; domain=" + domain) + ((secure == null) ? "" : "; secure");}
function delCookie (name,path,domain) {if (getCookie(name)) {document.cookie = name + "=" + ((path == null) ? "" : "; path=" + path) + ((domain == null) ? "" : "; domain=" + domain) + "; expires=Thu, 01-Jan-70 00:00:01 GMT";}}
function _trace(trace){var xhome = false;$.post("../common_php/registra_traceability.php", {trace:trace,home: xhome});}
function getInternetExplorerVersion(){var rv = 1000000;if (navigator.appName == 'Microsoft Internet Explorer') {var ua = navigator.userAgent;var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");if (re.exec(ua) != null){rv = parseFloat(RegExp.$1 );}}return rv;} var browser_ie_version=getInternetExplorerVersion();
/* ----------------------------------------------------------------------------------------
 * FUNCION PARA CREAR UN HTML EN UN DIV, CON FUNCIONALIDADES Y CSS
 * htmlVar => html que deseamos insertar
 * divVar => id del div donde queremos insertar el html (sin #)
 * cssLoadUrl => url donde se encuentra el css (ej. 'css/style.css')
 * jsLoadUrl => url donde se encuentra el js (ej. 'js/functions.js')
 * returnFx => funcion de respuesta ---> continua el hilo
 * ---------------------------------------------------------------------------------------- */
function createHtml(htmlVar, divVar, cssLoadUrl, jsLoadUrl, returnFx){var divEnd = divVar+'_end_create';var htmlVar_ = htmlVar+'<div id="'+divEnd+'" style="display:none;"></div>';if (cssLoadUrl!='') loadCss(cssLoadUrl);$("#"+divVar).append(htmlVar_);var creado = setInterval(function(){var detected = document.getElementById(divEnd);if (detected){clearInterval(creado);if (jsLoadUrl!=''){loadScript(jsLoadUrl, function(){returnFx();});}else{returnFx();}}},100);}
/* ----------------------------------------------------------------------------------------
 * FUNCION PARA LOS FANCY
 * ventana => id de la ventana que contiene la pagina (ej. fondo)
 * ventanas => array de ventanas que deben ajustarse (ej. ['fancy','fancy2'])
 * ---------------------------------------------------------------------------------------- */
function onResizeDocument(ventana,ventanas){var widthMin = $("#"+ventana).css('width');widthMin = widthMin.replace('px','');widthMin = parseInt(widthMin);widthMin = widthMin+0;var heightMin = $("body").css('height');heightMin = heightMin.replace('px','');heightMin = parseInt(heightMin);heightMin = heightMin+0;var Tam = TamVentana();var height_fancy = (heightMin<Tam[1])?Tam[1]:heightMin;var height_fancy_txt = height_fancy+'px';if (widthMin<Tam[0]){var width_fancy = Tam[0];if (Tam[0] != $("body").width()){var tamanoScroll = Tam[0] - ($("body").width());width_fancy = width_fancy - tamanoScroll;}}else{var width_fancy = widthMin;}var width_fancy_txt = width_fancy+'px';for (var z=0; z<ventanas.length; z++) {$("#"+ventanas[z]).css({'height':height_fancy_txt,'width':width_fancy_txt});}}