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
exports.addLikesEvent = void 0;
const config_1 = require("../config");
const models_1 = require("../models");
const addLikesEvent = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield models_1.portfolioModel.findById(config_1.appId);
    if (portfolio) {
        portfolio.likes++;
        socket.broadcast.emit('like', portfolio.likes);
        yield portfolio.save();
    }
    else
        socket.broadcast.emit('like', 0);
});
exports.addLikesEvent = addLikesEvent;
