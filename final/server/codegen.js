"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    schema: "./src/schema.ts",
    generates: {
        "./src/types.ts": {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                contextType: "./context#TrackContext",
                mappers: {
                    Track: "./models#TrackModel"
                }
            }
        },
    },
};
exports.default = config;
