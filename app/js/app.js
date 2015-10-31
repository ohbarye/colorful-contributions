(function() {
  var toHexRGB;

  $(function() {
    return chrome.storage.local.get('colorSchemes', function(items) {
      var scheme, values;
      if (Object.keys(items).length === 0) {
        return;
      }
      scheme = items.colorSchemes[1];
      values = Object.keys(scheme.data).map(function(key) {
        return scheme.data[key];
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
