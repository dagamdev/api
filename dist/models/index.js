"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.portfolioModel = void 0;
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
exports.UsersModel = (0, mongoose_1.model)('clients', new mongoose_1.Schema({
    userId: { type: mongoose_1.SchemaTypes.String, required: true, unique: true },
    accessToken: { type: mongoose_1.SchemaTypes.String, required: true },
    refreshToken: { type: mongoose_1.SchemaTypes.String, required: true },
}));
