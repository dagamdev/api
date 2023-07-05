"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connnectionEvent = void 0;
const addLike_1 = require("./addLike");
const addView_1 = require("./addView");
const removeLike_1 = require("./removeLike");
const client_1 = require("../../client");
const presenceUpdate_1 = require("./presenceUpdate");
const connnectionEvent = (socket) => {
    // console.log({id: socket.id})
    socket.on('addLike', () => {
        (0, addLike_1.addLikesEvent)(socket);
    });
    socket.on('removeLike', () => {
        (0, removeLike_1.removeLikeEvent)(socket);
    });
    socket.on('addView', () => {
        (0, addView_1.addViewEvent)(socket);
    });
    client_1.MyBot.on('presenceUpdate', (oldPresence, newPresence) => {
        if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.guild) && oldPresence.guild.id != '1064289165879025836')
            return;
        if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.userId) != '717420870267830382')
            return;
        // console.log(newPresence)
        const activities = newPresence === null || newPresence === void 0 ? void 0 : newPresence.activities.map((m) => { var _a; return (Object.assign(Object.assign({}, m), { emoji: (_a = m.emoji) === null || _a === void 0 ? void 0 : _a.name })); });
        (0, presenceUpdate_1.presenceUpdateEvent)(socket, Object.assign(Object.assign({}, newPresence), { activities }));
    });
};
exports.connnectionEvent = connnectionEvent;
