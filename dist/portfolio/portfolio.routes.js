"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_services_1 = __importDefault(require("./portfolio.services"));
const route = (0, express_1.Router)();
route.route('/views')
    .get(portfolio_services_1.default.getViews)
    .put(portfolio_services_1.default.additionViews);
route.route('/likes')
    .get(portfolio_services_1.default.getLikes)
    .put(portfolio_services_1.default.additionLike);
route.route('/skills')
    .get(portfolio_services_1.default.getAllSkills)
    .post(portfolio_services_1.default.createSkill)
    .delete(portfolio_services_1.default.deleteSkill);
exports.default = route;
