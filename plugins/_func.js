const fs = require('fs')
const fetch = require('node-fetch')
const moment = require('moment-timezone')

let handler = m => m
handler.all = async function (m) {
// Nama User
global.name = await conn.getName(m.sender) 
// Module
global.fs = require('fs')
global.fetch = require('node-fetch')
global.bochil = require('@bochilteam/scraper')
global.hmtai = require("hmtai")
global.hxz = require("hxz-api")
global.caliph = require("caliph-api")
global.xfar = require("xfarr-api")
// Ucapan
global.ucapan = ucapan()
let urls = pickRandom(['https://tinyurl.com/248tem3e', 'https://tinyurl.com/2ygkf7cn', 'https://tinyurl.com/29rt6ynv', 'https://tinyurl.com/25ampr4y', 'https://tinyurl.com/2yq9srmd', 'https://tinyurl.com/2bahkesq', 'https://tinyurl.com/2xnzw74a', 'https://tinyurl.com/2b9hocps', 'https://tinyurl.com/265ekuvk', 
'https://tinyurl.com/2c82ajhq', 'https://tinyurl.com/265y8p3e', 'https://tinyurl.com/286yslxu'])
		// externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
global.adReply = {
			contextInfo: {
				forwardingScore: 9999,
				//isForwarded: true, // ini biar ada tulisannya diteruskan berkali-kali, jika ingin di hilangkan ganti true menjadi false
				externalAdReply: { // Bagian ini sesuka kalian berkreasi :'v
                    showAdAttribution: true,
					title: `${ucapan()} ${conn.getName(m.sender)}`,
					body: wm,
					mediaUrl: web,
					description: 'simple bot esm',
					previewType: "PHOTO",
					thumbnail: thumb,
					sourceUrl: "https://github.com/Hyzerr",					
				}
			}
		}
global.btn = [{
urlButton: {
displayText: 'ɢʀᴏᴜᴘ ʙᴏᴛ',
url: gc
}
}, {
quickReplyButton: {
displayText: 'ᴏᴡɴᴇʀ',
id: '.?'
}
}]
}
module.exports = handler 

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam 🌙"
    if (time >= 4) {
        res = "Selamat pagi"
    }
    if (time > 10) {
        res = "Selamat siang"
    }
    if (time >= 15) {
        res = "Selamat sore"
    }
    if (time >= 18) {
        res = "Selamat malam"
    }
    return res
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}