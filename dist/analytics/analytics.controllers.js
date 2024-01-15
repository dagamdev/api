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
const models_1 = require("../models");
const config_1 = require("../utils/config");
const client_1 = require("../client");
const axios_1 = __importDefault(require("axios"));
function getAnalytics({ id, origin, browserID }) {
    return __awaiter(this, void 0, void 0, function* () {
        const Analytics = yield (id === undefined ? models_1.WebAnalytics.findOne({ origin }) : models_1.WebAnalytics.findById(id));
        if (Analytics === null) {
            return yield models_1.WebAnalytics.create({
                origin,
                browsers: [{
                        id: browserID,
                        lastVisitAt: Date.now()
                    }]
            });
        }
        const browser = Analytics.browsers.find(b => b.id === browserID);
        if (browser === undefined)
            return Analytics;
        if (Date.now() - browser.lastVisitAt >= 10 * 60 * 1000) {
            browser.lastVisitAt = Date.now();
            Analytics.views++;
            Analytics.save();
        }
        return Analytics;
    });
}
function additionLike({ id, origin }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateOptions = [
            { $inc: { likes: 1 } },
            { new: true }
        ];
        const Schema = id === undefined ? models_1.WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : models_1.WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions);
        const Analytics = yield Schema;
        if (Analytics === null)
            return 0;
        return Analytics.likes;
    });
}
function subtractionLike({ id, origin }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateOptions = [
            { $inc: { likes: -1 } },
            { new: true }
        ];
        const Schema = id === undefined ? models_1.WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : models_1.WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions);
        const Analytics = yield Schema;
        if (Analytics === null)
            return 0;
        return Analytics.likes;
    });
}
function getDiscordMe(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const server = client_1.MyBot.guilds.cache.get('1064289165879025836');
        const member = server === null || server === void 0 ? void 0 : server.members.cache.get(id);
        const presence = member === null || member === void 0 ? void 0 : member.presence;
        const activities = (_a = member === null || member === void 0 ? void 0 : member.presence) === null || _a === void 0 ? void 0 : _a.activities.map((m) => { var _a; return (Object.assign(Object.assign({}, m), { emoji: (_a = m.emoji) === null || _a === void 0 ? void 0 : _a.name })); });
        const user = yield (0, axios_1.default)('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `${config_1.ENVIRONMENTS.DISCORD}`
            }
        });
        return Object.assign(Object.assign(Object.assign({}, user.data), { presence: Object.assign(Object.assign({}, presence), { activities }) }), member);
    });
}
function getAbout() {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = client_1.MyBot.channels.cache.get('1090725845427048589');
        if (channel !== undefined && channel.isTextBased())
            return (yield channel.messages.fetch('1090725868797702307')).content;
    });
}
exports.default = {
    getAnalytics,
    additionLike,
    subtractionLike,
    getDiscordMe,
    getAbout
};
