
jQuery(document).ready(function () { var allowed_languages = ["af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-CN", "zh-TW", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"]; var accept_language = navigator.language.toLowerCase() || navigator.userLanguage.toLowerCase(); switch (accept_language) { case 'zh-cn': var preferred_language = 'zh-CN'; break; case 'zh': var preferred_language = 'zh-CN'; break; case 'zh-tw': var preferred_language = 'zh-TW'; break; case 'zh-hk': var preferred_language = 'zh-TW'; break; default: var preferred_language = accept_language.substr(0, 2); break; }if (preferred_language != 'en' && GTranslateGetCurrentLang() == null && document.cookie.match('gt_auto_switch') == null && allowed_languages.indexOf(preferred_language) >= 0) { doGTranslate('en|' + preferred_language); document.cookie = 'gt_auto_switch=1; expires=Thu, 05 Dec 2030 08:08:08 UTC; path=/;'; var lang_html = jQuery('div.switcher div.option').find('img[alt="' + preferred_language + '"]').parent().html(); if (typeof lang_html != 'undefined') jQuery('div.switcher div.selected a').html(lang_html.replace('data-gt-lazy-', '')); } });
function GTranslateGetCurrentLang() { var keyValue = document['cookie'].match('(^|;) ?googtrans=([^;]*)(;|$)'); return keyValue ? keyValue[2].split('/')[2] : null; }
function GTranslateFireEvent(element, event) { try { if (document.createEventObject) { var evt = document.createEventObject(); element.fireEvent('on' + event, evt) } else { var evt = document.createEvent('HTMLEvents'); evt.initEvent(event, true, true); element.dispatchEvent(evt) } } catch (e) { } }

function doGTranslate(lang_pair) {
    if (lang_pair.value) lang_pair = lang_pair.value;
    if (lang_pair == '') return;
    var lang = lang_pair.split('|')[1];
    if (GTranslateGetCurrentLang() == null && lang == lang_pair.split('|')[0]) return;
    var teCombo;
    var sel = document.getElementsByTagName('select');
    for (var i = 0; i < sel.length; i++){
        console.log(sel[i].value)
        if (/goog-te-combo/.test(sel[i].className)) {
            teCombo = sel[i]; break;
        }
    }
    if (document.getElementById('google_translate_element2') == null || document.getElementById('google_translate_element2').innerHTML.length == 0 || teCombo.length == 0 || teCombo.innerHTML.length == 0) { setTimeout(function () { doGTranslate(lang_pair) }, 500) } else { teCombo.value = lang; GTranslateFireEvent(teCombo, 'change'); GTranslateFireEvent(teCombo, 'change') }
}
if (GTranslateGetCurrentLang() != null) jQuery(document).ready(function () { var lang_html = jQuery('div.switcher div.option').find('img[alt="' + GTranslateGetCurrentLang() + '"]').parent().html(); if (typeof lang_html != 'undefined') jQuery('div.switcher div.selected a').html(lang_html.replace('data-gt-lazy-', '')); });

jQuery('.switcher .selected').click(function () { jQuery('.switcher .option a img').each(function () { if (!jQuery(this)[0].hasAttribute('src')) jQuery(this).attr('src', jQuery(this).attr('data-gt-lazy-src')) }); if (!(jQuery('.switcher .option').is(':visible'))) { jQuery('.switcher .option').stop(true, true).delay(100).slideDown(500); jQuery('.switcher .selected a').toggleClass('open') } });
jQuery('.switcher .option').bind('mousewheel', function (e) { var options = jQuery('.switcher .option'); if (options.is(':visible')) options.scrollTop(options.scrollTop() - e.originalEvent.wheelDelta); return false; });
jQuery('body').not('.switcher').click(function (e) { if (jQuery('.switcher .option').is(':visible') && e.target != jQuery('.switcher .option').get(0)) { jQuery('.switcher .option').stop(true, true).delay(100).slideUp(500); jQuery('.switcher .selected a').toggleClass('open') } });
function googleTranslateElementInit2() { new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element2'); }
