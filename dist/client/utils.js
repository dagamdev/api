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
exports.updateRoomsData = exports.getRoomsData = exports.getIARoomsInfo = void 0;
const messagesIds = {
    'en': '1098281335933632622',
    'es': '1098281253297475694',
    'it': '1098281403587760169'
};
const infoIARoomsChannelId = '1098271613423718442';
function getIARoomsInfo(lenguage, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const IARoomsInfoCahnnel = client.channels.cache.get(infoIARoomsChannelId);
        if (IARoomsInfoCahnnel === null || IARoomsInfoCahnnel === void 0 ? void 0 : IARoomsInfoCahnnel.isTextBased()) {
            const IARoomsInfo = (yield IARoomsInfoCahnnel.messages.fetch(messagesIds[lenguage])).content;
            return IARoomsInfo;
        }
    });
}
exports.getIARoomsInfo = getIARoomsInfo;
const IARoomsChannelId = '1098273510276730960';
function getRoomsData(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const IARoomsChannel = client.channels.cache.get(IARoomsChannelId);
        if (IARoomsChannel === null || IARoomsChannel === void 0 ? void 0 : IARoomsChannel.isTextBased()) {
            const content = (yield IARoomsChannel.messages.fetch('1098308109270782002')).content;
            return JSON.parse(content);
        }
    });
}
exports.getRoomsData = getRoomsData;
function updateRoomsData(client, roomsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const IARoomsChannel = client.channels.cache.get(IARoomsChannelId);
        if (IARoomsChannel === null || IARoomsChannel === void 0 ? void 0 : IARoomsChannel.isTextBased()) {
            const roomsMessage = yield IARoomsChannel.messages.fetch('1098308109270782002');
            roomsMessage.edit({ content: JSON.stringify(roomsData) });
        }
    });
}
exports.updateRoomsData = updateRoomsData;
