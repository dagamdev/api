"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = require("../app");
const connection_1 = require("./events/connection");
const config_1 = require("@/config");
exports.server = http_1.default.createServer(app_1.app);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: config_1.ORIGINS,
        credentials: true
    }
});
io.on('connection', connection_1.connnectionEvent);
