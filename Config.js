
var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
var HTMLReport = require('protractor-html-reporter');
var fs = require('fs-extra');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var log4js = require('log4js');
var rimraf = require('rimraf');
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {

 //  seleniumAddress: 'http://localhost:4444/wd/hub',

  directConnect: true,

  multiCapabilities: [
            		 {
             			 browserName: 'chrome',
             			chromeOptions: {
             			 args: [
        //  		  		'--headless','--window-size=1280,1024',
         //    			       '--disable-gpu','no-sandbox', 'incognito'
           		  '--start-maximized','incognito'
								   ] 
							}
             			 },
             		//  {
             		// 		browserName: 'firefox',
             		// 		'moz:firefoxOptions': {
             		// //		     args: [ "--headless" ]
             		// 		   }
             		//  }
            		 ],


  framework: 'jasmine2',

  onPrepare: function() {

    rimraf('./Log/*', function () {
    log4js.configure({
    appenders: {
    out:{ type: 'console' },
    app:{ type: 'file', filename: 'Log/e2e_execution.log' }
    },
    categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
    });
  });
    global.logger = log4js.getLogger();

    global.stepLogger = function(text){
        logger.info(`Step : ${text}`);
    }

    global.assertLogger = function(text){
        logger.info(`Verification : ${text}`);
	}
	
	global.caseId = function(text) {
		logger.info(`-----------------------------------${text}--------------------------------------`);
	}

	global.preCondition = function() {
		logger.info('---------------------------------Pre-Condtion------------------------------------');
	}

	global.postCondition = function() {
		logger.info('---------------------------------Post-Condtion------------------------------------');
	}

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
		   savePath: './Jasmine Reports',
		   takeScreenshots: true,
		   takeScreenshotsOnlyOnFailures: true
		}));

	    jasmine.getEnv().addReporter(new SpecReporter({
          displayFailuresSummary: true,
          displayFailedSpec: true,
          displaySuiteNumber: true,
          displaySpecDuration: true,
	    }));
	  
	  jasmine.getEnv().addReporter(new HtmlReporter({
		baseDirectory: 'Interactive Report/screenshots'
		, takeScreenShotsOnlyForFailedSpecs: true
	 	}).getJasmine2Reporter());

		  var jasmineReporters = require('jasmine-reporters');
		   jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
		       consolidateAll: true,
		       savePath: './',
		       filePrefix: 'test_xmlresults.xml'
		    }));
		  fs.emptyDir('test_screenshots/', function (err) {
		          console.log(err);
		      });

		      jasmine.getEnv().addReporter({
		          specDone: function(result) {
		              if (result.status == 'failed') {
		                  browser.getCapabilities().then(function (caps) {
		                      var browserName = caps.get('browserName');

		                      browser.takeScreenshot().then(function (png) {
		                          var stream = fs.createWriteStream('test_screenshots/' + browserName + '-' + result.fullName+ '.png');
		                          stream.write(new Buffer(png, 'base64'));
		                          stream.end();
		                      });
		                  });
		              }
		          }
		      });
	  },

	  onComplete: function() {
		     var browserName, browserVersion;
		     var capsPromise = browser.getCapabilities();

		     capsPromise.then(function (caps) {
		        browserName = caps.get('browserName');
		        browserVersion = caps.get('version');
		        platform = caps.get('platform');

		        testConfig = {
		            reportTitle: ' Test    Execution Report',
		            outputPath: './Pie-Chart Report',
		            outputFilename: 'TestReport',
		            screenshotPath: './test_screenshots',
		            testBrowser: browserName,
		            browserVersion: browserVersion,
		            modifiedSuiteName: false,
		            screenshotsOnlyOnFailure: true,
		            testPlatform: platform
		        };
		        new HTMLReport().from('test_xmlresults.xml', testConfig);
		    });
	  },

	  
  suites: {
    Smoke : ['./Specs/LoginTest.js'],
  },

  // Testing URL
  
  baseUrl: "http://stg.gener8ads.com/mktweb",

  // Important Parameters
  params: {
	  admin: {
	  	username: 'user',
	  	password: 'password'
	  },
	  nonAdmin: {
		username: 'user',
		password: 'password'
	  },
  },

    jasmineNodeOpts: {
    	defaultTimeoutInterval: 400000,
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
    },

    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 400000
};
