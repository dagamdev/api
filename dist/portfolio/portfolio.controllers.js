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
const config_1 = require("../config");
const client_1 = require("../client");
const axios_1 = __importDefault(require("axios"));
const getViews = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.views;
});
const additionViews = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    if (!portfolio)
        return;
    portfolio.views++;
    yield portfolio.save();
    return portfolio.views;
});
const getLikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.likes;
});
const additionLike = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    if (!portfolio)
        return;
    portfolio.likes++;
    yield portfolio.save();
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.likes;
});
const subtractionLike = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    if (!portfolio)
        return;
    portfolio.likes--;
    yield portfolio.save();
    return portfolio.likes;
});
const getAllSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.skills;
});
const createSkill = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.skills.push(data);
    yield (portfolio === null || portfolio === void 0 ? void 0 : portfolio.save());
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.skills;
});
const deleteSkill = (index) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.skills.splice(index, 1);
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.save();
    return portfolio === null || portfolio === void 0 ? void 0 : portfolio.skills;
});
const getDiscordMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const server = client_1.client.guilds.cache.get('1064289165879025836');
    const member = server === null || server === void 0 ? void 0 : server.members.cache.get(id);
    const presence = member === null || member === void 0 ? void 0 : member.presence;
    const activities = (_a = member === null || member === void 0 ? void 0 : member.presence) === null || _a === void 0 ? void 0 : _a.activities.map((m) => { var _a; return (Object.assign(Object.assign({}, m), { emoji: (_a = m.emoji) === null || _a === void 0 ? void 0 : _a.name })); });
    const user = yield (0, axios_1.default)('https://discord.com/api/v10/users/@me', {
        headers: {
            'Authorization': `${config_1.discord}`
        }
    });
    return Object.assign(Object.assign(Object.assign({}, user.data), { presence: Object.assign(Object.assign({}, presence), { activities }) }), member);
});
const getAbout = () => __awaiter(void 0, void 0, void 0, function* () {
    const channel = client_1.client.channels.cache.get('1090725845427048589');
    if (channel === null || channel === void 0 ? void 0 : channel.isTextBased())
        return (yield channel.messages.fetch('1090725868797702307')).content;
});
exports.default = {
    getViews,
    additionViews,
    getLikes,
    additionLike,
    subtractionLike,
    getAllSkills,
    createSkill,
    deleteSkill,
    getDiscordMe,
    getAbout
};
