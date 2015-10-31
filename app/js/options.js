(function() {
  var _gaq, colorSchemes, config, ga, initialData, loadDataFromStorage, ocean, s, save, spooky;

  _gaq = _gaq || [];

  _gaq.push(['_setAccount', 'UA-58056432-4']);

  _gaq.push(['_trackPageview']);

  ga = document.createElement('script');

  ga.type = 'text/javascript';

  ga.async = true;

  ga.src = 'https://ssl.google-analytics.com/ga.js';

  s = document.getElementsByTagName('script')[0];

  s.parentNode.insertBefore(ga, s);

  $(function() {
    loadDataFromStorage();
    $('#save').click(function(e) {
      e.preventDefault();
      return save();
    });
    return $('#reset').click(function(e) {
      e.preventDefault();
      return chrome.storage.local.clear(function() {
        loadDataFromStorage();
        return alert('reset');
      });
    });
  });

  colorSchemes = 'colorSchemes';

  config = {};

  loadDataFromStorage = function() {
    return chrome.storage.local.get(colorSchemes, function(items) {
      if (Object.keys(items).length === 0) {
        items.colorSchemes = initialData;
      }
      return $.each(items.colorSchemes, function(name, data) {
        var colorScheme, level, results, rgb;
        colorScheme = name;
        results = [];
        for (level in data) {
          rgb = data[level];
          results.push($("." + colorScheme + "." + level).val(rgb));
        }
        return results;
      });
    });
  };

  save = function() {
    config.colorSchemes = {};
    $('.color-scheme').each(function(index, element) {
      var scheme;
      scheme = $(element);
      return config[colorSchemes][element.id] = {
        level5: scheme.find('input.level5').val(),
        level4: scheme.find('input.level4').val(),
        level3: scheme.find('input.level3').val(),
        level2: scheme.find('input.level2').val(),
        level1: scheme.find('input.level1').val()
      };
    });
    return chrome.storage.local.set(config, function() {
      return alert("success");
    });
  };

  spooky = {
    level5: '#03001C',
    level4: '#FE9600',
    level3: '#FFC501',
    level2: '#FFEE4A',
    level1: '#EEEEEE'
  };

  ocean = {
    level5: '#004FBF',
    level4: '#477ECD',
    level3: '#8EAEDB',
    level2: '#BECEE4',
    level1: '#EEEEEE'
  };

  initialData = {
    spooky: spooky,
    ocean: ocean
  };

}).call(this);
