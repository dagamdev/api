"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connnectionEvent = void 0;
const addView_1 = require("./addView");
const addLike_1 = require("./addLike");
const removeLike_1 = require("./removeLike");
const client_1 = require("../../client");
const presenceUpdate_1 = require("./presenceUpdate");
const consts_1 = require("../../utils/consts");
const connnectionEvent = (socket) => {
    // console.log({ id: socket.id })
    socket.on('addView', (data) => {
        (0, addView_1.addViewEvent)(socket, data);
    });
    socket.on('addLike', (data) => {
        (0, addLike_1.addLikeEvent)(socket, data);
    });
    socket.on('removeLike', (data) => {
        (0, removeLike_1.removeLikeEvent)(socket, data);
    });
    client_1.MyBot.on('presenceUpdate', (oldPresence, newPresence) => {
        var _a;
        if (typeof (oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.guild) === 'object' && ((_a = oldPresence.guild) === null || _a === void 0 ? void 0 : _a.id) !== consts_1.DISCORD.GUILD_ID)
            return;
        if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.userId) !== consts_1.DISCORD.USER_ID)
            return;
        // console.log({msg: 'Update user', newPresence})
        const activities = newPresence === null || newPresence === void 0 ? void 0 : newPresence.activities.map((m) => { var _a; return (Object.assign(Object.assign({}, m), { emoji: (_a = m.emoji) === null || _a === void 0 ? void 0 : _a.name })); });
        const updatePresence = {
            status: newPresence.status,
            activities,
            clientStatus: newPresence.clientStatus
        };
        (0, presenceUpdate_1.presenceUpdateEvent)(socket, updatePresence);
    });
};
exports.connnectionEvent = connnectionEvent;
