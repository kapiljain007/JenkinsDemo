const waitHelper = require('../WaitHelper/WaitHelpers.js');

const ActionHelpers = function(){

    /**
    * Giving hardcoded commands for Key Press.
    * @author Innovify
    * @param {Keys} key 
    */
	this.pressKey = async function(key){
		await browser.actions().sendKeys(key).perform();
	}

    /**
     * Method for Dragging and Dropping the element.
     * @author Innovify
     * @param {WebElement} source 
     * @param {WebElement} destination 
     */
	this.actionDragAndDrop = async function (source, destination) {
        await waitHelper.waitForElementToBeDisplayed(source);
        await waitHelper.waitForElementToBeDisplayed(destination);
	    await browser.actions().dragAndDrop(source, destination).perform();
	};

    /**
     * Method for Double clicking on the element
     * @author Innovify
     * @param {WebElement} targetElement 
     */
	this.actionDoubleClick = async function(targetElement) {
        await waitHelper.waitForElementToBeClickable(targetElement);
      return browser.actions().doubleClick(targetElement).perform();
        }

    /**
     * Hover over an element.
     * @author Innovify
     * @param {WebElement} targetElement 
     */
    this.actionHoverOver = async function(targetElement) {
        await waitHelper.waitForElementToBeDisplayed(targetElement);
        return browser.actions().mouseMove(targetElement).perform();
    }

    /**
     * Hover over an element and click on the same element
     * @author Innovify
     * @param {WebElement} hoverOverLocator 
     * @param {WebElement} clickLocator 
     */
    this.actionHoverOverAndClick = async function(hoverOverLocator, clickLocator) {
        await waitHelper.waitForElementToBeClickable(targetElement);
        return browser.actions().mouseMove(hoverOverLocator).click(clickLocator).perform();
    }
}
module.exports = new ActionHelpers();
