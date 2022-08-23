let handler = async(m, { conn }) => {
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]
let list = []
for (let i of global.owner) {
	list.push({
	displayName: await conn.getName(i + '@s.whatsapp.net'),
	    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${await conn.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:AndikaDelta@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/zexyds_\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	  })
	}
conn.sendMessage(m.chat, { contacts: { displayName: `${list.length} Kontak`, contacts: list }}, { quoted : m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

module.exports = handler
