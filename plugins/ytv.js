let limit = 1024
let fetch = require('node-fetch')
let fs = require('fs')
const { servers, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await ytv(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  let name = await conn.getName(m.sender)
  let wm = global.wm
  conn.sendPresenceUpdate('composing', m.chat)
  let buttons = [
      {buttonId: '.menu all', buttonText: {displayText: 'ᴍᴇɴᴜ'}, type: 1}
    ]
    let buttonMessage = {
    video: { url: dl_link },
    fileName: title + '.mp4',
    fileLength: 999999999999999999999,
    caption: `Title: ${title}`,
    footer: wm2,
    buttons: buttons,
    headerType: 4,
    contextInfo:{externalAdReply:{
    title: "Youtube Video  - Hyzer Official",
    mediaType: 1,
    renderLargerThumbnail: true , 
    showAdAttribution: true, 
    jpegThumbnail: fs.readFileSync('./media/ok.jpg'),
    mediaUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP", 
    thumbnail: fs.readFileSync('./media/ok.jpg'),
    sourceUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP"
    }}
    }    
    if (!isLimit) conn.sendMessage(m.chat, buttonMessage, { quoted: m })   
}
handler.help = ['mp4','v',''].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|vd|mp4)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
