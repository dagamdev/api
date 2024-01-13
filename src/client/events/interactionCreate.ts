import { type Interaction, type CacheType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, type GuildChannelCreateOptions } from 'discord.js'
import { getIARoomsInfo, getRoomsData, updateRoomsData } from '../utils'
import type { Languages } from '../../types'
import { MyBot as client } from '..'

export async function interactionCreateEvent (int: Interaction<CacheType>) {
  const { user, guild } = int

  if (int.isStringSelectMenu()) {
    const { customId } = int

    if (customId === 'IARoomMenu') {
      const value = int.values[0]
      const language = value.split('-')[0] as Languages
      const IARoomsInfo = await getIARoomsInfo(language, client)

      const RoomsEb = new EmbedBuilder()
        .setTitle('IA Rooms')
        .setDescription(`${IARoomsInfo}`)
        .setColor('Green')

      const CreateIARoomBtn = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setEmoji('1098301518593142895')
            .setStyle(ButtonStyle.Primary)
            .setLabel(language === 'it' ? 'Creare' : 'Create')
            .setCustomId(language === 'it' ? 'createIARoomIT' : 'createIARoomEN')
        )

      await int.reply({ ephemeral: true, embeds: [RoomsEb], components: [CreateIARoomBtn] })
    }
  }

  if (int.isButton()) {
    const { customId } = int
    const roomsData = await getRoomsData(client)
    const CreteRoomEb = new EmbedBuilder()
    const IARoomsCategory = '1098102445915254846'

    const configCreate: GuildChannelCreateOptions = {
      parent: IARoomsCategory,
      name: user.tag,
      permissionOverwrites: [
        {
          id: user.id,
          allow: ['ViewChannel', 'ManageChannels', 'ManageMessages', 'ManageThreads']
        },
        {
          id: guild?.id ?? '',
          deny: ['ViewChannel', 'CreateInstantInvite']
        }
      ]
    }

    if (customId === 'createIARoomES') {
      if (roomsData !== undefined) {
        const room = roomsData.find(f => f.userId === user.id)
        if (room !== undefined) {
          if (room.channelId !== undefined) {
            CreteRoomEb.setTitle('❌ Error').setColor('Red')
              .setDescription(`Ya tienes un IA Room el cual es <#${room.channelId}>, solo puesdes tener uno.`)
            await int.reply({ ephemeral: true, embeds: [CreteRoomEb] })
            return
          }
        }

        const chRoom = await guild?.channels.create(configCreate)

        if (room !== undefined) {
          room.channelId = chRoom?.id
        } else {
          roomsData.push({
            userId: user.id,
            channelId: chRoom?.id
          })
        }

        updateRoomsData(client, roomsData)

        CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
          .setDescription(`Tu IA Room se ha creado <#${chRoom?.id}>`)
      } else {
        CreteRoomEb.setTitle('❌ Error').setColor('Red')
          .setDescription('En estos momentos no tengo acceso a los datos, intentalo mas tarde.')
      }
    }

    if (customId === 'createIARoomEN') {
      if (roomsData !== undefined) {
        const room = roomsData.find(f => f.userId === user.id)
        if (room !== undefined) {
          if (room.channelId !== undefined) {
            CreteRoomEb.setTitle('❌ Error').setColor('Red')
              .setDescription(`You already gave an IA Room which is <#${room.channelId}>, you can only have one.`)
            await int.reply({ ephemeral: true, embeds: [CreteRoomEb] })
            return
          }
        }

        const chRoom = await guild?.channels.create(configCreate)

        if (room !== undefined) {
          room.channelId = chRoom?.id
        } else {
          roomsData.push({
            userId: user.id,
            channelId: chRoom?.id
          })
        }

        updateRoomsData(client, roomsData)

        CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
          .setDescription(`Your IA Room has been created <#${chRoom?.id}>`)
      } else {
        CreteRoomEb.setTitle('❌ Error').setColor('Red')
          .setDescription("At the moment I don't have access to the data, please try again later.")
      }
    }

    if (customId === 'createIARoomIT') {
      if (roomsData !== undefined) {
        const room = roomsData.find(f => f.userId === user.id)
        if (room !== undefined) {
          if (room.channelId !== undefined) {
            CreteRoomEb.setTitle('❌ Error').setColor('Red')
              .setDescription(`Hai già una IA Room che è <#${room.channelId}>, puoi averne solo una.`)
          }
        }

        const chRoom = await guild?.channels.create(configCreate)

        if (room !== undefined) room.channelId = chRoom?.id
        else {
          roomsData.push({
            userId: user.id,
            channelId: chRoom?.id
          })
        }

        updateRoomsData(client, roomsData)

        CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
          .setDescription(`La tua IA Room è stata creata <#${chRoom?.id}>`)
      } else {
        CreteRoomEb.setTitle('❌ Errore').setColor('Red')
          .setDescription('Al momento non ho accesso ai dati, riprova più tardi.')
      }
    }

    await int.reply({ ephemeral: true, embeds: [CreteRoomEb] })
  }
}
