"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORIGINS = exports.PATH_PREFIX = exports.APP_ID = exports.ENVIRONMENTS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENVIRONMENTS = {
    PORT: process.env.PORT,
    CONNECT_MONGO: process.env.MONGO_CONECT,
    SECRET: process.env.SECRET,
    DISCORD: process.env.DISCORD,
    QUTOOL_ID: process.env.QUTOOL_ID || '935707268090056734',
    QUTOOL_SECRET: process.env.QUTOOL_SECRET,
    DOMAIN: process.env.DOMAIN || 'http://localhost:246',
    SESSION_SECRET: process.env.DOMAIN || 'HelloQutool',
    BOT_TOKEN: process.env.BOT_TOKEN,
    PAGE_DOMAIN: process.env.PAGE_DOMAIN || 'http://localhost:3000'
};
exports.APP_ID = '09012004';
exports.PATH_PREFIX = '/api/v1/';
exports.ORIGINS = [
    'https://dg-my-portfolio.vercel.app/',
    'http://localhost:3000'
];
