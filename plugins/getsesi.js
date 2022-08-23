let fs = require('fs')
let handler = async (m, { args, usedPrefix, command }) => {
let seson = fs.readFileSync('./hyzer.data.json')
conn.sendPresenceUpdate('composing', m.chat)
conn.sendFile(m.chat, seson, 'methodsesi', null, m)

}
handler.help = ['getsession']
handler.tags = ['owner']
handler.command = /getsession/i

handler.owner = true

module.exports = handler
