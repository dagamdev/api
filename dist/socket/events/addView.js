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
exports.addViewEvent = void 0;
const models_1 = require("../../models");
function addViewEvent(socket, { id, browserID }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const origin = (_a = socket.handshake.headers.origin) !== null && _a !== void 0 ? _a : 'none';
        const updateConfig = [
            { $inc: { view: 1 } },
            { new: true }
        ];
        const byOrigin = id === undefined;
        const schemaMethod = byOrigin ? models_1.WebAnalytics.findOneAndUpdate({ origin }, ...updateConfig) : models_1.WebAnalytics.findByIdAndUpdate(id, ...updateConfig);
        const Analytics = yield schemaMethod;
        if (Analytics === null) {
            socket.emit('analytics', undefined);
            return;
        }
        const browser = Analytics.browsers.find(b => b.id === browserID);
        if (browser === undefined) {
            Analytics.browsers.push({
                id: browserID,
                lastVisitAt: Date.now()
            });
            Analytics.save();
            return;
        }
        browser.lastVisitAt = Date.now();
        socket.emit('analytics', Analytics);
        Analytics.save();
    });
}
exports.addViewEvent = addViewEvent;
