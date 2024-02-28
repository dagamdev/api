"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISIT_COOLDOWN_TIME = exports.ORIGINS = exports.PATH_PREFIX = exports.ENVIRONMENTS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENVIRONMENTS = {
    PORT: process.env.PORT,
    CONNECT_MONGO: process.env.MONGO_CONECT,
    SECRET: process.env.SECRET,
    DISCORD: process.env.DISCORD,
    DOMAIN: (_a = process.env.DOMAIN) !== null && _a !== void 0 ? _a : 'http://localhost:246',
    SESSION_SECRET: (_b = process.env.DOMAIN) !== null && _b !== void 0 ? _b : 'HelloQutool',
    BOT_TOKEN: process.env.BOT_TOKEN,
    PAGE_DOMAIN: (_c = process.env.PAGE_DOMAIN) !== null && _c !== void 0 ? _c : 'https://qutool.vercel.app',
    IN_DEVELOPING: process.env.DEVELOPING !== undefined
};
exports.PATH_PREFIX = '/api/';
exports.ORIGINS = exports.ENVIRONMENTS.IN_DEVELOPING
    ? [
        'https://dagamdev.vercel.app'
    ]
    : '*';
exports.VISIT_COOLDOWN_TIME = 10 * 60 * 1000;
