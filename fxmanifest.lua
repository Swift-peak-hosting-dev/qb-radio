fx_version 'cerulean'
game 'gta5'

lua54 'yes'

author 'QB-Core & BurnoutProjects <https://github.com/burnoutprojects>'

name 'qb-radio'
description 'A modified version of qb-radio'
version '1.0.0'

lua54 'yes'

shared_scripts {
  'config.lua'
}

client_scripts {
  'client/*.lua'
}

server_scripts {
  'server/*.lua'
}

files {
  'html/ui.html',
  'html/js/script.js',
  'html/css/style.css',
  'html/img/radio.png',
}

ui_page('html/ui.html')
