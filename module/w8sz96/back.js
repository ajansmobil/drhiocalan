var backhtml = "";
var index = 0;
for (var iterator of json.data) {
  var name = iterator["name"] || "Sosyal Medya";
  
  var ext = iterator["externalUrl"] != null ? String(iterator["externalUrl"]).trim() : "";
  if (ext) {
    backhtml +=
      '<a href="' +
      ext.replace(/"/g, "&quot;") +
      '" target="_blank" rel="noopener noreferrer" style="text-decoration: none; cursor: pointer;" aria-label="' +
      String(name).replace(/"/g, "&quot;") +
      '">' +
      '<img src="' +
      String(iterator["img"]).replace(/"/g, "&quot;") +
      '" alt="' +
      String(name).replace(/"/g, "&quot;") +
      '" class="modulex-media" loading="lazy" /></a>';
  } else {
    backhtml +=
      '<span class="modulex-media-wrap" style="opacity:0.45;display:inline-block;" title="' +
      String(name).replace(/"/g, "&quot;") +
      ' (URL eklenecek)" aria-hidden="true">' +
      '<img src="' +
      String(iterator["img"]).replace(/"/g, "&quot;") +
      '" alt="" class="modulex-media" loading="lazy" /></span>';
  }
  index++;
}
html = html.replace(new RegExp("{{html}}", "g"), backhtml);
