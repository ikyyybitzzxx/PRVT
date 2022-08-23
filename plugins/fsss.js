//━━━━━━━━[ DEFAULT SETTINGS ]━━━━━━━━//
let { generateWAMessageFromContent, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let moment = require('moment-timezone')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'MENU UTAMA',
  'game': 'MENU GAME',
  'rpg': 'MENU RPG',
  'xp': 'MENU EXP',
  'premium': 'MENU PREMIUM',
  'group': 'MENU GROUP',
  'absen': 'MENU ABSEN',
  'vote': 'MENU VOTE',
  'owner': 'MENU OWNER',
  'fun': 'MENU FUN',
  'sticker': 'MENU CONVERT',
  'maker': 'MENU MAKER',
  'github': 'MENU GITHUB',
  'internet': 'INTERNET',
  'kerang': 'MENU KERANG',
  'anime': 'MENU ANIME',
  'downloader': 'DOWNLOADER',
  'nsfw': 'MENU NSFW',
  'tools': 'MENU TOOLS',
  'advanced': 'ADVANCED',
  'quotes': 'MENU QUOTES',
  'info': 'MENU INFO',
  'jadian': 'JADIAN MENU',
}
const defaultMenu = {
  before: `
*INFO BOT*
• Creator : Hyzer Official
• Bot Name : Shiro Bot
• Version: %version
• Library: Baileys-MD
• Mode: ${global.opts['self'] ? 'Self' : 'publik'}
• Runtime: %uptime

*INFO USER*
• Name: %name
• Limit: %limit
• Money: %money
• Exp: %totalexp
• Level: %level
• Role: %role
%readmore`.trimStart(),
  header: '*%category*',
  body: '• %cmd %islimit %isPremium',
  footer: '\n',
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    ini = 'Special Thanks To:\n• Fatih Arridho\n• Rlxfly\n• Fardan\n• X-None Team'
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let buttons = [
    {buttonId: '.db', buttonText: {displayText: '🌐 Dashboard'}, type: 1},
    {buttonId: '.ping', buttonText: {displayText: '💠 Status'}, type: 1}
  ]
  let ijj = `Hi kak @${m.sender.split('@')[0]}, Here All Bot Command\n\n`
  let buttonMessage = {
   document: fs.readFileSync('./database.json'),
   mimetype: 'application/msword',
   fileName: `${ucapan()} ${name}`,
   fileLength: 999999999999999999999999999999999,
   pageCount: 2022,
   caption: ijj + text,
   footer: ini,
   mentions: await conn.parseMention(ijj),
   buttons: buttons,
   headerType: 4,
   contextInfo:{externalAdReply:{
   title: "Delta Bot  - Hyzer Official",
   body: "Simple WhatsApp Bot",
   mediaType: 1,
   renderLargerThumbnail: true , 
   showAdAttribution: true, 
   jpegThumbnail: await(await fetch('https://telegra.ph/file/26cd0b561f48cf963427a.jpg')).buffer(),
   thumbnail: await(await fetch('https://telegra.ph/file/26cd0b561f48cf963427a.jpg')).buffer(),
   mediaUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP",
   sourceUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP"
   }}
   }
   conn.sendMessage(m.chat, buttonMessage, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.command = /^(allfs)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

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