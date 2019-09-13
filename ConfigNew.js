var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
var HTMLReport = require('protractor-html-reporter');
var fs = require('fs-extra');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var log4js = require('log4js');
var rimraf = require('rimraf');
var HtmlReporter = require('protractor-beautiful-reporter');
var AllureReporter = require('jasmine-allure-reporter');

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
		logger.info('---------------------------------Pre-Condition------------------------------------');
	}

	global.postCondition = function() {
		logger.info('---------------------------------Post-Condition------------------------------------');
	}

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
			savePath: './Jasmine Reports',
			takeScreenshots: true,
			takeScreenshotsOnlyOnFailures: true,
			// consolidate: false,
			//    consolidateAll: false,
			   showPassed: true
		}));

	    jasmine.getEnv().addReporter(new SpecReporter({
          displayFailuresSummary: true,
          displayFailedSpec: true,
          displaySuiteNumber: true,
          displaySpecDuration: true,
		}));
		

	  
	  jasmine.getEnv().addReporter(new HtmlReporter({
		baseDirectory: 'Interactive Report/screenshots', 
		takeScreenShotsOnlyForFailedSpecs: true
		 }).getJasmine2Reporter());
		 
	
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });

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
			
			///Nodemailer Code

			var nodemailer = require("nodemailer");
			var transport = nodemailer.createTransport({
			service: 'Gmail',
    				auth: {
        				user: "vujkdkolks@gmail.com",
       					pass: "Test@123"
    }
					});
		var mailOptions = {
    		from: 'vujkdkolks@gmail.com', // sender address
    		to: 'thisisqa2108@gmail.com', // list of receivers
    		subject: 'Automation Result', // Subject line
			//text: info.body,
    		text: 'Contains the test result for the smoke test in html file', // plaintext body
    attachments: [
        {
            'path': 'file:///C:/Testing/Automation_Generic_Framework/Automation_Generic_Framework/Pie-Chart%20Report/chrome-test-report.html',
        }]
		};
transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
		response.send(err);
    } else {
        console.log("Message sent: " + info.response);
		response.send(info);
    }
});

	  },

	  
  suites: {
    Smoke : ['C:/Testing/automation/JenkinsDemo/e2e/Specs/AddAttendanceSpec/AddAttendanceSpec.js'],
  },

  // Testing URL
  
  baseUrl: "http://innoattendance.innovify.com/attandance/backend/web/index.php/site/login",

  // Important Parameters
  params: {
	  admin: {
	  	username: 'kapil.j',
	  	password: '123456'
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
