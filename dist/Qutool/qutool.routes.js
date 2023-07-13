"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const qutool_services_1 = __importDefault(require("./qutool.services"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.get('/auth', passport_1.default.authenticate('discord'));
router.get('/auth/redirect', passport_1.default.authenticate('discord', {
    successRedirect: `${config_1.ENVIRONMENTS.PAGE_DOMAIN}/dashboard`,
    failureRedirect: `${config_1.ENVIRONMENTS.PAGE_DOMAIN}/`
}));
router.get('/user', auth_middleware_1.isAuthenticated, qutool_services_1.default.getUser);
router.get('/logout', auth_middleware_1.isAuthenticated, qutool_services_1.default.authLogout);
router.get('/TOS', qutool_services_1.default.getTermsOfService);
router.get('/PP', qutool_services_1.default.getPrivacyPolicy);
exports.default = router;
