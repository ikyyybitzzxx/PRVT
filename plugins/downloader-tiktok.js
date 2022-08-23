let handler = async(m,{text, conn}) => {
await conn.sendPresenceUpdate('composing', m.chat)
if (!text) throw m.reply('masukkan link nya')
let p = await require('caliph-api').downloader.tiktok(text)
let nih = `*TIKTOK DOWNLOADER*

• *Title:* ${p.title}
• *Author:* ${p.author}
`
let buttons = [
      {buttonId: `.tiktokaudio ${text}`, buttonText: {displayText: 'Get Audio'}, type: 1}
    ]
    let buttonMessage = {
    video: { url: p.nowm },
    fileName: 'tiktoknowm.mp4',
    caption: nih,
    footer: 'Ingin Audio Nya? Cukup Klik Button Di Bawah',
    buttons: buttons,
    headerType: 4,
    contextInfo:{externalAdReply:{
    title: "Tiktok Downloader  -" + nameowner, 
    mediaType: 1,
    renderLargerThumbnail: true , 
    showAdAttribution: true, 
    jpegThumbnail: fs.readFileSync('./IMG-20220624-WA0222.jpg'),
    mediaUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP",
    thumbnail: fs.readFileSync('./IMG-20220624-WA0222.jpg'),
    sourceUrl: "https://chat.whatsapp.com/IxBejqgYlXKENKPJsF7EOP"
    }}
    }  
    conn.sendMessage(m.chat, buttonMessage, { quoted: m })   
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|ttk)$/i

module.exports = handler
