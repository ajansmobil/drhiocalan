
var finalHtml = "";
if (page["text"] != undefined && page["text"][json.lang]) {
  var rawText = page["text"][json.lang];
  var isHtml = typeof rawText === "string" && (rawText.trim().indexOf("<") === 0 || rawText.indexOf("<style") !== -1);
  if (isHtml) {
    finalHtml = rawText;
  } else {
    var lines = rawText.split("\n");
    var htmlContent = [];
    lines.forEach(function (line, index) {
      htmlContent.push("<p>" + line + "</p>");
    });
    var ulIndex = htmlContent.lastIndexOf("</li>");
    if (ulIndex !== -1) {
      htmlContent.splice(ulIndex + 1, 0, "</ul>");
    }
    finalHtml = htmlContent.join("\n");
  }
}
if (page["text"] != undefined) {
  html = html.replace(new RegExp("{{text}}", "g"), finalHtml);
} else {
  html = html.replace(new RegExp("{{text}}", "g"), "");
}


var descImgFile = "";
if (page["img"] != null && page["img"] !== undefined) {
  descImgFile = String(page["img"]).replace(/^\s+|\s+$/g, "");
}
var hasDescImage = descImgFile !== "";

if (hasDescImage) {
  var imgAlt = page["name"] && page["name"][json.lang] ? page["name"][json.lang] : (page["name"] || "");
  var safeAlt = String(imgAlt).replace(/"/g, "&quot;");
  var descimg =
    '<div class="modulex-desc-body">' +
    '<img src="/page/' +
    page["id"] +
    "/" +
    descImgFile +
    '?v={{random}}" width="100%" alt="' +
    safeAlt +
    '" loading="lazy" />' +
    "</div>";
  html = html.replace(new RegExp("{{descimg}}", "g"), descimg);
  html = html.replace(new RegExp("{{img}}", "g"), descImgFile);
} else {
  html = html.replace(new RegExp("{{descimg}}", "g"), "");
  html = html.replace(new RegExp("{{img}}", "g"), "");
}


var bgFile = "";
if (page["bgimg"] != null && page["bgimg"] !== undefined) {
  bgFile = String(page["bgimg"]).replace(/^\s+|\s+$/g, "");
}
if (bgFile !== "") {
  html = html.replace(
    /background-image:\s*none;\s*\/\*\s*modulex-title-bg-dyn\s*\*\//g,
    'background-image: url("/page/' + page["id"] + "/bg/" + bgFile + '"); ',
  );
}

var pageData =
  page.categorypage && webmakerdata[page.categorypage]
    ? webmakerdata[page.categorypage].data
    : [];
var getName = function(item) {
  if (!item) return "Başlık Yok";
  if (item.name) {
    if (typeof item.name === "object") {
      return (
        item.name[json.lang] ||
        item.name.tr ||
        Object.values(item.name)[0] ||
        "Başlık Yok"
      );
    }
    return item.name;
  }
  return "Başlık Yok";
};
var pageSlug = function(item) {
  if (!item || typeof item !== "object") return "";
  var n = item.pathnext;
  if (n != null && String(n).trim() !== "") return String(n).trim();
  return item.path != null ? String(item.path) : "";
};
var currentSlug = pageSlug(page);
var topCategories = pageData.filter(
  function(item) { return item["status"] == "play" && (!item["category"] || item["category"] === ""); }
);
var pagelist = "";
if (topCategories.length > 0) {
  topCategories.forEach(function(topItem) {
    var children = pageData.filter(
      function(child) { return child["status"] == "play" && child["category"] == topItem.id; }
    );
    var topActive = currentSlug === pageSlug(topItem);
    var childActive = children.some(function(child) { return pageSlug(child) === currentSlug; });
    if (children.length > 0) {
      var subHtml = "";
      subHtml += `<a class="modulex-sub-link${topActive ? " active" : ""}" href="/${json.lang}/${pageSlug(topItem)}/">${getName(
        topItem,
      )}</a>`;
      children.forEach(function(child) {
        var activeClass = pageSlug(child) === currentSlug ? " active" : "";
        subHtml += `<a class="modulex-sub-link${activeClass}" href="/${json.lang}/${pageSlug(child)}/">${getName(
          child,
        )}</a>`;
      });
      var expanded =
        topActive || childActive || page.category == topItem.id;
      pagelist += `
        <div class="modulex-menu-group${expanded ? " open" : ""}">
          <button type="button" class="modulex-top${expanded ? " active" : ""}">
            <div>${getName(topItem)}</div>
            <span class="material-symbols-outlined modulex-icon">expand_more</span>
          </button>
          <div class="modulex-sub${expanded ? " show" : ""}">
            ${subHtml}
          </div>
        </div>`;
    } else {
      pagelist += `<a class="modulex-menu-link${topActive ? " active" : ""}" href="/${json.lang}/${pageSlug(topItem)}/">${getName(
        topItem,
      )}</a>`;
    }
  });
} else {
  for (var iterator of pageData) {
    var activeClass = pageSlug(iterator) === currentSlug ? " active" : "";
    pagelist += `<a class="modulex-menu-link${activeClass}" href="/${json.lang}/${pageSlug(iterator)}/">${getName(
      iterator,
    )}</a>`;
  }
}

html = html.replace(new RegExp("{{pagelist}}", "g"), pagelist);
