
var d = json.desing || {};
var channelUrl = d.channelUrl ? String(d.channelUrl) : "";
var bandTitle = d.bandTitle ? String(d.bandTitle) : "YouTube";
var safeTitle = bandTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;");
var buttonVal = d.button != null ? String(d.button) : "true";
var ids = [];
if (Array.isArray(d.videoIds)) {
  for (var i = 0; i < d.videoIds.length; i++) {
    var raw = d.videoIds[i];
    var vid = raw != null ? String(raw).trim() : "";
    if (/^[a-zA-Z0-9_-]{11}$/.test(vid)) {
      ids.push(vid);
    }
  }
}
var channelHtml = "";
if (channelUrl) {
  channelHtml =
    '<div class="ytb4ndmodulexchannel"><a href="' +
    channelUrl.replace(/"/g, "&quot;") +
    '" target="_blank" rel="noopener noreferrer">YouTube kanalı →</a></div>';
}
var backhtml = "";
for (var j = 0; j < ids.length; j++) {
  var id = ids[j];

  var src =
    "https://www.youtube-nocookie.com/embed/" +
    id +
    "?rel=0&modestbranding=1&enablejsapi=1";
  backhtml +=
    '<div class="swiper-slide">' +
    '<div class="ytb4nd-frame">' +
    '<iframe src="' +
    src +
    '" title="' +
    safeTitle +
    " — " +
    (j + 1) +
    "/" +
    ids.length +
    '"' +
    ' loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
    "</div></div>";
}
if (backhtml === "" && channelUrl) {
  backhtml =
    '<div class="swiper-slide"><div class="ytb4nd-frame" style="display:flex;align-items:center;justify-content:center;padding:1.5rem;text-align:center;color:inherit;">' +
    '<p style="margin:0;opacity:0.9;">Video listesi için <code>desing.videoIds</code> ekleyin. <a style="display:inline-flex;margin-top:0.75rem;padding:0.5rem 1rem;border-radius:8px;background:var(--color-primary,#0F766E);color:#fff;text-decoration:none;cursor:pointer;" href="' +
    channelUrl.replace(/"/g, "&quot;") +
    '" target="_blank" rel="noopener noreferrer">Kanalı aç</a></p></div></div>';
}

if (backhtml === "" && !channelUrl) {
  backhtml =
    '<div class="swiper-slide"><div class="ytb4nd-frame" style="display:flex;align-items:center;justify-content:center;padding:1.5rem;text-align:center;color:inherit;">' +
    '<p style="margin:0;opacity:0.9;">YouTube videoları yakında eklenecek. <code>modules.json</code> içinde <code>ytb4nd.desing.channelUrl</code> ve <code>videoIds</code> alanlarını doldurun.</p></div></div>';
}

var loopOn = ids.length > 1 ? "true" : "false";
html = html.replace(new RegExp("__YT_LOOP__", "g"), loopOn);
html = html.replace(new RegExp("__YT_AUTOPLAY__", "g"), "false");
html = html.replace(new RegExp("{{name}}", "g"), safeTitle);
html = html.replace(new RegExp("{{channel_html}}", "g"), channelHtml);
html = html.replace(new RegExp("{{html}}", "g"), backhtml);
html = html.replace(new RegExp("{{button}}", "g"), buttonVal);
