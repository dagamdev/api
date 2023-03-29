"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./db");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const portfolio_routes_1 = __importDefault(require("./portfolio/portfolio.routes"));
const config_1 = require("./config");
const connection_1 = require("./events/connection");
exports.app = (0, express_1.default)();
const prefix = '/api/v1/';
const server = http_1.default.createServer(exports.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    }
});
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(prefix, portfolio_routes_1.default);
exports.app.get(prefix + 'ping', (req, res) => {
    res.json({ message: 'pong' });
});
exports.app.get(prefix, (req, res) => {
    res.json({ response: 'hola que tal' });
});
io.on('connection', connection_1.connnectionEvent);
server.listen(config_1.port, () => {
    console.log('Server is runing in the port ' + config_1.port);
});
