"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    guard: 'web',
    guards: {
        web: {
            driver: 'session',
            provider: {
                driver: 'prisma',
                identifierKey: 'id',
                uids: ['email'],
                model: 'user',
            },
        },
    },
};
exports.default = authConfig;
//# sourceMappingURL=auth.js.map