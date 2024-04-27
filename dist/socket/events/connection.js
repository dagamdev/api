"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connnectionEvent = void 0;
const addView_1 = require("./addView");
const addLike_1 = require("./addLike");
const removeLike_1 = require("./removeLike");
const connnectionEvent = (socket) => {
    socket.on('addView', (data) => {
        (0, addView_1.addViewEvent)(socket, data);
    });
    socket.on('addLike', (data) => {
        (0, addLike_1.addLikeEvent)(socket, data);
    });
    socket.on('removeLike', (data) => {
        (0, removeLike_1.removeLikeEvent)(socket, data);
    });
};
exports.connnectionEvent = connnectionEvent;
