let handler = async ( m ) => {
  await conn.sendPresenceUpdate('composing', m.chat)
  await m.reply('Hello!')
}

handler.command = /^(cek|tes|a|p)$/i

module.exports = handler
