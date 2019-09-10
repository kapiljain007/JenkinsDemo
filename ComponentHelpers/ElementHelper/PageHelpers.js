const waitHelper = require('../WaitHelper/WaitHelpers.js');

const PageHelpers = function () {

// Click action on the element
 this.click = async function(targetElement) {
        await waitHelper.waitForElementToBeClickable( targetElement );
        return await targetElement.click();
      }

// Click on the element and wait for it to get hidden
  this.clickAndWaitForElementToHide = async function( targetElement ) {
          await waitHelper.waitForElementToBeClickable( targetElement );
          await targetElement.click();
          return await waitHelper.waitForElementToBeHidden( targetElement );
      }

  // click and wait till the element is visible
  this.clickAndWaitTillElementIsVisible = async function(targetElement){
    await waitHelper.waitForElementToBeClickable( targetElement );
    await targetElement.click();
    /* one second sleep till the element gets hidden */
    await waitHelper.waitForOneSecond();
    return await waitHelper.waitForElementToBeDisplayed( targetElement );
  }

// Click using js
 this.clickUsingJs = async function(targetElement) {
        await waitHelper.waitForElementToBeClickable(targetElement);
        return await browser.executeScript('arguments[0].click();', targetElement.getWebElement());
    }

// To Refersh the page
this.refreshBrowser = async function() {
      return await browser.driver.navigate().refresh();
  }

// function to retrive attribute
    this.getAttributeValue = async function (elm, attribute) {
        await waitHelper.waitForElementToBeDisplayed(elem);
        return elem.getAttribute(attribute)
            .then(function (text) {
                return text.trim();
            });
    }

// function to retrive Text
    this.getText = async function(elem) {
        await waitHelper.waitForElementToBeDisplayed(elem);
        return elem.getText()
            .then(function (text) {
            return text.trim();
        });
    }

// function to retrive css value
    this.getCssValue = async function(elem, attributeName) {
        await waitHelper.waitForElementToBeDisplayed(elem);
        return await elem.getCssValue(attributeName);
    }

// get date format for mm/dd/yyyy
  this.getFormattedDate = function(delimiter, addDays = 0) {
          const result = new Date();
          var baseDate = new Date();
          result.setDate(baseDate.getDate() + addDays); // Takes care of carry-over values.
          var dd = result.getDate();
          var mm = result.getMonth() + 1; // January is 0.
          var yyyy = result.getFullYear();

          if (dd < 10) {
              dd = '0' + dd;
          }
          if (mm < 10) {
              mm = '0' + mm;
          }
          return `${mm}${delimiter}${dd}${delimiter}${yyyy}`;
      }

    // To verify whether the element is enabled
      this.isElementEnabled = function( targetElement) {
              waitHelper.waitForElementToBeDisplayed( targetElement );
              return targetElement.isEnabled();
          }

    /**
     * Verify whether element is displayed.
     */
     this.isElementDisplayed = function( targetElement) {
            waitHelper.waitForElementToBeDisplayed( targetElement );
            return targetElement.isDisplayed();
        }

    // Switch to an Active element in the page
    this.switchToActiveElement = function(){
        browser.switchTo().activeElement();
    }

    /**
     * To get the text of an element not visible in the page.
     * @param {string} targetElement 
     */
    this.getTextByJs = async function(targetElement) {
       await browser.executeScript("return $(arguments[0]).text();", targetElement);
    }

    /**
     * To get the element by span text
     * @author innovify
     * @param {string} targetText 
     */
    this.getElementBySpanText = async function(targetText) {
        return element(by.xpath(`//span[(.) = "${targetText}"]`));
    }

    /**
     * To get the element from the list of element by text.
     * @author innovify
     * @param {string} targetText 
     * @param {number} targetIndex 
     */
    this.getElementsBySpanText = async function(targetText, targetIndex) {
        return element.all(by.xpath(`//span[(.) = "${targetText}"]`)).get(targetIndex);
    }
}
module.exports = new PageHelpers()
