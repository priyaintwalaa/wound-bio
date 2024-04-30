// import CustomSequencer from "./custom-sequencer.js";

// export default {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     extensionsToTreatAsEsm: [".ts"],
//     moduleNameMapper: {
//         "^(\\.{1,2}/.*)\\.js$": "$1",
//     },
//     transform: {
//         "^.+\\.ts$": [
//             "ts-jest",
//             {
//                 useESM: true,
//             },
//         ],
//     },
// 	testSequencer: "./custom-sequencer.js"
// };

import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    // testSequencer: "./custom-sequencer.js",
};

export default config;
