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
exports.addLikeEvent = void 0;
const models_1 = require("../../models");
function addLikeEvent(socket, { id, browserID }) {
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
                        liked: true,
                        lastVisitAt: Date.now()
                    }
                ]
            });
            socket.broadcast.emit('analytics', NewAnalytics);
            return;
        }
        const browser = Analytics.browsers.find(b => b.id === browserID);
        if (browser === undefined) {
            Analytics.browsers.push({
                id: browserID,
                liked: true,
                lastVisitAt: Date.now()
            });
            yield Analytics.save();
            socket.broadcast.emit('analytics', Analytics);
            return;
        }
        if (!browser.liked) {
            browser.liked = true;
            Analytics.save();
        }
        socket.broadcast.emit('analytics', Analytics);
    });
}
exports.addLikeEvent = addLikeEvent;
