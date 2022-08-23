let fetch = require('node-fetch')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/768a62758032ebb2f2958.jpg')
let { name, premium, level, limit, exp, lastclaim, registered, regTime, age } = global.DATABASE.data.users[m.sender]
let username = conn.getName(who)
let ya = `
[ *PROFILE* ]

 • *Name:* ${username} ${registered ? '(' + name + ') ': ''}
 • *Tag:* @${who.replace(/@.+/, '')}
 • *Number:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
 • *Link:* https://wa.me/${who.split`@`[0]}
${registered ? ' • *Age:* ' + age : ''}
`
    conn.sendButtonImg(m.chat, pp, ya, wm2, 'ᴍᴇɴᴜ', '.menu', m)
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile|pp$/i
module.exports = handler
