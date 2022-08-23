let handler = async (m, { conn, text }) => {
if (!text) throw m.reply('who?')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
conn.groupParticipantsUpdate(m.chat, [users], 'promote')
m.reply('Succes')
}
handler.help = ['promote'].map(v => v + ' <tag>')
handler.tags = ['group']
handler.command = /^(promote)$/i

handler.rowner = false
handler.admin = true
handler.group = true
handler.botAdmin = true 

module.exports = handler
