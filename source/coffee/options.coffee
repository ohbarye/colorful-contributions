_gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-58056432-4']); _gaq.push(['_trackPageview'])
ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true
ga.src = 'https://ssl.google-analytics.com/ga.js'
s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s)

$ ->
  fields = []
  config = {}

  chrome.storage.local.get fields, (items) ->
    fields.forEach (field) ->
      savedValue = items[field]
      $('.'+field).val(savedValue) if savedValue

  $('#form').submit (e) ->
    e.preventDefault()

    fields.forEach (field) ->
      inputValue = $('.'+field).val()
      config[field] = $.trim(inputValue)

    chrome.storage.local.set config, ->
