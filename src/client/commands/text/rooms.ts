import { type Message, type Client, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js'
import { getIARoomsInfo } from '../../utils'

export async function roomsTextCommand (msg: Message<boolean>, client: Client) {
  const IARoomsInfo = await getIARoomsInfo('es', client)

  const RoomsEb = new EmbedBuilder()
    .setTitle('IA Rooms')
    .setDescription(`${IARoomsInfo}`)
    .setColor('Green')

  const LenguagesMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('IARoomMenu')
        .setPlaceholder('👅 Lenguaje')
        .addOptions([
          {
            label: 'English',
            emoji: '🇺🇸',
            value: 'en-english'
          },
          {
            label: 'Italiano',
            emoji: '🇮🇹',
            value: 'it-italiano'
          }
        ])
    )

  const CreateIARoomBtn = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setEmoji('1098301518593142895')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Crear')
        .setCustomId('createIARoomES')
    )

  msg.channel.send({ embeds: [RoomsEb], components: [LenguagesMenu, CreateIARoomBtn] })
}
