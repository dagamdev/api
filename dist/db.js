"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("./utils/config");
(0, mongoose_1.set)('strictQuery', true);
if (config_1.ENVIRONMENTS.CONNECT_MONGO !== undefined) {
    (0, mongoose_1.connect)(config_1.ENVIRONMENTS.CONNECT_MONGO).then(() => { console.log('✅ Connected to database'); })
        .catch(err => { console.log(err); });
}
