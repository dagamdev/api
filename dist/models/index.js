"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAnalytics = void 0;
const mongoose_1 = require("mongoose");
const Browser = new mongoose_1.Schema({
    id: { type: String, require: true, default: '' },
    liked: { type: Boolean, require: true, default: false },
    lastVisitAt: { type: Number, require: true, default: 0 }
});
exports.WebAnalytics = (0, mongoose_1.model)('web analytics', new mongoose_1.Schema({
    views: { type: Number, default: 1 },
    likes: { type: Number, default: 0 },
    origin: { type: String, require: true },
    browsers: { type: [Browser], require: true }
}));
