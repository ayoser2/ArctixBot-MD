import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Wheres the link?'
  let { thumbnail, video, title } = await youtubedl(args[0])
      .catch(async () => await youtubedlv2(args[0]))
  let link = await video['144p'].download()
  const isY = /y(es)/gi.test(args[1])
  const limitedSize = (isPrems || isOwner ? 9999 : 999) * 1024
  let isLimit = limitedSize < video['144p'].fileSize
  if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
  await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👻'  }}, { messageId: m.key.id })
*🔮𝗧𝗜𝗧𝗟𝗘:* ${title}
*🔮𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘:* ${video['144p'].fileSizeH}
*${isLimit ? 'Uasge ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `
*🔮𝗧𝗜𝗧𝗟𝗘:* ${title}
*🔮𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘:* ${video['144p'].fileSizeH}
`.trim(), m, null, {
  asDocument: 0
})
}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ``)
handler.tags = ['downloader']
handler.command = /^(ytv1)?$/i
handler.limit = 1
handler.exp = 0


export default handler

