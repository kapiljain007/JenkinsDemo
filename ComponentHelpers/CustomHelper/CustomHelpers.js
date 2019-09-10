const pageHelper = require('../ElementHelper/PageHelpers.js');
const actionHelper = require('../ActionHelper/ActionHelpers');

const CustomHelpers = function () {

  /**
   * @author Innovify
   * To pick the values for indexing.
   */
  this.indexing = {
    zero:  0,
    one:   1,
    two:   2,
    three: 3,
    four:  4,
    five:  5,
    six:   6,
    seven: 7
  }

   /**
    * To select an element using link and wait till the element hides.
    * @author Innovify
    * @param {string} targetText 
    */
    this.clickOnLinkByTextAndWaitForElementToHide = async function(targetText){
      let elm = element(by.linkText(targetText));
       await pageHelper.clickAndWaitForElementToHide(elm);
    }

     /**
      * To click on Link by using Text.
      * @author Innovify
      * @param {string} targetText 
      */
      this.clickOnLinkByText = async function(targetText){
      let elm = element(by.linkText(targetText));
        await pageHelper.click(elm);
      }

      /**
       * Click on the link using Javascript
       * @author Innovify
       * @param {string} text 
       */
      this.clickOnLinkByJsText = async function(targetText){
        try {
        let elm = element(by.linkText(targetText));
          await pageHelper.clickUsingJs(elm);
        }
        catch(err) {
          console.log(err);
        }
      }


    /**
     * click and wait till element is visible again.
     * @author Innovify
     * @param {string} targetText 
     */
      this.clickOnLinkByTextAndWait = async function(targetText){
      let elm = element(by.linkText(targetText));
        await pageHelper.clickAndWaitTillElementIsVisible(elm);
      }
 
    /**
     * Click button by Text and index.
     * @author Innovify
     * @param {string} targetText 
     * @param {string} targetIndex 
     */
    this.clickButtonByTextAndIndex = async function(targetText, targetIndex) {
      let elm = element.all(by.buttonText(targetText)).get(targetIndex);
      await pageHelper.click(elm);
    }

    /**
     * Hover over the element by Text.
     * @author Innovify
     * @param {string} targetText 
     */
    this.hoverOnLinkByText = async function(targetText){
      let elm = element(by.linkText(targetText));
        await actionHelper.actionHoverOver(elm);
      }

  /**
   * Assert the title of the Summary page.
   * @author Innovify
   * @param {htmlTag} tag 
   * @param {string} titleText
   * @returns {webElememt} 
   */
  this.getTitleOfSummary = function(tag, titleText){
      return element(by.cssContainingText(tag, titleText));
  }
  
  /**
   * To check visibility of Element and returns in boolean.
   * @author Innovify
   * @param {webElememt} targetElement 
   * @returns {boolean} isDisplayed 
   */
  this.isElementDisplayed = async function(targetElement) {
     const isDisplayed = await targetElement.isDisplayed();
     return isDisplayed;
  }

  /**
   * To check visibility of Element and returns in boolean.
   * @author Innovify
   * @param {webElememt} targetElement 
   * @returns {boolean} isPresent 
   */
  this.isElementPresent = async function(targetElement) {
    const isPresent = await targetElement.isPresent();
    return isPresent;
 }

}
module.exports = new CustomHelpers();
