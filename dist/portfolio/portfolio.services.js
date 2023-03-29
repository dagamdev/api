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
const portfolio_controllers_1 = __importDefault(require("./portfolio.controllers"));
const getViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const views = yield portfolio_controllers_1.default.getViews();
        res.status(200).json({ views });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const additionViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const views = yield portfolio_controllers_1.default.additionViews();
        res.status(200).json({ views });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield portfolio_controllers_1.default.getLikes();
        res.status(200).json({ likes });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const additionLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield portfolio_controllers_1.default.additionLike();
        res.status(200).json({ likes });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const subtractionLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield portfolio_controllers_1.default.subtractionLike();
        res.status(200).json({ likes });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const getAllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield portfolio_controllers_1.default.getAllSkills();
        res.status(200).json({ skills });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, percent, iconClass } = req.body;
        if (!name || !percent || !iconClass)
            return res.status(404).json({
                message: 'field not found',
                fields: {
                    name: 'String',
                    percent: 'Number',
                    iconClass: 'String'
                }
            });
        const skills = yield portfolio_controllers_1.default.createSkill({ name, percent, iconClass });
        res.status(200).json({ maessage: 'Success full', skills });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { index } = req.params;
        const skills = yield portfolio_controllers_1.default.deleteSkill(parseInt(index));
        res.status(201).json({ messaje: 'Deleted skill', skills });
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const getDiscordMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield portfolio_controllers_1.default.getDiscordMe(id);
        res.status(200).json(Object.assign({ presence: data === null || data === void 0 ? void 0 : data.presence }, data));
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
const getAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield portfolio_controllers_1.default.getAbout();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
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
