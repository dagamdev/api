"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const cors_1 = __importDefault(require("cors"));
const analytics_routes_1 = __importDefault(require("./analytics/analytics.routes"));
exports.app = (0, express_1.default)();
exports.app.disable('x-powered-by');
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: config_1.ENVIRONMENTS.DEVELOPING === undefined ? config_1.ORIGINS : '*',
    credentials: true
}));
exports.app.use(config_1.PATH_PREFIX + 'analytics', analytics_routes_1.default);
exports.app.get(config_1.PATH_PREFIX, (req, res) => {
    res.json({ response: 'Hello, how are you?' });
});
exports.app.get(config_1.PATH_PREFIX + 'ping', (req, res) => {
    res.json({ message: 'pong' });
});
exports.app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This route does not exist'
    });
});
