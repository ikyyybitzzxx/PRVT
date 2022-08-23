const { servers, yta, ytv } = require('../lib/y2mate')
let fs = require('fs')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} california` 
  let chat = global.db.data.chats[m.chat]
  conn.sendPresenceUpdate('composing', m.chat)
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Konten Tidak ditemukan'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'semua server gagal'
  if (yt2 === false) throw 'semua server gagal'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
let anu =  `
Judul: ${title}
Ukuran File Audio: ${filesizeF}
Ukuran File Video: ${yt2.filesizeF}
Server y2mate: ${usedServer}
Link Sumber:
${vid.url}

`
let btn = [{
urlButton: {
displayText: 'ɢʀᴏᴜᴘ sʜɪʀᴏ ʙᴏᴛ',
url: gc
}
}, {
callButton: {
displayText: 'ɴᴜᴍʙᴇʀ ᴏᴡɴᴇʀ',
phoneNumber: '+62 882-9202-4190'
}
}, {
quickReplyButton: {
displayText: 'ᴠɪᴅᴇᴏ 360ᴘ',
id: `.ytmp4 ${vid.url}`
}
}, {
quickReplyButton: {
displayText: 'ᴠɪᴅᴇᴏ 720ᴘ',
id: `.ytv720 ${vid.url}`
}  
}, {
quickReplyButton: {
displayText: 'ᴀᴜᴅɪᴏ',
id: `.ytmp3 ${vid.url}`
}
}]
conn.send5ButLoc(m.chat, 'YOUTUBE PLAY', anu, { url: thumb }, btn)
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(plyt|play)$/i

handler.exp = 0

module.exports = handler
