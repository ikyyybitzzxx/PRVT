let axios = require('axios')
const fetch = require('node-fetch')
let limit = 1024354
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  conn.sendPresenceUpdate('recording', m.chat)
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize 
  conn.sendPresenceUpdate('recording', m.chat)
  let buttonMessage = {
  audio: { url: dl_link },
  mimetype: 'audio/mpeg', 
  fileName: 'ytaa.mp3',
  fileLength: 88789090999999999999999999,
  contextInfo:{externalAdReply:{
  title: "Youtube Audio - Hyzer Official",
  body: "Shiro Bot",
  thumbnail: require('fs').readFileSync('./media/ok.jpg'),
  mediaType: 1,
  mediaUrl: "https://bit.ly/HyzerDev",
  sourceUrl: "https://bit.ly/HyzerDev",
  }}
  }
  if (!isLimit) conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}
handler.help = ['mp3','a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3|ad)$/i

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
