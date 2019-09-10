var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "To open Login page|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4996,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .nav-item.gnr-log)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .nav-item.gnr-log)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.clickOnLoginButton (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:20:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:12:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:11:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://npmcdn.com/react-bootstrap-table@4.3.1/dist/react-bootstrap-table.min.js 31:30467 Uncaught TypeError: Cannot read property 'Component' of undefined",
                "timestamp": 1539787080287,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #_password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539787081553,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539787081553,
                "type": ""
            }
        ],
        "screenShotFile": "005d0008-00b4-00fa-00e4-00ee00730059.png",
        "timestamp": 1539787085970,
        "duration": 28
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4996,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "ElementNotVisibleError: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:27:21)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:16:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0023003f-000c-0015-00c9-007c001700ae.png",
        "timestamp": 1539787087337,
        "duration": 57
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": false,
        "pending": false,
        "instanceId": 9600,
        "browser": {
            "name": "firefox"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .nav-item.gnr-log)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .nav-item.gnr-log)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.clickOnLoginButton (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:20:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:12:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:11:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00420044-00cc-002c-00d2-001000460059.png",
        "timestamp": 1539787095199,
        "duration": 16
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "instanceId": 9600,
        "browser": {
            "name": "firefox"
        },
        "message": [
            "Failed: Element <input class=\"form-control Input__Input-ixjKAz cbPMbB\" name=\"email\" type=\"text\"> is not reachable by keyboard"
        ],
        "trace": [
            "ElementNotInteractableError: Element <input class=\"form-control Input__Input-ixjKAz cbPMbB\" name=\"email\" type=\"text\"> is not reachable by keyboard\n    at Object.throwDecodedError (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:514:15)\n    at parseHttpResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:519:13)\n    at doSend.then.response (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:27:21)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:16:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "000b0023-0074-00c7-00bb-008e00c900e9.png",
        "timestamp": 1539787095476,
        "duration": 31
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .nav-item.gnr-log)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .nav-item.gnr-log)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.clickOnLoginButton (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:20:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:12:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:11:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://npmcdn.com/react-bootstrap-table@4.3.1/dist/react-bootstrap-table.min.js 31:30467 Uncaught TypeError: Cannot read property 'Component' of undefined",
                "timestamp": 1539787117256,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #_password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539787118539,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539787118539,
                "type": ""
            }
        ],
        "screenShotFile": "00b800d4-00ea-00e1-00e1-00e600f6003d.png",
        "timestamp": 1539787121905,
        "duration": 26
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "ElementNotVisibleError: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:27:21)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:16:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008700e0-00bd-0096-00be-004800fd009d.png",
        "timestamp": 1539787123045,
        "duration": 39
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16688,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .nav-item.gnr-log)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .nav-item.gnr-log)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.clickOnLoginButton (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:20:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:12:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:11:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://npmcdn.com/react-bootstrap-table@4.3.1/dist/react-bootstrap-table.min.js 31:30467 Uncaught TypeError: Cannot read property 'Component' of undefined",
                "timestamp": 1539858180343,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #_password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539858181755,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/ - [DOM] Found 2 elements with non-unique id #password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539858181755,
                "type": ""
            }
        ],
        "screenShotFile": "008c0056-00d7-00e7-00df-00320039005f.png",
        "timestamp": 1539858186037,
        "duration": 26
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16688,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "ElementNotVisibleError: element not interactable\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:27:21)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:16:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00310004-005c-008e-0001-00d900c400b8.png",
        "timestamp": 1539858187501,
        "duration": 51
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": false,
        "pending": false,
        "instanceId": 19996,
        "browser": {
            "name": "firefox"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .nav-item.gnr-log)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .nav-item.gnr-log)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.clickOnLoginButton (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:20:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:12:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:11:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00190096-006a-0096-0046-0038009000ec.png",
        "timestamp": 1539858194981,
        "duration": 23
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "instanceId": 19996,
        "browser": {
            "name": "firefox"
        },
        "message": [
            "Failed: Element <input class=\"form-control Input__Input-ixjKAz cbPMbB\" name=\"email\" type=\"text\"> is not reachable by keyboard"
        ],
        "trace": [
            "ElementNotInteractableError: Element <input class=\"form-control Input__Input-ixjKAz cbPMbB\" name=\"email\" type=\"text\"> is not reachable by keyboard\n    at Object.throwDecodedError (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:514:15)\n    at parseHttpResponse (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:519:13)\n    at doSend.then.response (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:27:21)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:16:21)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f900e5-001d-00bc-0041-00f100920046.png",
        "timestamp": 1539858195259,
        "duration": 34
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21200,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1539858226367,
        "duration": 508
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21200,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, *[name=\"password\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, *[name=\"password\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at LoginPage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Pages\\MarketingWebsite\\LoginPage.js:28:24)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:15:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\Specs\\LoginTest.js:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002a0084-008e-0098-007a-00ca00a10029.png",
        "timestamp": 1539858227151,
        "duration": 272
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": true,
        "pending": false,
        "instanceId": 21212,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1539858238822,
        "duration": 5344
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": true,
        "pending": false,
        "instanceId": 21212,
        "browser": {
            "name": "firefox"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1539858244270,
        "duration": 598
    },
    {
        "description": "To open Login page|To verify login functionality",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10316,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_BLOCKED_BY_CLIENT",
                "timestamp": 1539858519677,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_BLOCKED_BY_CLIENT",
                "timestamp": 1539858519678,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://npmcdn.com/react-bootstrap-table@4.3.1/dist/react-bootstrap-table.min.js 31:30467 Uncaught TypeError: Cannot read property 'Component' of undefined",
                "timestamp": 1539858522914,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/login - [DOM] Found 2 elements with non-unique id #_password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539858524059,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://stg.gener8ads.com/#/login - [DOM] Found 2 elements with non-unique id #password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539858524059,
                "type": ""
            }
        ],
        "timestamp": 1539858519922,
        "duration": 6093
    },
    {
        "description": "To check login functionality|To verify login functionality",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10316,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1539858526173,
        "duration": 467
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19004,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": [
            "Failed: Username is not defined"
        ],
        "trace": [
            "ReferenceError: Username is not defined\n    at addAttendancePage.login (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\PageObjects\\AddAttendance\\AddAttendance.js:23:43)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:12:37)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at SimpleScheduler.execute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2227:17)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:10:9)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:4:5)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561558152684,
                "type": ""
            }
        ],
        "screenShotFile": "0070004c-0007-00e0-00ed-006700bd00c6.png",
        "timestamp": 1561558152565,
        "duration": 12
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8464,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1561558184325,
        "duration": 301
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3412,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561558261570,
                "type": ""
            }
        ],
        "timestamp": 1561558261440,
        "duration": 5272
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19300,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": [
            "Failed: No element found using locator: By(link text, Create Attendance)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(link text, Create Attendance)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at addAttendancePage.openCreateAttendancePage (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\PageObjects\\AddAttendance\\AddAttendance.js:43:36)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:23:33)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:21:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:4:5)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561558423412,
                "type": ""
            }
        ],
        "screenShotFile": "008d0018-00a3-0076-00e2-005c00e500b4.png",
        "timestamp": 1561558423297,
        "duration": 284
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18260,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .fa.fa-sticky-note)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .fa.fa-sticky-note)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at addAttendancePage.openCreateAttendancePage (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\PageObjects\\AddAttendance\\AddAttendance.js:43:36)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:23:33)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:21:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:4:5)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561558480426,
                "type": ""
            }
        ],
        "screenShotFile": "00a50038-00aa-008b-00bc-0006001b0087.png",
        "timestamp": 1561558479136,
        "duration": 315
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8040,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561558530177,
                "type": ""
            }
        ],
        "timestamp": 1561558528424,
        "duration": 11990
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17332,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561559020527,
                "type": ""
            }
        ],
        "timestamp": 1561559020216,
        "duration": 14123
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24256,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561559274137,
                "type": ""
            }
        ],
        "timestamp": 1561559273999,
        "duration": 24330
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12816,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.169"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1561559751795,
                "type": ""
            }
        ],
        "timestamp": 1561559751420,
        "duration": 24382
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25692,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562078036595,
                "type": ""
            }
        ],
        "timestamp": 1562078036463,
        "duration": 11890
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23288,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562163948203,
                "type": ""
            }
        ],
        "timestamp": 1562163948070,
        "duration": 14423
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25412,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562164407443,
                "type": ""
            }
        ],
        "timestamp": 1562164407325,
        "duration": 13154
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27144,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562243659267,
                "type": ""
            }
        ],
        "timestamp": 1562243659136,
        "duration": 12205
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25812,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562310567601,
                "type": ""
            }
        ],
        "timestamp": 1562310567249,
        "duration": 3057
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22656,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562563769240,
                "type": ""
            }
        ],
        "timestamp": 1562563769114,
        "duration": 2441
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9752,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562563807733,
                "type": ""
            }
        ],
        "timestamp": 1562563807607,
        "duration": 2347
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27608,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562563863037,
                "type": ""
            }
        ],
        "timestamp": 1562563862915,
        "duration": 7334
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27352,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562563958018,
                "type": ""
            }
        ],
        "timestamp": 1562563957898,
        "duration": 9158
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26952,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562654994727,
                "type": ""
            }
        ],
        "timestamp": 1562654994600,
        "duration": 9483
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18168,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562738373402,
                "type": ""
            }
        ],
        "timestamp": 1562738372988,
        "duration": 10391
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18168,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1562738383927,
        "duration": 10741
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562824852898,
                "type": ""
            }
        ],
        "timestamp": 1562824852757,
        "duration": 7440
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1562824861708,
        "duration": 9063
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": [
            "Failed: By(css selector, .fa.fa-sticky-note)Test\nWait timed out after 25004ms",
            "Failed: Index out of bound. Trying to access element at index: 0, but there are only 0 elements that match locator By(css selector, .dropdown.user.user-menu)"
        ],
        "trace": [
            "TimeoutError: By(css selector, .fa.fa-sticky-note)Test\nWait timed out after 25004ms\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:23:5)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:6:5\n    at Array.forEach (<anonymous>)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:5:10)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)",
            "NoSuchElementError: Index out of bound. Trying to access element at index: 0, but there are only 0 elements that match locator By(css selector, .dropdown.user.user-menu)\n    at selenium_webdriver_1.promise.all.then (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:274:27)\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at addAttendancePage.logout (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\PageObjects\\AddAttendance\\AddAttendance.js:67:27)\n    at UserContext.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:19:37)\n    at C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new Promise (<anonymous>)\n    at SimpleScheduler.promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2242:12)\n    at schedulerExecute (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at promise (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2232:22)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:17:9)\n    at addSpecsToSuite (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\inno user\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:6:5\n    at Array.forEach (<anonymous>)\n    at Object.<anonymous> (C:\\Testing\\Automation_Generic_Framework\\Automation_Generic_Framework\\e2e\\Specs\\AddAttendanceSpec\\AddAttendanceSpec.js:5:10)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)"
        ],
        "browserLogs": [],
        "screenShotFile": "00680051-0090-0039-008e-009d006a007f.png",
        "timestamp": 1562824870871,
        "duration": 25245
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16724,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562825878096,
                "type": ""
            }
        ],
        "timestamp": 1562825877162,
        "duration": 7271
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562910943972,
                "type": ""
            }
        ],
        "timestamp": 1562910943841,
        "duration": 7816
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1562910951812,
        "duration": 9965
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1562910961891,
        "duration": 10454
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17720,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562941355853,
                "type": ""
            }
        ],
        "timestamp": 1562941355711,
        "duration": 8373
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10412,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563185371892,
                "type": ""
            }
        ],
        "timestamp": 1563185371753,
        "duration": 7164
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10412,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563185379648,
        "duration": 10261
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10412,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563185389979,
        "duration": 8962
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10412,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563185399013,
        "duration": 6944
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15640,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563256425637,
                "type": ""
            }
        ],
        "timestamp": 1563256425434,
        "duration": 10318
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15640,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563256435932,
        "duration": 9168
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15640,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563256445214,
        "duration": 9180
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15640,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563256454476,
        "duration": 7283
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18232,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563342655463,
                "type": ""
            }
        ],
        "timestamp": 1563342655226,
        "duration": 7970
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18232,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563342663770,
        "duration": 9705
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18232,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563342673584,
        "duration": 9725
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3288,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563457988411,
                "type": ""
            }
        ],
        "timestamp": 1563457988288,
        "duration": 8061
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3288,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563457997010,
        "duration": 9644
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3288,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563458006784,
        "duration": 10567
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24252,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563528697948,
                "type": ""
            }
        ],
        "timestamp": 1563528697823,
        "duration": 7163
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24252,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563528705701,
        "duration": 9069
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24252,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563528714852,
        "duration": 9380
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13228,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563791463167,
                "type": ""
            }
        ],
        "timestamp": 1563791461092,
        "duration": 7966
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13228,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563791469219,
        "duration": 7483
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13228,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563791476874,
        "duration": 9591
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24528,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1563978089968,
                "type": ""
            }
        ],
        "timestamp": 1563978089848,
        "duration": 9162
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24528,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563978099443,
        "duration": 9085
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24528,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1563978108606,
        "duration": 8988
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564037693859,
                "type": ""
            }
        ],
        "timestamp": 1564037693735,
        "duration": 8465
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564037702453,
        "duration": 11409
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564037713985,
        "duration": 10368
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18652,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564123985610,
                "type": ""
            }
        ],
        "timestamp": 1564123985485,
        "duration": 8232
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18652,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564123993894,
        "duration": 10431
    },
    {
        "description": "To assert sub brand management page title. [SBM-1]|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18652,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564124004416,
        "duration": 10247
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16520,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564382052047,
                "type": ""
            }
        ],
        "timestamp": 1564382051922,
        "duration": 9243
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16520,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564382061621,
        "duration": 9142
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16520,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564382070842,
        "duration": 9020
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25824,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564479207777,
                "type": ""
            }
        ],
        "timestamp": 1564479207656,
        "duration": 9596
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25824,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564479217728,
        "duration": 9124
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25824,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564479226945,
        "duration": 9106
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24744,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564557521945,
                "type": ""
            }
        ],
        "timestamp": 1564557521473,
        "duration": 8343
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24744,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564557530059,
        "duration": 9940
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24744,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564557540103,
        "duration": 10334
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1564640447577,
                "type": ""
            }
        ],
        "timestamp": 1564640447119,
        "duration": 7781
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564640455425,
        "duration": 8639
    },
    {
        "description": "To Add attendance in Innovfiy ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 164,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1564640464144,
        "duration": 8299
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10704,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565011407515,
                "type": ""
            }
        ],
        "timestamp": 1565011407377,
        "duration": 7116
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10704,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565011415129,
        "duration": 8985
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10704,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565011424181,
        "duration": 9286
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565069274682,
                "type": ""
            }
        ],
        "timestamp": 1565069274565,
        "duration": 10009
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565069284654,
        "duration": 9277
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565069294027,
        "duration": 9386
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14140,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565159888856,
                "type": ""
            }
        ],
        "timestamp": 1565159888733,
        "duration": 7191
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14140,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565159896381,
        "duration": 9084
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14140,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565159905541,
        "duration": 9020
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565247695469,
                "type": ""
            }
        ],
        "timestamp": 1565247693914,
        "duration": 7122
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565247701929,
        "duration": 9190
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565247711227,
        "duration": 9185
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6432,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565342335131,
                "type": ""
            }
        ],
        "timestamp": 1565342334985,
        "duration": 7133
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6432,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565342342784,
        "duration": 9146
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6432,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565342352013,
        "duration": 9081
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16664,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565591821810,
                "type": ""
            }
        ],
        "timestamp": 1565591821692,
        "duration": 9940
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16664,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565591831845,
        "duration": 9551
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16664,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565591841494,
        "duration": 9832
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565679377788,
                "type": ""
            }
        ],
        "timestamp": 1565679377661,
        "duration": 10359
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565679388494,
        "duration": 9982
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12624,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565679398607,
        "duration": 10150
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10104,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565761230887,
                "type": ""
            }
        ],
        "timestamp": 1565761229983,
        "duration": 8148
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10104,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565761238298,
        "duration": 9780
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10104,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1565761248207,
        "duration": 10226
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22772,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565761363783,
                "type": ""
            }
        ],
        "timestamp": 1565761363553,
        "duration": 8197
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12940,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566224017585,
                "type": ""
            }
        ],
        "timestamp": 1566224017063,
        "duration": 9435
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12940,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566224027002,
        "duration": 9860
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12940,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566224036934,
        "duration": 9200
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22236,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566309024433,
                "type": ""
            }
        ],
        "timestamp": 1566309024035,
        "duration": 7154
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22236,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566309031597,
        "duration": 9220
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22236,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566309040899,
        "duration": 9133
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9856,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566398306095,
                "type": ""
            }
        ],
        "timestamp": 1566398305958,
        "duration": 9472
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9856,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566398315742,
        "duration": 9179
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9856,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566398324999,
        "duration": 10976
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10792,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566476972215,
                "type": ""
            }
        ],
        "timestamp": 1566476972106,
        "duration": 9582
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10792,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566476982446,
        "duration": 9211
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10792,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566476991716,
        "duration": 9142
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15444,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566547299420,
                "type": ""
            }
        ],
        "timestamp": 1566547299289,
        "duration": 8644
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15444,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566547308223,
        "duration": 10741
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15444,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566547319105,
        "duration": 10904
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19768,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566806469604,
                "type": ""
            }
        ],
        "timestamp": 1566806469479,
        "duration": 10756
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19768,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566806480531,
        "duration": 10415
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19768,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566806491101,
        "duration": 10060
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3780,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1566903081738,
                "type": ""
            }
        ],
        "timestamp": 1566903081622,
        "duration": 8532
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3780,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566903090399,
        "duration": 10262
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3780,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1566903100763,
        "duration": 10417
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13352,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567003232275,
                "type": ""
            }
        ],
        "timestamp": 1567003232124,
        "duration": 9852
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13352,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567003242578,
        "duration": 9753
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13352,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567003252428,
        "duration": 9656
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1252,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567061035713,
                "type": ""
            }
        ],
        "timestamp": 1567061035583,
        "duration": 9933
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1252,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567061045790,
        "duration": 9822
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1252,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567061055712,
        "duration": 9986
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2012,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567143115841,
                "type": ""
            }
        ],
        "timestamp": 1567143115557,
        "duration": 10693
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2012,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567143126400,
        "duration": 7648
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2012,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567143134271,
        "duration": 12398
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24668,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567408570275,
                "type": ""
            }
        ],
        "timestamp": 1567408569724,
        "duration": 13284
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24668,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567408587832,
        "duration": 16224
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24668,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567408604195,
        "duration": 10931
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12964,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567505343221,
                "type": ""
            }
        ],
        "timestamp": 1567505343080,
        "duration": 7176
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12964,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567505351018,
        "duration": 8506
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3184,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567606918740,
                "type": ""
            }
        ],
        "timestamp": 1567606918618,
        "duration": 9264
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3184,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567606928308,
        "duration": 8950
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3184,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567606937341,
        "duration": 8928
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12048,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567669489001,
                "type": ""
            }
        ],
        "timestamp": 1567669488853,
        "duration": 9961
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12048,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567669499441,
        "duration": 9187
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10100,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567774550462,
                "type": ""
            }
        ],
        "timestamp": 1567774550338,
        "duration": 9324
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10100,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567774559826,
        "duration": 9146
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10100,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567774569052,
        "duration": 6864
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14532,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1567779952527,
                "type": ""
            }
        ],
        "timestamp": 1567779952398,
        "duration": 7031
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14532,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567779959530,
        "duration": 7055
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14532,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1567779966695,
        "duration": 7098
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13492,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://innoattendance.innovify.com/attandance/backend/web/site/login/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1568009905667,
                "type": ""
            }
        ],
        "timestamp": 1568009905545,
        "duration": 9126
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13492,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1568009915154,
        "duration": 9050
    },
    {
        "description": "To Add attendance in Innovify ParkStreet.|To add attendance.",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13492,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "timestamp": 1568009924291,
        "duration": 9040
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
