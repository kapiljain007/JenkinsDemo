
const WaitHelper = function(){

	const upload_spinner = element(by.css('i.fa.fa-spinner.fa-spin.ng-scope'));
	const upload_wait = element(by.css('i.fa.fa-file-o.ng-scope'));
	const spinner = element(by.css('.fa.fa-spinner.fa-spin'));

/*----------------------------End of the Locator variable --------------------------------------------------*/


	/**
 	* Expected Condition function 
 	*/
	const EC = protractor.ExpectedConditions;

	/**
	 * Timeouts to be used across the project
	 * @author Innovify
	 */
  const timeout = {
	  xxs : 1000,
      xs: 2000,
      s: 5000,
      m: 10000,
      l: 25000,
      xl: 50000,
      xxl: 75000,
      xxxl: 200000
  }

  	/**
	* Default Wait time
	* @author Innovify
	*/
	this.setDefaultWaitTime = async function () {
		  return await timeout.l;
	}

	/**
	 * Wait till the Page completly loads up.
	 * @author Innovify
	 */
	this.waitForImplicitCall = async function(){
		await browser.manage().timeouts().implicitlyWait(timeout.l);
	}

	/**
	 * Wait for one second.
	 * @author Innovify
	 */
	this.waitForOneSecond = async function(){
		await browser.sleep(timeout.xxs);
	}

	/**
	 * Wait for Two seconds.
	 * @author Innovify
	 */
	this.waitForTwoSeconds = async function(){
		await browser.sleep(timeout.xs);
	}

	/**
	 * Wait for Five Seconds
	 * @author Innovify
	 */
	this.waitForFiveSeconds = async function(){
		await browser.sleep(timeout.s);
	}


	/**
	 * Helper method to handle Angular calls
	 * @author Innovify
	 */
	this.waitForAngularCall = async function(){
		browser.ignoreSynchronization = false;
		await browser.waitForAngular();
		browser.ignoreSynchronization = true;
	}

    /**
	 * Helper methods using Explicit Waits.
	 */

	/**
	 * Waits till the element is present on the Page.
	 * @author Innovify
	 * @param {WebElement} targetElement
	 * @param {string} message
	 */
	this.waitForElementToBePresent = async function (targetElement, message = ' Element should be present') {
		await browser.wait(EC.presenceOf(targetElement),
					timeout.l,
					targetElement.locator().toString() + message);
	}

	/**
	 * Waits till the element is displayed on the Page.
	 * @author Innovify
	 * @param {WebElement} targetElement
	 * @param {string} message
	 */
	this.waitForElementToBeDisplayed = async function(targetElement, message = ' Element should be visible') {
         await browser.wait(EC.visibilityOf(targetElement),
            timeout.l,
            targetElement.locator().toString() + message);
    }

	/**
	 * Waits till the element is visible on the Page.
	 * @author Innovify
	 * @param {WebElement} targetElement
	 * @param {string} message
	 */
	this.waitForElementToBeHidden = async function(targetElement, message = ' Element should not be visible') {
	        await browser.wait(EC.invisibilityOf(targetElement),
	            timeout.l,
	            targetElement.locator().toString() + message);
		}
		
	/**
	 * Waits till the element is clickable on the Page.
	 * @author Innovify
	 * @param {WebElement} targetElement
	 * @param {string} message
	 */
	this.waitForElementToBeClickable = async function(targetElement, message = ' Element not clickable') {
        await browser.wait(EC.elementToBeClickable(targetElement),
            timeout.l,
            targetElement.locator().toString() + message);
    }

	/**
	 * Helper methods to handle Alerts.
	 */

    /**
	 * Wait for Alert to be Present
	 * @author Innovify
	 * @param {string} message
	 */
	this.waitForAlertToBePresent = async function(message = ' Alert is not present') {
			await browser.wait(EC.alertIsPresent(), timeout.l, message);
	}

	/**
	 * Wait till the Excel is downloaded.
	 * @author Innovify
	 */
	this.spinnerWait = async function(){
		await browser.wait(function(){
			return spinner.isDisplayed().then(function(result){return !result})
		}, 40000);
	}

	/**
	 * Wait till the Excel is uploaded
	 * @author Innovify
	 */
	this.uploadWait = async function(){
		await browser.wait(function() {
			  return upload_spinner.isDisplayed().then(function(result){return result});
			}, timeout.l);
	}
}
module.exports = new WaitHelper();
