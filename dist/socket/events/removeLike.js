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
exports.removeLikeEvent = void 0;
const models_1 = require("../../models");
const __1 = require("..");
function removeLikeEvent(socket, { id, browserID }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const origin = (_a = socket.handshake.headers.origin) !== null && _a !== void 0 ? _a : 'none';
        const byOrigin = id === undefined;
        const schemaMethod = byOrigin ? models_1.WebAnalytics.findOne({ origin }) : models_1.WebAnalytics.findById(id);
        const Analytics = yield schemaMethod;
        if (Analytics === null) {
            const NewAnalytics = yield models_1.WebAnalytics.create({
                origin,
                browsers: [
                    {
                        id: browserID,
                        lastVisitAt: Date.now()
                    }
                ]
            });
            __1.io.emit('analytics', NewAnalytics);
            return;
        }
        const browser = Analytics.browsers.find(b => b.id === browserID);
        if (browser === undefined) {
            Analytics.likes--;
            Analytics.browsers.push({
                id: browserID,
                liked: false,
                lastVisitAt: Date.now()
            });
            yield Analytics.save();
            __1.io.emit('analytics', Analytics);
            return;
        }
        if (browser.liked) {
            Analytics.likes--;
            browser.liked = false;
            yield Analytics.save();
        }
        __1.io.emit('analytics', Analytics);
    });
}
exports.removeLikeEvent = removeLikeEvent;
