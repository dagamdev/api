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
exports.memberRemoveEvent = void 0;
const utils_1 = require("../utils");
const __1 = require("..");
function memberRemoveEvent(mr) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mr.guild.id != '1082083606727508008')
            return;
        const roomsData = yield (0, utils_1.getRoomsData)(__1.MyBot);
        const room = roomsData === null || roomsData === void 0 ? void 0 : roomsData.find(f => f.userId == mr.id);
        if (room && room.channelId) {
            mr.guild.channels.delete(room.channelId);
        }
    });
}
exports.memberRemoveEvent = memberRemoveEvent;
