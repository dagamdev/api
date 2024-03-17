"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const web_controllers_1 = __importDefault(require("./web.controllers"));
const route = (0, express_1.Router)();
route.get('/icon', web_controllers_1.default.getWebIcon);
route.get('/data', web_controllers_1.default.getWebData);
exports.default = route;
