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
const web_routes_1 = __importDefault(require("./web/web.routes"));
exports.app = (0, express_1.default)();
exports.app.disable('x-powered-by');
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: config_1.ORIGINS,
    credentials: true
}));
exports.app.use(config_1.PATH_PREFIX + 'analytics', analytics_routes_1.default);
exports.app.use(config_1.PATH_PREFIX + 'web', web_routes_1.default);
exports.app.get(config_1.PATH_PREFIX, (_, res) => {
    res.json({ response: 'Hello, how are you?' });
});
exports.app.get(config_1.PATH_PREFIX + 'ping', (_, res) => {
    res.json({ message: 'pong' });
});
exports.app.use((_, res) => {
    res.status(404).json({
        status: 404,
        message: 'This route does not exist'
    });
});
