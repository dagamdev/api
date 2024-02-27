"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const iconQueries = zod_1.z.object({
    url: zod_1.z.string().url().optional(),
    theme: zod_1.z.literal('dark').or(zod_1.z.literal('light')).optional()
});
exports.default = {
    iconQueries
};
