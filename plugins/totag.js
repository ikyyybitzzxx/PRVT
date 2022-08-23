let handler = async(m, { conn, text, participants }) => {
if (!m.quoted) throw 'Reply Sticker'
const namaa  = await conn.getName(m.sender)
const fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': namaa, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${namaa},;;;\nFN:${namaa},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/siang.jpg'), thumbnail: fs.readFileSync('./media/siang.jpg'),sendEphemeral: true}}}
   conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) }, {quoted:fkontak})
}
handler.help = ['totag <pesan>']
handler.tags = ['group']
handler.command = /^(totag)$/i

handler.group = true

module.exports = handler