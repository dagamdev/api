"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const portfolio_routes_1 = __importDefault(require("./portfolio/portfolio.routes"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: config_1.ORIGINS,
    credentials: true
}));
exports.app.use(config_1.PATH_PREFIX, portfolio_routes_1.default);
exports.app.get(config_1.PATH_PREFIX, (req, res) => {
    res.json({ response: 'Hello, how are you?' });
});
exports.app.get(config_1.PATH_PREFIX + 'ping', (req, res) => {
    res.json({ message: 'pong' });
});
