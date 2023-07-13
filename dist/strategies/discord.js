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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const config_1 = require("../config");
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UsersModel.findById(id);
        return user ? done(null, user) : done(null, null);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: config_1.ENVIRONMENTS.QUTOOL_ID || '',
    clientSecret: config_1.ENVIRONMENTS.QUTOOL_SECRET || '',
    callbackURL: `${config_1.ENVIRONMENTS.DOMAIN}/api/v1/Qutool/auth/redirect`,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UsersModel.findOneAndUpdate({ userId: profile.id }, {
            accessToken, refreshToken
        }, { new: true });
        if (user)
            return done(null, user);
        const newUser = yield models_1.UsersModel.create({
            userId: profile.id,
            accessToken,
            refreshToken
        });
        yield newUser.save();
        return done(null, newUser);
    }
    catch (error) {
        console.error(error);
        done(error);
    }
})));
