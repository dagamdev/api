"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const config_1 = require("./utils/config");
require("./db");
const { PORT, IN_DEVELOPING } = config_1.ENVIRONMENTS;
console.log(`Node.js ${process.version}`);
socket_1.server.listen(PORT, () => {
    console.log(`🏃 Server is runing in the port ${PORT} | http${IN_DEVELOPING
        ? ''
        : 's'}:${IN_DEVELOPING
        ? 'localhost:' + PORT
        : PORT}/api/v1`);
});
