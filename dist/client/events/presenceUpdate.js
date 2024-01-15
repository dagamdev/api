"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceUpdateEvent = void 0;
const consts_1 = require("../../utils/consts");
function presenceUpdateEvent(oldPresence, newPresence) {
    var _a;
    if (typeof (oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.guild) === 'object' && ((_a = oldPresence.guild) === null || _a === void 0 ? void 0 : _a.id) !== consts_1.DISCORD.GUILD_ID)
        return;
    if ((oldPresence === null || oldPresence === void 0 ? void 0 : oldPresence.userId) !== consts_1.DISCORD.USER_ID)
        return;
    console.log('Update user', { user: Object.assign(Object.assign({}, newPresence.user), { status: newPresence.status, guild: newPresence.guild }) });
    // const activities = newPresence?.activities.map((m: any) => ({ ...m, emoji: m.emoji?.name }))
}
exports.presenceUpdateEvent = presenceUpdateEvent;
