const os = require('os')
const { sizeFormatter } = require('human-readable')
const fs = require('fs')
let moment = require('moment-timezone')
let handler = async (m, { conn }) => {
await conn.sendPresenceUpdate('composing', m.chat)
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let name = conn.getName(m.sender)
let role = global.db.data.users[m.sender].role
let d = new Date(new Date + 3600000)
let locale = 'id'
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let week = d.toLocaleDateString(locale, { weekday: 'long' })    
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric', month: 'long', year: 'numeric'
}).format(d)
let nopp = { url: 'https://telegra.ph/file/c78b3ddffb453792a32e7.jpg' }
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => nopp)
let bio = await conn.fetchStatus(m.sender).catch(_ => 'Private!')
let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})
let chats = Object.keys(await conn.chats)
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
let session = fs.statSync(authFile)
let premium = global.db.data.users[m.sender].premium
let dens = `${ucapan()}, ${name}

╭─❑ 「 Date Info 」 
├Tanggal : ${week} ${date}
├ Islamic : ${dateIslamic}
╰─❑

╭─❑ 「 Bot Info 」
├ Library: Baileys-Md
├ Language :Javascript
├ Uptime : ${uptime}
├ Creator : @${'6287892711054'.split('@')[0]} Dan @${'13177997217'.split('@')[0]}
├ Platform : ${process.platform}
├ Nodejs : ${process.version}
├ Type : Multi-Device
├ Storage : MongoDB
├ Total Chat : ${chats.length}
├ Pengguna : ${Object.keys(global.db.data.users).length}
├ User Banned : ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}
├ Mode : ${global.opts['self'] ? 'Self' : 'publik'}
├ Memory Usage : ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}
╰─❑

╭─❑ 「 User Info 」 
├ Name : ${name}
├ Tag : @${m.sender.split('@')[0]}
├ Bio : ${bio.status}
├ Role Rpg : ${role}
├ Status : ${premium ? "Premium": "Free"} User
├ Api : https://wa.me/${m.sender.split('@')[0]}
├ Device Bot : IOS
╰─❑

Aku Masih Beta Dari *Multi-Device* @${'0'.split('@')[0]} Jadi Harap Maklumin Kalau Ada Error Ya😇`
let buttons = [
        { buttonId: '.ping', buttonText: { displayText: '💠 Status' }, type: 1 },
        { buttonId: '.db', buttonText: { displayText: '📊 Dashboard' }, type: 1 },
        { buttonId: '.allfs', buttonText: { displayText: '🌐 All Menu' }, type: 1 }
        ]
let buttonMessage = {
    location: { jpegThumbnail: await conn.reSize(pp, 300, 150)},
    fileLength: 99999999999999999,
    caption: dens,
    footer: wm,
    buttons: buttons,
    headerType: 4,
    mentions: await conn.parseMention(dens),
    contextInfo:{externalAdReply:{
    title: "Join My Group Below", 
    mediaType: 1,
    renderLargerThumbnail: true , 
    showAdAttribution: true, 
    jpegThumbnail: fs.readFileSync('./IMG-20220624-WA0222.jpg'),
    mediaUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP",
    thumbnail: fs.readFileSync('./IMG-20220624-WA0222.jpg'),
    sourceUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP"
    }}
    }  
    conn.sendMessage(m.chat, buttonMessage, { quoted: m }) 
}
handler.command = /^(m|menu)$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari 😪"
  if (time >= 4) {
    res = "Selamat Pagi 🌄"
  }
  if (time > 10) {
    res = "Selamat Siang 🌤️"
  }
  if (time >= 15) {
    res = "Selamat Sore 🏞️"
  }
  if (time >= 18) {
    res = "Selamat Malam 🌚"
  }
  return res
}
