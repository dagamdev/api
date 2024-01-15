"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreateEvent = void 0;
const rooms_1 = require("../commands/text/rooms");
const __1 = require("..");
const prefix = 'c!';
function messageCreateEvent(msg) {
    var _a;
    if (msg.author.bot)
        return;
    if (!msg.content.toLocaleLowerCase().startsWith(prefix))
        return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    if (commandName === 'rooms')
        (0, rooms_1.roomsTextCommand)(msg, __1.MyBot);
}
exports.messageCreateEvent = messageCreateEvent;
