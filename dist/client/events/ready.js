"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readyEvent = void 0;
const __1 = require("..");
function readyEvent() {
    var _a;
    console.log(`🟢 ${(_a = __1.MyBot.user) === null || _a === void 0 ? void 0 : _a.username}: I'm ready`);
}
exports.readyEvent = readyEvent;
