"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./db");
const portfolio_routes_1 = __importDefault(require("./portfolio/portfolio.routes"));
const config_1 = require("./config");
exports.app = (0, express_1.default)();
const prefix = '/api/v1/';
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get(prefix, (req, res) => {
    res.json({ response: 'hola que tal' });
});
exports.app.use(prefix, portfolio_routes_1.default);
exports.app.listen(config_1.port, () => {
    console.log('Server is runing in the port ' + config_1.port);
});
