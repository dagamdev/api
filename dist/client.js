"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.client = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
exports.client = new discord_js_1.Client({ intents: 131071 });
exports.status = 'offline';
exports.client.once('ready', () => {
    var _a;
    console.log(((_a = exports.client.user) === null || _a === void 0 ? void 0 : _a.username) + ': estoy listo');
    exports.status = 'ready';
});
exports.client.login(config_1.secret);
