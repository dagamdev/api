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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const config_1 = require("../config");
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
exports.default = {
    getViews,
    additionViews,
    getLikes,
    additionLike,
    getAllSkills,
    createSkill,
    deleteSkill
};
