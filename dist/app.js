"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("./strategies/discord");
const portfolio_routes_1 = __importDefault(require("./portfolio/portfolio.routes"));
const qutool_routes_1 = __importDefault(require("./Qutool/qutool.routes"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: config_1.ORIGINS,
    credentials: true
}));
exports.app.use((0, express_session_1.default)({
    name: 'qutool-discord-oauth2',
    secret: config_1.ENVIRONMENTS.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60000,
        domain: 'qutool.vercel.app',
        // secure: ENVIRONMENTS.DEVELOPING ? false : true,
        sameSite: 'none'
    },
    store: connect_mongo_1.default.create({
        mongoUrl: config_1.ENVIRONMENTS.CONNECT_MONGO
    })
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use(config_1.PATH_PREFIX, portfolio_routes_1.default);
exports.app.use(config_1.PATH_PREFIX + 'Qutool', qutool_routes_1.default);
exports.app.get(config_1.PATH_PREFIX, (req, res) => {
    res.json({ response: 'Hello, how are you?' });
});
exports.app.get(config_1.PATH_PREFIX + 'ping', (req, res) => {
    res.json({ message: 'pong' });
});
