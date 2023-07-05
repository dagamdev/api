"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionCreateEvent = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../utils");
const __1 = require("..");
function interactionCreateEvent(int) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, guild } = int;
        if (int.isStringSelectMenu()) {
            const { customId } = int;
            if (customId == 'IARoomMenu') {
                const value = int.values[0];
                const language = value.split('-')[0];
                const IARoomsInfo = yield (0, utils_1.getIARoomsInfo)(language, __1.MyBot);
                const RoomsEb = new discord_js_1.EmbedBuilder()
                    .setTitle('IA Rooms')
                    .setDescription(`${IARoomsInfo}`)
                    .setColor('Green');
                const CreateIARoomBtn = new discord_js_1.ActionRowBuilder()
                    .addComponents(new discord_js_1.ButtonBuilder()
                    .setEmoji('1098301518593142895')
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setLabel(language == 'it' ? 'Creare' : 'Create')
                    .setCustomId(language == 'it' ? 'createIARoomIT' : 'createIARoomEN'));
                yield int.reply({ ephemeral: true, embeds: [RoomsEb], components: [CreateIARoomBtn] });
            }
        }
        if (int.isButton()) {
            const { customId } = int;
            const roomsData = yield (0, utils_1.getRoomsData)(__1.MyBot);
            const CreteRoomEb = new discord_js_1.EmbedBuilder();
            const IARoomsCategory = '1098102445915254846';
            const configCreate = {
                parent: IARoomsCategory, name: user.tag, permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ['ViewChannel', 'ManageChannels', 'ManageMessages', 'ManageThreads']
                    },
                    {
                        id: (guild === null || guild === void 0 ? void 0 : guild.id) || '',
                        deny: ['ViewChannel', 'CreateInstantInvite']
                    }
                ]
            };
            if (customId == 'createIARoomES') {
                if (roomsData) {
                    const room = roomsData.find(f => f.userId == user.id);
                    if (room) {
                        if (room.channelId) {
                            CreteRoomEb.setTitle('❌ Error').setColor('Red')
                                .setDescription(`Ya tienes un IA Room el cual es <#${room.channelId}>, solo puesdes tener uno.`);
                            yield int.reply({ ephemeral: true, embeds: [CreteRoomEb] });
                            return;
                        }
                    }
                    const chRoom = yield (guild === null || guild === void 0 ? void 0 : guild.channels.create(configCreate));
                    if (room) {
                        room.channelId = chRoom === null || chRoom === void 0 ? void 0 : chRoom.id;
                    }
                    else {
                        roomsData.push({
                            userId: user.id,
                            channelId: chRoom === null || chRoom === void 0 ? void 0 : chRoom.id
                        });
                    }
                    (0, utils_1.updateRoomsData)(__1.MyBot, roomsData);
                    CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
                        .setDescription(`Tu IA Room se ha creado <#${chRoom === null || chRoom === void 0 ? void 0 : chRoom.id}>`);
                }
                else {
                    CreteRoomEb.setTitle('❌ Error').setColor('Red')
                        .setDescription('En estos momentos no tengo acceso a los datos, intentalo mas tarde.');
                }
            }
            if (customId == 'createIARoomEN') {
                if (roomsData) {
                    const room = roomsData.find(f => f.userId == user.id);
                    if (room) {
                        if (room.channelId) {
                            CreteRoomEb.setTitle('❌ Error').setColor('Red')
                                .setDescription(`You already gave an IA Room which is <#${room.channelId}>, you can only have one.`);
                            yield int.reply({ ephemeral: true, embeds: [CreteRoomEb] });
                            return;
                        }
                    }
                    const chRoom = yield (guild === null || guild === void 0 ? void 0 : guild.channels.create(configCreate));
                    if (room) {
                        room.channelId = chRoom === null || chRoom === void 0 ? void 0 : chRoom.id;
                    }
                    else {
                        roomsData.push({
                            userId: user.id,
                            channelId: chRoom === null || chRoom === void 0 ? void 0 : chRoom.id
                        });
                    }
                    (0, utils_1.updateRoomsData)(__1.MyBot, roomsData);
                    CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
                        .setDescription(`Your IA Room has been created <#${chRoom === null || chRoom === void 0 ? void 0 : chRoom.id}>`);
                }
                else {
                    CreteRoomEb.setTitle('❌ Error').setColor('Red')
                        .setDescription("At the moment I don't have access to the data, please try again later.");
                }
            }
            if (customId == 'createIARoomIT') {
                if (roomsData) {
                    const room = roomsData.find(f => f.userId == user.id);
                    if (room) {
                        if (room.channelId) {
                            CreteRoomEb.setTitle('❌ Error').setColor('Red')
                                .setDescription(`Hai già una IA Room che è <#${room.channelId}>, puoi averne solo una.`);
                        }
                    }
                    const chRoom = yield (guild === null || guild === void 0 ? void 0 : guild.channels.create(configCreate));
                    if (room)
                        room.channelId = chRoom === null || chRoom === void 0 ? void 0 : chRoom.id;
                    else
                        roomsData.push({
                            userId: user.id,
                            channelId: chRoom === null || chRoom === void 0 ? void 0 : chRoom.id
                        });
                    (0, utils_1.updateRoomsData)(__1.MyBot, roomsData);
                    CreteRoomEb.setTitle('✅ Éxito').setColor('Green')
                        .setDescription(`La tua IA Room è stata creata <#${chRoom === null || chRoom === void 0 ? void 0 : chRoom.id}>`);
                }
                else {
                    CreteRoomEb.setTitle('❌ Errore').setColor('Red')
                        .setDescription('Al momento non ho accesso ai dati, riprova più tardi.');
                }
            }
            yield int.reply({ ephemeral: true, embeds: [CreteRoomEb] });
        }
    });
}
exports.interactionCreateEvent = interactionCreateEvent;
