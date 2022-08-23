let { groupSettingUpdate } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = {
		'open': 'not_announcement',
		'buka': 'not_announcement',
		'on': 'not_announcement',
		'1': 'not_announcement',
		'close': 'announcement',
		'tutup': 'announcement',
		'off': 'announcement',
		'0': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
	let buttons = [
      {buttonId: '.grup 1', buttonText: {displayText: 'ʙᴜᴋᴀ'}, type: 1},
      {buttonId: '.grup 0', buttonText: {displayText: 'ᴛᴜᴛᴜᴘ'}, type: 1},
    ]
    let buttonMessage = {
    document: fs.readFileSync('./database.json'),
    fileName: 'who can send messages?',
    fileLength: 9999999999999999,
    pageCount: 2222,
    caption: `contoh penggunaan:\n*${usedPrefix + command} tutup*\n*${usedPrefix + command} buka*`,
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
    conn.sendPresenceUpdate('composing', m.chat)
    conn.sendMessage(m.chat, buttonMessage, { quoted: m })    
		throw false
	}
	conn.groupSettingUpdate(m.chat, isClose)
	conn.sendPresenceUpdate('composing', m.chat)
	conn.reply(m.chat, 'Sukses!', m)
}
handler.help = ['grup <buka/tutup>']
handler.tags = ['group']
handler.command = /^(grup|group)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.exp = 0
module.exports = handler
