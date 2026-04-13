var backhtml = "";
var count = 0;
var index = 0;


var ctaLabel = "Detaylı bilgi";
if (json.desing && json.desing.ctaLabel) {
  if (
    typeof json.desing.ctaLabel === "object" &&
    json.lang &&
    json.desing.ctaLabel[json.lang]
  ) {
    ctaLabel = json.desing.ctaLabel[json.lang];
  } else if (typeof json.desing.ctaLabel === "string") {
    ctaLabel = json.desing.ctaLabel;
  }
}


var safeTitle = function(item) {
  try {
    if (item.name && item.name[json.lang]) {
      return String(item.name[json.lang]).replace(/"/g, "&quot;");
    }
    if (item.name && item.name.tr) {
      return String(item.name.tr).replace(/"/g, "&quot;");
    }
  } catch (e) { }
  return "";
};

for (var iterator of webmakerdata[json.desing.page].data) {
  if (json.desing.max) {
    if (count >= json.desing.max) break;
  }
  try {
    if (
      iterator["status"] == "play" &&
      iterator["category"] == json.desing.category
    ) {
      var iteratorurl = "";
      if (iterator["url"] !== "" && iterator["url"] !== undefined) {
        iteratorurl = iterator["url"];
      } else {
        iteratorurl = `/${json.lang}/${iterator["path"]}/`;
      }

      var titleAttr = safeTitle(iterator);

      var description = "";
      if (iterator["description"] && iterator["description"][json.lang]) {
        description =
          '<div class="modulexbodyitemdesc">' +
          iterator["description"][json.lang] +
          "</div>";
      }

      
      var ctaBlock =
        '<span class="modulexbodyitemcta">' +
        '<span class="modulexbodyitemcta-text">' +
        ctaLabel +
        "</span>" +
        '<span class="modulexbodyitemcta-arrow" aria-hidden="true">→</span>' +
        "</span>";

      var alignment = index % 2 === 0 ? "left" : "right";
      var animationDelay = index * 0.12;

      
      if (alignment === "left") {
        backhtml +=
          '<div class="modulexbodyitem ' +
          alignment +
          '" style="transition-delay: ' +
          animationDelay +
          's;">' +
          '<a href="' +
          iteratorurl +
          '" class="modulexbodyitemlink" title="' +
          titleAttr +
          '">' +
          '<div class="modulexbodyitemimg">' +
          '<img alt="' +
          titleAttr +
          '" src="/page/' +
          iterator["id"] +
          "/" +
          iterator["img"] +
          '">' +
          "</div>" +
          '<div class="modulexbodyitemcontent">' +
          '<div class="modulexbodyitemtitle">' +
          iterator["name"][json.lang] +
          "</div>" +
          description +
          ctaBlock +
          "</div>" +
          "</a>" +
          "</div>";
      } else {
        backhtml +=
          '<div class="modulexbodyitem ' +
          alignment +
          '" style="transition-delay: ' +
          animationDelay +
          's;">' +
          '<a href="' +
          iteratorurl +
          '" class="modulexbodyitemlink" title="' +
          titleAttr +
          '">' +
          '<div class="modulexbodyitemcontent">' +
          '<div class="modulexbodyitemtitle">' +
          iterator["name"][json.lang] +
          "</div>" +
          description +
          ctaBlock +
          "</div>" +
          '<div class="modulexbodyitemimg">' +
          '<img alt="' +
          titleAttr +
          '" src="/page/' +
          iterator["id"] +
          "/" +
          iterator["img"] +
          '">' +
          "</div>" +
          "</a>" +
          "</div>";
      }

      count++;
      index++;
    }
  } catch (error) { }
}
html = html.replace(new RegExp("{{html}}", "g"), backhtml);
