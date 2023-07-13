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
const qutool_controllers_1 = __importDefault(require("./qutool.controllers"));
const config_1 = require("../config");
const CHANNELID = '1017921717261312040';
exports.default = {
    authRedierect(req, res) {
        res.redirect(`${config_1.ENVIRONMENTS.PAGE_DOMAIN}/dashboard`);
    },
    authLogout(req, res, next) {
        req.logout((error) => {
            if (error)
                return next(error);
            res.redirect(`${config_1.ENVIRONMENTS.PAGE_DOMAIN}`);
        });
    },
    getUser(req, res) {
        res.json(req.user);
    },
    getTermsOfService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TOSEs = yield qutool_controllers_1.default.getMessage(CHANNELID, '1127792290858012813');
                const TOSEn = yield qutool_controllers_1.default.getMessage(CHANNELID, '1127792344238919680');
                if (!TOSEn.content && TOSEs.content)
                    return res.status(400).json({ message: 'Content not found' });
                res.json({ en: TOSEn.content, es: TOSEs.content });
            }
            catch (error) {
                res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    },
    getPrivacyPolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PPEs = yield qutool_controllers_1.default.getMessage(CHANNELID, '1127790049048666172');
                const PPEn = yield qutool_controllers_1.default.getMessage(CHANNELID, '1127791687234756669');
                if (!PPEn.content && PPEs.content)
                    return res.status(400).json({ message: 'Content not found' });
                res.json({ en: PPEn.content, es: PPEs.content });
            }
            catch (error) {
                res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
};
