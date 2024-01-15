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
const analytics_controllers_1 = __importDefault(require("./analytics.controllers"));
function getAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.get('Id');
            const origin = req.get('Origin');
            const browserID = req.get('Browser-id');
            if (origin === undefined || browserID === undefined) {
                return res.status(404).json({
                    message: 'Header not provided',
                    headers: {
                        origin: 'Url of the Web',
                        'browser-id': 'Id of the browser'
                    }
                });
            }
            const analytics = yield analytics_controllers_1.default.getAnalytics({ id, origin, browserID });
            res.status(200).json(analytics);
        }
        catch (error) {
            res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
function additionLike(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.get('Id');
            const origin = (_a = req.get('Origin')) !== null && _a !== void 0 ? _a : '';
            const likes = yield analytics_controllers_1.default.additionLike({ id, origin });
            res.status(200).json({ likes });
        }
        catch (error) {
            res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
function subtractionLike(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.get('Id');
            const origin = (_a = req.get('Origin')) !== null && _a !== void 0 ? _a : '';
            const likes = yield analytics_controllers_1.default.subtractionLike({ id, origin });
            res.status(200).json({ likes });
        }
        catch (error) {
            res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
function getDiscordMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield analytics_controllers_1.default.getDiscordMe(id);
            res.status(200).json(Object.assign({ presence: data === null || data === void 0 ? void 0 : data.presence }, data));
        }
        catch (error) {
            res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
function getAbout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield analytics_controllers_1.default.getAbout();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.default = {
    getAnalytics,
    additionLike,
    subtractionLike,
    getDiscordMe,
    getAbout
};
