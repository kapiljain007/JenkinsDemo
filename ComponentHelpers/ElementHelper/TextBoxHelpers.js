const waitHelper = require('../WaitHelper/WaitHelpers.js');

const TextBoxHelpers = function () {

/**
 * Clear the Text Field
 * @author Innovify
 * @param {WebElement} locator 
 */
this.clearText = async function(locator) {
      await waitHelper.waitForElementToBeDisplayed(locator);
      await locator.clear();
  }

/**
 * Enter string to the text field.
 * @author Innovify
 * @param {WebElement} locator 
 * @param {string} value 
 */
this.sendKeys = async function(locator, value) {
    await waitHelper.waitForElementToBeDisplayed(locator);
    await this.clearText(locator);
    await locator.sendKeys(value);
}

/**
 * Fetch the webelement by placeholder.
 * @author Innovify
 * @param {string} placeholder 
 */
this.getTextFieldByPlaceholder = function(placeholder) {
    return $(`input[placeholder="${placeholder}"]`);
}

/**
 * Fetch the webelement by placeholder.
 * @author Innovify
 * @param {string} placeholder 
 */
this.getTextFieldByPlaceholderAndIndex = function(placeholder, index) {
    return $$(`input[placeholder="${placeholder}"]`).get(index);
}
}
module.exports = new TextBoxHelpers();
