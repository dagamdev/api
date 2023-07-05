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
exports.roomsTextCommand = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
function roomsTextCommand(msg, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const IARoomsInfo = yield (0, utils_1.getIARoomsInfo)('es', client);
        const RoomsEb = new discord_js_1.EmbedBuilder()
            .setTitle('IA Rooms')
            .setDescription(`${IARoomsInfo}`)
            .setColor('Green');
        const LenguagesMenu = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.StringSelectMenuBuilder()
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
            },
        ]));
        const CreateIARoomBtn = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1098301518593142895')
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setLabel('Crear')
            .setCustomId('createIARoomES'));
        msg.channel.send({ embeds: [RoomsEb], components: [LenguagesMenu, CreateIARoomBtn] });
    });
}
exports.roomsTextCommand = roomsTextCommand;
