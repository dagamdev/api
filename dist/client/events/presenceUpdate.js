"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceUpdateEvent = void 0;
function presenceUpdateEvent(oldPresence, newPresence) {
    if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.guild) && oldPresence.guild.id != '1064289165879025836')
        return;
    if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.userId) != '717420870267830382')
        return;
    console.log('Update user', { user: Object.assign(Object.assign({}, newPresence.user), { status: newPresence.status, guild: newPresence.guild }) });
    const activities = newPresence === null || newPresence === void 0 ? void 0 : newPresence.activities.map((m) => { var _a; return (Object.assign(Object.assign({}, m), { emoji: (_a = m.emoji) === null || _a === void 0 ? void 0 : _a.name })); });
}
exports.presenceUpdateEvent = presenceUpdateEvent;
