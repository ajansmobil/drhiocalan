try {
  var wxPublicSlug = function(it) {
    if (!it) return "";
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };

  var pagesettingjson = webmakerdata.pagesetting.data.find(
    function(item) { return item.modulestatus && item.modulestatus.page; },
  );
  
  var backhtml = `<li><a href="/${json.lang}/">@home@ </a></li>`;
  if (pagesettingjson) {
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
      if (iterator.status == "play" && iterator.category == "") {
        if (wxPublicSlug(page) == wxPublicSlug(iterator)) {
          backhtml += `<li><a class="modulex-menu-list-active" aria-current="page" href="/${
            json.lang
          }/${wxPublicSlug(iterator)}/">${iterator.name[json.lang]}</a></li>`;
        } else {
          backhtml += `<li><a href="/${json.lang}/${wxPublicSlug(iterator)}/">${
            iterator.name[json.lang]
          }</a></li>`;
        }
      }
    }
    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
  }
  langhtml = "";
  var langCount = 0;
  var currentPagePath = wxPublicSlug(page);
  for (var key in webmakerdata.setting.langs) {
    if (webmakerdata.setting.langs[key] == true) {
      langCount++;
      var langUrl = (currentPagePath === "") ? `/${key}/` : `/${key}/${currentPagePath}/`;
      
      var isActiveLang = String(key).toLowerCase() === String(json.lang).toLowerCase();
      var activeAttr = isActiveLang ? ' class="modulex-lang-link-active" aria-current="page"' : "";
      var labelUpper = String(key).toUpperCase();
      langhtml +=
        `<li><a href="${langUrl}"${activeAttr} title="${labelUpper}" aria-label="${labelUpper}">` +
        `<img class="modulex-lang-flag" width="28" height="28" src="/src/lang/${key}.png" alt="" loading="lazy">` +
        `</a></li>`;
    }
  }
  if (langCount <= 1) {
    langhtml = "";
  }
  html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
} catch (error) {
  console.log(error);
}
