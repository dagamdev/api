"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.default = {
    getMessage(channelId, messageId) {
        return fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`, {
            headers: {
                'Authorization': `Bot ${config_1.ENVIRONMENTS.BOT_TOKEN}`
            }
        }).then(prom => prom.json());
    }
};
