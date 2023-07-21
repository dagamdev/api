"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioModel = void 0;
const mongoose_1 = require("mongoose");
const SkillSchema = new mongoose_1.Schema({
    name: String,
    percent: Number,
    iconClass: String
});
exports.portfolioModel = (0, mongoose_1.model)('portfolio', new mongoose_1.Schema({
    _id: { type: String, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
    skills: [{ type: SkillSchema, required: true }]
}));
