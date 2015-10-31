_gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-58056432-4']); _gaq.push(['_trackPageview'])
ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true
ga.src = 'https://ssl.google-analytics.com/ga.js'
s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s)

$ ->
  ###################
  # initialize
  ###################
  loadDataFromStorage()
  
  ###################
  # event handlers
  ###################
  $('#save').click (e) ->
    e.preventDefault()
    save()

  $('#reset').click (e) ->
    e.preventDefault()
    chrome.storage.local.clear ->
      if confirm 'Are you sure you want this configuration to return to the state at the time of installation?'
        loadDataFromStorage()
        $('input.original').val('#000000')
        alert('Your configuration has been reset.')


###################
# functions
###################
colorSchemes   = 'colorSchemes'
selectedScheme = 'selectedScheme'
config = {}

loadDataFromStorage = ->
  chrome.storage.local.get [colorSchemes, selectedScheme], (items) ->
    # If data is not prepared, seed data.
    if Object.keys(items).length == 0
      items.colorSchemes   = initialData
      items.selectedScheme = 'default'

    # set color scheme data to input form
    $.each items.colorSchemes, (name, data) ->
      colorScheme = name
      for level, rgb of data
        $(".#{colorScheme}.#{level}").val(rgb)

    # set selected scheme
    $("input:radio[name='scheme']").val([items.selectedScheme])

save = ->
  config.colorSchemes = {}
  $('.color-scheme').each (index, element) ->
    scheme = $(element)
    config[colorSchemes][element.id] =
      level5: scheme.find('input.level5').val()
      level4: scheme.find('input.level4').val()
      level3: scheme.find('input.level3').val()
      level2: scheme.find('input.level2').val()
      level1: scheme.find('input.level1').val()

  config.selectedScheme = $("input:radio[name='scheme']:checked").val()
    
  chrome.storage.local.set config, ->
    alert("Your configuration has been changed successfully!")

###################
# initil data
###################
ocean =
  level5: '#004FBF'
  level4: '#477ECD'
  level3: '#8EAEDB'
  level2: '#BECEE4'
  level1: '#EEEEEE'

volcano =
  level5: '#A8151B'
  level4: '#BD565A'
  level3: '#CB8184'
  level2: '#D9ACAE'
  level1: '#EEEEEE'

slacker =
  level5: '#EEEEEE'
  level4: '#BCC5B3'
  level3: '#9BAB8D'
  level2: '#7A9066'
  level1: '#49682C'

spooky =
  level5: '#03001C'
  level4: '#FE9600'
  level3: '#FFC501'
  level2: '#FFEE4A'
  level1: '#EEEEEE'

initialData =
  spooky:  spooky
  ocean:   ocean
  volcano: volcano
  slacker: slacker

