/**
 * @jest-environment jsdom
 */

const { getEnvironmentData } = require("worker_threads");
const {formValidationCheck} = require("../script");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("get data once form validated", () => {
    describe("check if form is valid on submit", () => {
        test("should return true", () => {
            expect(formValidationCheck).toBeTruthy();
        });
    });
});

// describe('array containing country names', () => {
//     const expectedCountries = ['United Kingdom','Greece'];
//     it('matches even if contains additional elements', () => {
//         expect(['United Kingdom', 'Greece', 'Cyrpus']).toEqual(expect.arrayContaining(expectedCountries));
//       }); 
// });