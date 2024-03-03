local Translations = {
    ["not_on_radio"] = "You're not connected to a signal",
    ["on_radio"] = "You're already connected to this signal",
    ["joined_to_radio"] = "You're connected to %{channel} channel",
    ["restricted_channel_error"] = "You can not connect to this signal!",
    ["invalid_radio"] = "This frequency is not available.",
    ["you_on_radio"] = "You're already connected to this channel",
    ["you_leave"] = "You left the channel.",
    ['radio_channel'] = 'New channel %{value}',
    ['radio_volume'] = 'New radio volume is %{value}',
    ['min_radio_volume'] = 'The radio is already set to the lowest volume',
    ['max_radio_volume'] = 'The radio is already set to the maximum volume',
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})
