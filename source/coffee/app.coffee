$ ->

  chrome.storage.local.get 'colorSchemes', (items) ->
    # If data is not prepared, do nothing.
    return if Object.keys(items).length == 0

    scheme = items.colorSchemes[1]

    values = Object.keys(scheme.data).map (key) -> scheme.data[key]
    $.each values, (i, val) ->
      defaultColorDefinition = $(".legend li:nth-child(#{i+1})")
      defaultColor = toHexRGB defaultColorDefinition.css('background-color')
      $("rect[fill=#{defaultColor}], rect[fill=#{defaultColor.toUpperCase()}]").attr('fill', val)
      defaultColorDefinition.css('background-color', val)

toHexRGB = (rgb) ->
  "#" + rgb.toString().match(/\d+/g).map( (t) -> ("0"+(t|0).toString(16)).substr(-2)).join("")