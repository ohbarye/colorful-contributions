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
      loadDataFromStorage()
      alert('reset')


###################
# functions
###################
colorSchemes = 'colorSchemes'
config = {}

loadDataFromStorage = ->
  chrome.storage.local.get colorSchemes, (items) ->
    # If data is not prepared, seed data.
    if Object.keys(items).length == 0
      items.colorSchemes = initialData

    items.colorSchemes.forEach (item) ->
      colorScheme = item.name
      for level, rgb of item.data
        $(".#{colorScheme}.#{level}").val(rgb)

save = ->
  schemeConfig = []

  $('.color-scheme').each (index, element) ->
    scheme = $(element)
    schemeConfig.push
      name: scheme.attr('id')
      data:
        level5: scheme.find('input.level5').val()
        level4: scheme.find('input.level4').val()
        level3: scheme.find('input.level3').val()
        level2: scheme.find('input.level2').val()
        level1: scheme.find('input.level1').val()

  config[colorSchemes] = schemeConfig

  chrome.storage.local.set config, ->
    alert("success")

###################
# initil data
###################
spooky =
  name: 'spooky'
  data:
    level5: '#03001C'
    level4: '#FE9600'
    level3: '#FFC501'
    level2: '#FFEE4A'
    level1: '#EEEEEE'

ocean =
  name: 'ocean'
  data:
    level5: '#004FBF'
    level4: '#477ECD'
    level3: '#8EAEDB'
    level2: '#BECEE4'
    level1: '#EEEEEE'

initialData = [
  spooky
  ocean
]

