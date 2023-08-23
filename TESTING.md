# Testing

Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Page | W3C URL | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | [W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fstaceyjaynelewis.github.io%2Fholiday-hotspots%2F) | ![screenshot](documentation/html-validation.jpg) | Pass: No errors or warnings to show |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| File | Jigsaw URL | Screenshot | Notes |
| --- | --- | --- | --- |
| style.css | [Jigsaw](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fstaceyjaynelewis.github.io%2Fholiday-hotspots%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) | ![screenshot](documentation/css-validation.jpg) ![screenshot](documentation/css-validation-2.jpg) | Pass: No Errors - many warnings of the bootstrap built in components but no error or warnings on my own code |

### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

| File | Screenshot | Notes |
| --- | --- | --- |
| script.js | ![screenshot](documentation/js-validator.jpg) | Pass: no errors |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Screenshot | Notes |
| --- | --- | --- |
| Chrome | ![screenshot](documentation/chrome-compatible.jpg) | Works as expected |
| Firefox | ![screenshot](documentation/firefox-comaptibility.jpg) | Works as expected |
| Brave | ![screenshot](documentation/brave-compatibility.jpg) | Works as expected |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Screenshot | Notes |
| --- | --- | --- |
| Mobile (DevTools - built in mobile Samsung8+) | ![screenshot](documentation/mobile-responsive.gif) | Works as expected |
| Mobile (DevTools version2) | ![screenshot](documentation/mobile-responsive(2).gif) | Works as expected |
| Tablet (DevTools) | ![screenshot](documentation/tablet-devtools.gif) | Works as expected |
| Tablet (DevTools - built in ipadAir & ipadMini) | ![screenshot](documentation/tablet-built-in.gif) | Works as expected |
| Desktop | ![screenshot](documentation/desktop-responsive.gif) | Works as expected |
| Google Pixel 7 | ![screenshot](documentation/google-pixel-7.gif) | Works as expected |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | Mobile | ![screenshot](documentation/lighthouse-mobile.jpg) | Some minor warnings |
| Home | Desktop | ![screenshot](documentation/lighthouse-desktop.jpg) | Some minor warnings |

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page | User Action | Expected Result | Pass/Fail | Comments |
| --- | --- | --- | --- | --- |
| Callout | | | | |
| | Country Input | Dropdown appears with list of countries when clicked | Pass | |
| | Country Input | Displays tool tip that says 'Please select an item in a list' if search clicked but no country selected from the dropdown | Pass | |
| | City Input | Dropdown appears with list of cities when clicked | Pass | |
| | City Input | When a country is selected city input automatically displays first city in list  | Pass | |
| | Search button | disables when clicked until 'clear search' is clicked | Pass | |
| | Search button | if both inputs are valid displays search results of attractions in selected city when clicked in destinations section | Pass | |
| | Search button | When clicked if no data for that city, display alert message in destination section of page | Pass | |
| | Clear Search Button | resets form inputs | Pass | |
| | Clear Search Button | clear search is disabled until search is clicked and higlights when search is clicked | Pass | |
| | Clear Search Button | clears search results and displays original recommended destination cards | Pass | |
| | Clear Search Button | if an alert is displayed - removes the alert once selected | Pass | |
| | Arrow Button | when clicked moves to the attraction results section of the page | Pass | |
| Destinations section | | | | |
| | Popular attraction cards | 'Read more' button opens new page with related information on that city e.g big ben, disneyland etc | Pass | |
| | Search results cards | cards 'read more' button opens new page with related information on that attraction, I tested the test data cities' attractions (paris, berlin, london, new york) | Pass | |
| | Search results cards | cards display in responsive columns and rows | Pass | |
| | Back to top link | Springs back to the top of the page when clicked | Pass | |
| Footer | | | | |
| | facebook icon link | on click opens a new page tab to facebook page | Pass | |
| | instagram icon link | on click opens a new page tab to instagram page | Pass | |
| | twitter icon link | on click opens a new page tab to twitter page | Pass | |
| | email icon link | on click opens a new page tab to gmail page | Pass | |


## User Story Testing

| User Story | Screenshot |
| --- | --- |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature01.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature02.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature03.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature04.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature05.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/feature06.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/feature07.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/feature08.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/feature09.png) |
| repeat for all remaining user stories | x |
 
## Automated Testing

I have conducted a series of automated tests on my application.

I fully acknowledge and understand that, in a real-world scenario, an extensive set of additional tests would be more comprehensive.

### JavaScript (Jest Testing)

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Adjust the code below (file names, etc.) to match your own project files/folders.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

I have used the [Jest](https://jestjs.io) JavaScript testing framework to test the application functionality.

In order to work with Jest, I first had to initialize NPM.

- `npm init`
- Hit `enter` for all options, except for **test command:**, just type `jest`.

Add Jest to a list called **Dev Dependencies** in a dev environment:

- `npm install --save-dev jest`

**IMPORTANT**: Initial configurations

When creating test files, the name of the file needs to be `file-name.test.js` in order for Jest to properly work.

Due to a change in Jest's default configuration, you'll need to add the following code to the top of the `.test.js` file:

```js
/**
 * @jest-environment jsdom
 */

const { test, expect } = require("@jest/globals");
const { function1, function2, function3, etc. } = require("../script-name");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});
```

Remember to adjust the `fs.readFileSync()` to the specific file you'd like you test.
The example above is testing the `index.html` file.

Finally, at the bottom of the script file where your primary scripts are written, include the following at the bottom of the file.
Make sure to include the name of all of your functions that are being tested in the `.test.js` file.

```js
if (typeof module !== "undefined") module.exports = {
    function1, function2, function3, etc.
};
```

Now that these steps have been undertaken, further tests can be written, and be expected to fail initially.
Write JS code that can get the tests to pass as part of the Red-Green refactor process.

Once ready, to run the tests, use this command:

- `npm test`

**NOTE**: To obtain a coverage report, use the following command:

- `npm test --coverage`

Below are the results from the tests that I've written for this application:

| Test Suites | Tests | Coverage | Screenshot |
| --- | --- | --- | --- |
| 1 passed | 16 passed | 55% | ![screenshot](documentation/js-test-coverage.png) |
| x | x | x | repeat for all remaining tests |

#### Jest Test Issues

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this section to list any known issues you ran into while writing your Jest tests.
Remember to include screenshots (where possible), and a solution to the issue (if known).

This can be used for both "fixed" and "unresolved" issues.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

## Bugs

- JS Uncaught ReferenceError: `foobar` is undefined/not defined

    ![screenshot](documentation/bug01.png)

    - To fix this, I _____________________.

- JS `'let'` or `'const'` or `'template literal syntax'` or `'arrow function syntax (=>)'` is available in ES6 (use `'esversion: 11'`) or Mozilla JS extensions (use moz).

    ![screenshot](documentation/bug02.png)

    - To fix this, I _____________________.

- Python `'ModuleNotFoundError'` when trying to import module from imported package

    ![screenshot](documentation/bug03.png)

    - To fix this, I _____________________.

- Django `TemplateDoesNotExist` at /appname/path appname/template_name.html

    ![screenshot](documentation/bug04.png)

    - To fix this, I _____________________.

- Python `E501 line too long` (93 > 79 characters)

    ![screenshot](documentation/bug04.png)

    - To fix this, I _____________________.

### GitHub **Issues**

I have used github issues to manage my bugs and keep a tracker of the problem and how I solved them for the above bug noted above in the bug's section.
Here is the link to view my bug solving journey: https://github.com/staceyJayneLewis/holiday-hotspots/issues

**Fixed Bugs**

All previously closed/fixed bugs can be tracked [here](https://github.com/staceyJayneLewis/holiday-hotspots/issues?q=is%3Aissue+is%3Aclosed).

| Bug | Status |
| --- | --- |
| [JS Uncaught ReferenceError: `foobar` is undefined/not defined](https://github.com/staceyJayneLewis/holiday-hotspots/issues/1) | Closed |
| [Python `'ModuleNotFoundError'` when trying to import module from imported package](https://github.com/staceyJayneLewis/holiday-hotspots/issues/2) | Closed |
| [Django `TemplateDoesNotExist` at /appname/path appname/template_name.html](https://github.com/staceyJayneLewis/holiday-hotspots/issues/3) | Closed |

**Open Issues**

There are currently no open issues in github.

## Unfixed Bugs

- When validating with CSS with a semantic `section` element, the validator warns about lacking a header `h2-h6`. This is acceptable.

    ![screenshot](documentation/unfixed-bug03.png)

    - Attempted fix: this was expected as I have used bootstrap cdN and the validator does not recognise this so it will attempt to validate the bootstrap code and throw this error. 

- When using the amadeus api it does not retrieve the all of the data as it is a test api and if a city is not in the test data it will show an error message.

- Performance?
