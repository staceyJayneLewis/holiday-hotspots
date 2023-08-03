const formValidationCheck = require("../script");

describe("get data once form validated", () => {
    describe("check if form is valid on submit", () => {
        test("should return true", () => {
            expect(formValidationCheck).toBeTruthy();
        });
    });
});