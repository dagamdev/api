"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    return req.user ? next() : res.status(401).send({
        message: 'Unauthorized'
    });
}
exports.isAuthenticated = isAuthenticated;
