"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISIT_COOLDOWN_TIME = exports.ORIGINS = exports.PATH_PREFIX = exports.ENVIRONMENTS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENVIRONMENTS = {
    PORT: process.env.PORT,
    CONNECT_MONGO: process.env.MONGO_CONECT,
    IN_DEVELOPING: process.env.DEVELOPING !== undefined
};
exports.PATH_PREFIX = '/api/';
exports.ORIGINS = (_b = (_a = process.env.ORIGINS) === null || _a === void 0 ? void 0 : _a.split(/ +/g)) !== null && _b !== void 0 ? _b : '*';
exports.VISIT_COOLDOWN_TIME = 10 * 60 * 1000;
