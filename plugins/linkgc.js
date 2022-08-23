let handler = async (m, { conn, args }) => { 
conn.sendPresenceUpdate('composing', m.chat)
conn.sendMessage(m.chat, {
  text: 'Here The Link This Group',
  templateButtons: [{
    index: 1,
    urlButton: {
      displayText: `Salin Link`,
      url: 'https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
    }
  }],
  footer: wm
})
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^(linkgroup|linkgc)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler
