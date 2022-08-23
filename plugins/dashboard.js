let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
await conn.sendPresenceUpdate('composing', m.chat)
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
    return `*(${idx + 1})*\n • *Command* : *${name}*\n • *Hit* : *${total}*`
  }).join`\n`
  let ini = "https://telegra.ph/file/9c6bc6436cbd38160a98d.jpg"
  let buttons = [
    {buttonId: '.help all', buttonText: {displayText: 'Menu'}, type: 1}
  ]
  let buttonMessage = {
   document: fs.readFileSync('./database.json'),
   fileName: 'Dashboard Penggunaan Bot',
   fileLength: 999999999999999999999999999999999,
   pageCount: 2022,
   caption: `*Dashboard Delta Bot*\n\n${txt}`,
   footer: wm2,
   buttons: buttons,
   headerType: 4,
   contextInfo:{externalAdReply:{
   title: `${namebot} - ${nameowner}`,
   body: "Simple Bot WhatsApp",
   mediaType: 1,
   renderLargerThumbnail: true , 
   showAdAttribution: true, 
   jpegThumbnail: await(await fetch(ini)).buffer(),
   thumbnail: await(await fetch(ini)).buffer(),
   mediaUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP",
   sourceUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP"
   }}
   }   
   conn.sendMessage(m.chat, buttonMessage, { quoted: m })      
}
handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^(db|dashboard)$/i

module.exports = handler 
	
async function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter must be filled with number'
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  }
}