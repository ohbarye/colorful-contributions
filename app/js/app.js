(function() {
  var toHexRGB;

  $(function() {
    var url;
    url = location.href;
    if (location.href.match(/.*:\/\/github.com\/.*\/.+/)) {
      return;
    }
    return chrome.storage.local.get('colorSchemes', function(items) {
      var scheme, values;
      if (Object.keys(items).length === 0) {
        return;
      }
      scheme = items.colorSchemes.ocean;
      values = Object.keys(scheme).map(function(key) {
        return scheme[key];
      });
      return $.each(values, function(i, val) {
        var defaultColor, defaultColorDefinition;
        defaultColorDefinition = $(".legend li:nth-child(" + (i + 1) + ")");
        defaultColor = toHexRGB(defaultColorDefinition.css('background-color'));
        $("rect[fill=" + defaultColor + "], rect[fill=" + (defaultColor.toUpperCase()) + "]").attr('fill', val);
        return defaultColorDefinition.css('background-color', val);
      });
    });
  });

  toHexRGB = function(rgb) {
    return "#" + rgb.toString().match(/\d+/g).map(function(t) {
      return ("0" + (t | 0).toString(16)).substr(-2);
    }).join("");
  };

}).call(this);
