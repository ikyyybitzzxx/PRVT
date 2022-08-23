let { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys')
let { state, saveState } = useSingleFileAuthState('../session.data.json')
let QR = require('qrcode')
let util = require('util')
let P = require('pino')
let simple = require('../lib/simple')
let handler = async (m, { usedPrefix, command, conn, text }) => {
    
    let connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: P({ level: 'silent'}),
  version: [2, 2204, 13]
}

let can = simple.makeWASocket(connectionOptions)


can.ev.on('connection.update', async (update) => {
		const { connection, qr } = update
		if (qr !== undefined) {
			let res = await QR.toDataURL(qr, { scale: 8 })
			let scan = await conn.sendFile(m.key.remoteJid, res, '', 'Scan This...', m)
			setTimeout(() => {
				conn.sendMessage(m.key.remoteJid, { delete: { remoteJid: m.key.remoteJid, fromMe: true, id: scan.key.id, participant: conn.user.jid }})
			}, 30000)
			if (connection === 'open') {
				conn.reply(m.key.remoteJid, 'Success\n' + util.format(can.user), m)
			}
		}
	})
}
handler.help = ['jadibot']
handler.tags = ['tools']
handler.command = /^(jadibot)$/i
handler.private = false

module.exports = handler