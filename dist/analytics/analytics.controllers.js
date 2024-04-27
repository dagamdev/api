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
const models_1 = require("../models");
function getAnalytics({ id, origin, browserID }) {
    return __awaiter(this, void 0, void 0, function* () {
        const Analytics = yield (id === undefined ? models_1.WebAnalytics.findOne({ origin }) : models_1.WebAnalytics.findById(id));
        if (Analytics === null) {
            return yield models_1.WebAnalytics.create({
                origin,
                browsers: [{
                        id: browserID,
                        lastVisitAt: Date.now()
                    }]
            });
        }
        const browser = Analytics.browsers.find(b => b.id === browserID);
        if (browser === undefined) {
            Analytics.browsers.push({
                id: browserID,
                liked: false,
                lastVisitAt: Date.now()
            });
            Analytics.save();
        }
        return Analytics;
    });
}
function additionLike({ id, origin }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateOptions = [
            { $inc: { likes: 1 } },
            { new: true }
        ];
        const Schema = id === undefined ? models_1.WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : models_1.WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions);
        const Analytics = yield Schema;
        if (Analytics === null)
            return 0;
        return Analytics.likes;
    });
}
function subtractionLike({ id, origin }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateOptions = [
            { $inc: { likes: -1 } },
            { new: true }
        ];
        const Schema = id === undefined ? models_1.WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : models_1.WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions);
        const Analytics = yield Schema;
        if (Analytics === null)
            return 0;
        return Analytics.likes;
    });
}
exports.default = {
    getAnalytics,
    additionLike,
    subtractionLike
};
