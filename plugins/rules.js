let moment = require('moment-timezone')

let handler = async (m, { conn }) => {
await conn.sendPresenceUpdate('composing', m.chat)
let ini = `Kebijakan Privasi, Syarat Ketentuan dan Peraturan Delta Bot

Kebijakan Privasi
1. Bot tidak akan merekam data riwayat chat user.
2. Bot tidak akan menyebarkan nomor users.
3. Bot tidak akan menyimpan media yang dikirimkan oleh users.
4. Bot tidak akan menyalah gunakan data data users.
5. Owner Bot berhak melihat data riwayat chat users.
6. Owner Bot berhak melihat status users.
7. Owner Bot dapat melihat riwayat chat, dan media yang dikirimkan users.

Peraturan Bot Bot
1. Users dilarang menelpon maupun memvideo call nomor bot.
2. Users dilarang mengirimkan berbagai bug, virtex, dll ke nomor bot.
3. Users diharap tidak melakukan spam dalam penggunaan bot.
4. Users dilarang menambahkan nomor bot secara illegal, untuk menambahkan silahkan hubungi owner.
5. Users diharap untuk tidak menyalah gunakan fitur fitur bot.

Syarat Ketentuan Bot
1. Bot akan keluar dari group apabila sudah waktunya keluar.
2. Bot dapan mem-ban users secara sepihak terlepas dari users salah atau tidak.
3. Bot *tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur bot.*
4. Bot akan memberlakukan hukuman: block atau ban terhadap users yang melanggar peraturan.
5. Bot bertanggung jawab atas kesalahan fatal dalam programing maupun owner.`
    let nam = await conn.getName(m.sender)
	let buttons = [
      {urlButton: { displayText: 'Group',  url: gc }},
      {urlButton: { displayText: 'Website',  url: web }},
      {quickReplyButton: { displayText: 'Speedtest', id: `.ping` }},
      {quickReplyButton: { displayText: 'Owner', id: `.owner` }},
      {quickReplyButton: { displayText: 'Menu', id: `.menu` }}
    ]
    let buttonMessage = {
    document: fs.readFileSync('./database.json'),
    mimetype: 'application/pdf',
    jpegThumbnail: await conn.reSize(fla + 'rules', 300, 150),
    fileName: `${ucapan()} ${nam}`,
    fileLength: 9999999999999999,
    caption: ini,
    footer: 'Copyright 2022 | © Hyzer Official',
    templateButtons: buttons,
    headerType: 1
    }    
    conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}
handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules|snk)$/i

module.exports = handler

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