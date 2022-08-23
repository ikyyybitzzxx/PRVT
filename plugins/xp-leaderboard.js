let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return {...value, jid: key}
  })
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  let usersMoney = sortedMoney.map(enumGetKey)
  console.log(participants)
  let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
  let text = `
• *XP Leaderboard Top ${len}* •
Kamu: *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. Name: (${conn.getName(jid)}) \n Wa: wa.me/${jid.split`@`[0]} \n Achievement: *${exp} Exp*\n`).join`\n`}

• *Limit Leaderboard Top ${len}* •
Kamu: *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}.Name: (${conn.getName(jid)}) \n Wa: wa.me/${jid.split`@`[0]} \n Achievement: *${limit} Limit*\n`).join`\n`}

• *Level Leaderboard Top ${len}* •
Kamu: *${usersLevel.indexOf(m.sender) + 1}* dari *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. Name: (${conn.getName(jid)}) \n Wa: wa.me/${jid.split`@`[0]} \n Achievement: *Level ${level}*\n`).join`\n`}

• *Money Leaderboard Top ${len}* •
Kamu: *${usersMoney.indexOf(m.sender) + 1}* dari *${usersMoney.length}*

${sortedMoney.slice(0, len).map(({ jid, money }, i) => `${i + 1}. Name: (${conn.getName(jid)}) \n Wa: wa.me/${jid.split`@`[0]} \n Achievement: *Money ${money}*\n`).join`\n`}
`.trim()
let btn = [{
quickReplyButton: {
displayText: 'ɪɴᴠᴇɴᴛᴏʀʏ',
id: '.inv'
}
}, {
quickReplyButton: {
displayText: 'ᴀᴅᴠᴇɴᴛᴜʀᴇ',
id: '.adventure'
}  
}]
  conn.send5ButLoc(m.chat, text, wm2, { url: 'https://telegra.ph/file/acc03eb3b250f7fd2f33e.jpg' }, btn)    
}
handler.help = ['leaderboard [jumlah user]']
handler.tags = ['rpg']
handler.command = /^(leaderboard|lb)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
