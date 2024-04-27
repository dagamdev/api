"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_services_1 = __importDefault(require("./analytics.services"));
const route = (0, express_1.Router)();
route.route('/')
    .get(analytics_services_1.default.getAnalytics);
route.route('/likes')
    .put(analytics_services_1.default.additionLike)
    .delete(analytics_services_1.default.subtractionLike);
exports.default = route;
