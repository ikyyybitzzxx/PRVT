const { createHash } = require('crypto')
const fs = require('fs')
const moment = require('moment-timezone')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Anda sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}daftar nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 120) throw 'Umur terlalu tua 😂'
  if (age < 5) throw 'Bayi bisa ngetik sesuai format bjir ._.'
  var more = String.fromCharCode(8206)
  var readMore = more.repeat(4001)
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  user.money += 500
  user.legendary += 1
  user.iron += 5
  user.emas += 5
  user.string += 3
  user.limit += 10
  let sn = createHash('md5').update(m.sender).digest('hex')
  let sefuh = `
Terimakasih Telah Mendaftarkan Diri Anda Ke Database Bot
Silahkan Periksa Chat Pribadi Anda Dengan Bot, Untuk Melihat Kode SN Dan Beberapa Hadiah Awal.`
  let dia = `
• 𝗡𝗮𝗺𝗮: ${name}
• 𝗨𝗺𝘂𝗿: ${age} tahun 
• 𝗞𝗼𝗱𝗲 𝗦𝗡: ${sn}
${readMore}

Kamu Juga Mendapatkan Beberapa Hadiah Awal Karena Telah Berpartisipasi Dalam Perkembangan Bot Ini Sebagai Berikut:
+ 500 Money
+ 10 Limit
+ 5 Iron
+ 5 Emas
+ 3 String
+ 1 Legendary Crate

Keep Enjoy Using This Bot 🤗
`
    let buttons = [
      {buttonId: '.owner', buttonText: {displayText: 'Owner'}, type: 1},
      {buttonId: '.db', buttonText: {displayText: 'Dashboard'}, type: 1},
    ]
    let buttonMessage = {
    document: fs.readFileSync('./database.json'),
    fileName: `${ucapan()} ${name}`,
    fileLength: 9999999999999999,
    pageCount: 1,
    caption: sefuh,
    footer: wm2,
    buttons: buttons,
    headerType: 4,
    contextInfo:{externalAdReply:{
    title: "Shiro Bot  - Hyzer Official",
    body: "sɪᴍᴘʟᴇ ʙᴏᴛ ᴡʜᴀᴛsᴀᴘᴘ",
    mediaType: 1,
    thumbnail: fs.readFileSync('./IMG-20220624-WA0222.jpg'),
    mediaUrl: "bit.ly/HyzerDev",
    sourceUrl: "bit.ly/HyzerDev"
    }}
    }
    conn.sendMessage(m.chat, buttonMessage, { quoted: m })
    conn.reply(m.sender, dia, m)
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}