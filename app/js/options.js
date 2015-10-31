(function() {
  var _gaq, colorSchemes, config, ga, initialData, loadDataFromStorage, ocean, s, save, selectedScheme, slacker, spooky, volcano;

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
        if (confirm('Are you sure you want this configuration to return to the state at the time of installation?')) {
          loadDataFromStorage();
          $('input.original').val('#000000');
          return alert('Your configuration has been reset.');
        }
      });
    });
  });

  colorSchemes = 'colorSchemes';

  selectedScheme = 'selectedScheme';

  config = {};

  loadDataFromStorage = function() {
    return chrome.storage.local.get([colorSchemes, selectedScheme], function(items) {
      if (Object.keys(items).length === 0) {
        items.colorSchemes = initialData;
        items.selectedScheme = 'default';
      }
      $.each(items.colorSchemes, function(name, data) {
        var colorScheme, level, results, rgb;
        colorScheme = name;
        results = [];
        for (level in data) {
          rgb = data[level];
          results.push($("." + colorScheme + "." + level).val(rgb));
        }
        return results;
      });
      return $("input:radio[name='scheme']").val([items.selectedScheme]);
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
    config.selectedScheme = $("input:radio[name='scheme']:checked").val();
    return chrome.storage.local.set(config, function() {
      return alert("Your configuration has been changed successfully!");
    });
  };

  ocean = {
    level5: '#004FBF',
    level4: '#477ECD',
    level3: '#8EAEDB',
    level2: '#BECEE4',
    level1: '#EEEEEE'
  };

  volcano = {
    level5: '#A8151B',
    level4: '#BD565A',
    level3: '#CB8184',
    level2: '#D9ACAE',
    level1: '#EEEEEE'
  };

  slacker = {
    level5: '#EEEEEE',
    level4: '#BCC5B3',
    level3: '#9BAB8D',
    level2: '#7A9066',
    level1: '#49682C'
  };

  spooky = {
    level5: '#03001C',
    level4: '#FE9600',
    level3: '#FFC501',
    level2: '#FFEE4A',
    level1: '#EEEEEE'
  };

  initialData = {
    spooky: spooky,
    ocean: ocean,
    volcano: volcano,
    slacker: slacker
  };

}).call(this);
