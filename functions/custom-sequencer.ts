// import Sequencer from "@jest/test-sequencer";
// const

// export default class CustomSequencer extends Sequencer {
//     sort(tests) {
//         // Define the desired order of test files
//         const desiredOrder = [
//             "sum.test.js",
//             "users.test.js",
//             "company.test.js",
//             "manufacturer.test.js",
//             "patients.test.js",
//             "order.test.js",
//         ];

//         // Create a new sorted array based on the desired order
//         const sortedTests = desiredOrder.reduce(
//             (sorted, file) => {
//                 const testsForFile = tests.filter((test) =>
//                     test.path.includes(file)
//                 );
//                 return sorted.concat(testsForFile);
//             },
//             []
//         );

//         return sortedTests;
//     }
// }

import Sequencer from "@jest/test-sequencer";

class CustomSequencer extends Sequencer {
    sort(tests) {
        // Define the desired order of test files
        const desiredOrder = [
            "sum.test.js",
            "users.test.js",
            "company.test.js",
            "manufacturer.test.js",
            "patients.test.js",
            "order.test.js",
        ];

        // Create a new sorted array based on the desired order
        const sortedTests = desiredOrder.reduce((sorted, file) => {
            const testsForFile = tests.filter((test) =>
                test.path.includes(file)
            );
            return sorted.concat(testsForFile);
        }, []);

        return sortedTests;
    }
}

export default CustomSequencer;
