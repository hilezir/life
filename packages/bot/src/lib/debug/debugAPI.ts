import debug from 'debug'

const root = debug('w3r')

export const debugAPI = {
  bot: root.extend('bot'),
  ga: root.extend('ga'),
  mongoDB: root.extend('mongoDB'),
  news: root.extend('news'),
}
