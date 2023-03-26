"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const models_1 = require("./models");
const portfolio_routes_1 = __importDefault(require("./portfolio/portfolio.routes"));
const config_1 = require("./config");
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
exports.app.get(prefix + 'ping', (req, res) => {
    res.json({ message: 'pong' });
});
exports.app.get(prefix, (req, res) => {
    res.json({ response: 'hola que tal' });
});
exports.app.use(prefix, portfolio_routes_1.default);
io.on('connection', (socket) => {
    // console.log({id: socket.id})
    //? Likes events
    socket.on('addLike', () => __awaiter(void 0, void 0, void 0, function* () {
        const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
        if (portfolio) {
            portfolio.likes++;
            socket.broadcast.emit('like', portfolio.likes);
            yield portfolio.save();
        }
        else
            socket.broadcast.emit('like', 0);
    }));
    socket.on('removeLike', () => __awaiter(void 0, void 0, void 0, function* () {
        const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
        if (portfolio) {
            portfolio.likes--;
            socket.broadcast.emit('like', portfolio.likes);
            yield portfolio.save();
        }
        else
            socket.broadcast.emit('like', 0);
    }));
    //? Views events
    socket.on('addView', () => __awaiter(void 0, void 0, void 0, function* () {
        const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
        if (portfolio) {
            portfolio.views++;
            socket.broadcast.emit('view', portfolio.views);
            yield portfolio.save();
        }
        else
            socket.broadcast.emit('view', 0);
    }));
});
server.listen(config_1.port, () => {
    console.log('Server is runing in the port ' + config_1.port);
});
