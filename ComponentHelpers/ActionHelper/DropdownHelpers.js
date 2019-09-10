const waitHelper = require('../WaitHelper/WaitHelpers.js');
const pageHelper = require('../ElementHelper/PageHelpers.js');
const textboxHelper = require('../ElementHelper/TextBoxHelpers.js');

const DropdownHelpers = function () {

  /**
   * To get the xpath element for value within option tag.
   * @author Innovify
   * @param {string} optionVal 
   */
  this.getXPathForOptionValue = async function(optionVal) {
        return await `.//option[normalize-space(.)="${optionVal}"]`;
    }
  
  /**
   * To get the xpath element for value within text.
   * @author Innovify
   * @param {string} optionVal 
   */
  this.getXpathForTextValue = async function(targetText) {
      return await `.//*[normalize-space(.)="${targetText}"]`;
    }

  /**
   * To get the css element for value within option tag.
   * @author Innovify
   * @param {string} optionVal 
   */
  this.getCssForOptionValue = async function(optionVal) {
        return await `option[value="${optionVal}"]`;
    }

  /**
   * To fetch the element by text using xpath.
   * @author Innovify
   * @param {webElement} parentLocator 
   * @param {string} targetValue 
   */
  this.getElementByText = async function(parentLocator, targetValue) {
      return await parentLocator.element(by.xpath(await this.getXpathForTextValue(targetValue)));
  }

  /**
   * To select an element from the dropdown by text.
   * @author Innovify
   * @param {webElement} parentLocator 
   * @param {string} targetValue 
   */
  this.selectElementByText = async function(parentLocator, targetValue) {
      stepLogger('click on the dropdown of the targeted field.');
      await pageHelper.click(parentLocator);
      assertLogger('Click action was performed on the tagreted field.');

      // Wait till the dropdown is open.
      await waitHelper.waitForOneSecond();
      stepLogger('get the weblement of the value to be selected.')
      let value = await this.getElementByText(parentLocator, targetValue);
      stepLogger('Click on the fetched element.');
      await pageHelper.click(value);
      assertLogger('Click action was performed over fetched element.')
      
      stepLogger('click on the dropdown of the targeted field to close it.');
      await pageHelper.click(parentLocator);
      assertLogger('Click action was performed on the tagreted field to close it.');
  }
  
  /**
   * To select an element from the dropdown using Tag and Text.
   * @author Innovify
   * @param {webElement} parentLocator 
   * @param {string} targetValue
   * @param {HtmlTag} targetTag 
   */
  this.selectChildElementByTagAndText = async function(parentLocator, targetTag, targetValue) {
    stepLogger('click on the dropdown of the targeted field.');
    await pageHelper.click(parentLocator);
    assertLogger('Click action was performed on the tagreted field.');

    // Wait till the dropdown is open.
    await waitHelper.waitForOneSecond();
    stepLogger('get the weblement of the value to be selected.')
    let value = await this.selectChildValueByTag(parentLocator, targetTag, targetValue);
    stepLogger('Click on the fetched element.');
    //await pageHelper.clickUsingJs(value);
    await browser.sleep(3000);
    await value.click();
    assertLogger('Click action was performed over fetched element.')
    
    stepLogger('click on the dropdown of the targeted field to close it.');
    await pageHelper.click(parentLocator);
    assertLogger('Click action was performed on the tagreted field to close it.');
}

  /**
   * To select webelement by text and class. 
   * @author Innovify
   * @param {ClassName} Class 
   * @param {strong} targetText 
   */
  this.selectTextByClass = async function(Class, targetText) {
      return await element(by.cssContainingText(Class, targetText)).click();
  }

  /**
   * To select webelement by text and class.
   * @author Innovify
   * @param {HtmlTag} tag 
   * @param {string} targetText 
   */
  this.selectElemetByTag = async function(tag, targetText) {
      let elm =  element(by.cssContainingText(tag, targetText));
      await pageHelper.click(elm);
    }

  /**
   * get the element by chaining through locator, tag and value.
   * @author Innovify
   * @param {WebElement} locator 
   * @param {HtmlTag} tag 
   * @param {string} targetText 
   */
  this.selectChildValueByTag = async function(locator, tag, targetText) {
    return await locator.element(by.cssContainingText(tag, targetText));
  }

  /**
   * get options by locator.
   * @author Innovify
   * @param {WebElement} locator 
   * @param {string} targetText 
   */
  this.selectOptionByVal = async function(locator, targetText) {
    return await locator.element( by.css( await this.getCssForOptionValue( targetText ) ) ).click();
 }

  /**
    * Select Option by Text.
    * @author Innovify
    * @param {WebElement} locator 
    * @param {string} targetText 
    */
 this.selectOptionByText = async function(locator, targetText) {
        await waitHelper.waitForElementToBeDisplayed(locator);
        return await locator.element(by.xpath( await this.getXPathForOptionValue(targetText)));
   }

   /**
    * Select Option by any locator and Text from Drop-down.
    * @author Innovify
    * @param {WebElement} locator 
    * @param {string} targetText 
    */
   this.selectOptionByTextFromDropdown = async function(locator, targetText) {
       stepLogger('Click on the dropdown');
       await pageHelper.click(locator);

       stepLogger('Select the element from the dropdown');
       await this.selectOptionByText(locator, targetText);
       assertLogger('Value should be selected from the dropdown');

       await pageHelper.click(locator);
       stepLogger('Close the dropdown');
   }

   /**
    * Select Option by any locator and value from Drop-down.
    * @author Innovify
    * @param {WebElement} locator 
    * @param {string} targetText 
    */
   this.selectOptionByValueFromDropdown = async function(locator, targetText) {
       stepLogger('Click on the dropdown');
       await pageHelper.click(locator);

       stepLogger('Select the element from the dropdown');
       await this.selectOptionByVal(locator, targetText);
       assertLogger('Value should be selected from the dropdown');

       await pageHelper.click(locator);
       stepLogger('Close the dropdown');
   }

   /**
    * Select the Option by Index from Drop-down.
    * @author Innovify
    * @param {WebElement} locator 
    * @param {string} targetText 
    * @param {number} index 
    */
   this.selectOptionByTextWithIndex = async function(locator, targetText, index) {
        return await locator.all(By.xpath(this.getXPathForOptionValue(targetText))).get(index).click();
   }

   /**
    * Select Option from Dropdown by Html Tags.
    * @author Innovify
    * @param {WebElement} dropLocator 
    * @param {ClassName} Class 
    * @param {string} targetText 
    */
   this.selectElementFromDropByClass = async function (dropLocator, Class, targetText) {
     stepLoggerawait ('Click on the dropdown');
     await pageHelper.click(dropLocator);

     stepLogger('Select the Element from the drop-down');
     await this.selectTextByClass(Class, targetText);
     assertLogger('Value should be selected from the drop-down');

     await pageHelper.click(dropLocator);
     assertLogger('Drop-down should be closed');
   }

   /**
    * Select Option from Dropdown by Html Tags.
    * @author Innovify
    * @param {WebElement} dropLocator 
    * @param {HtmlTag} tag 
    * @param {string} targetText 
    */
   this.selectElementFromDropByTag = async function (dropLocator, tag, targetText) {
     stepLogger('Click on the dropdown');
     await pageHelper.click(dropLocator);

     stepLogger('Select the Element from the drop-down');
     await this.selectElemetByTag(tag, targetText);
     assertLogger('let elm =  be selected from the drop-down');

      await pageHelper.click(dropLocator);
     assertLogger('Drop-down should be closed');
   }

   /**
    *  Select Option for Multi-dropdown select by class,
    *  First by searching for the text in the table and clicking on it
    * @author Innovify
    * @param {WebElement} dropLocator 
    * @param {WebElement} textLocator 
    * @param {ClassName} Class 
    * @param {string} targetText 
    */
   this.enterAndSelectElementByClass = async function (dropLocator, textLocator, Class, targetText) {
     stepLogger('Click on the dropdown');
      await pageHelper.click(dropLocator);

      await pageHelper.click(textLocator);
      stepLogger('Enter value in the dropdown Text field');
      await textboxHelper.sendKeys(textLocator, targetText);

      stepLogger('Select the element from the dropdown');
      await this.selectTextByClass(Class, targetText);
      assertLogger('Value should be selected from the drop-down');

      await pageHelper.click(dropLocator);
      assertLogger('Drop-down should be closed');
   }
   
   /**
    *  Select Option for Multi-dropdown select by tag.
    *  First by searching for the text in the table and clicking on it 
    * @author
    * @param {WebElement} dropLocator 
    * @param {WebElement} textLocator 
    * @param {HtmlTag} tag 
    * @param {string} targetText 
    */
   this.enterAndSelectElementByTag = async function (dropLocator, textLocator, tag, targetText) {
      stepLogger('Click on the dropdown');
      await pageHelper.clickUsingJs(dropLocator);

      await waitHelper.waitForElementToBeDisplayed(textLocator);
      stepLogger('Enter value in the dropdown Text field');
      await textboxHelper.sendKeys(textLocator, targetText);

      stepLogger('Select the element from the dropdown');
      await this.selectElemetByTag(tag, targetText);
      assertLogger('Value should be selected from the drop-down');

      await pageHelper.clickUsingJs(dropLocator);
      assertLogger('Drop-down should be closed');
   }

   /**
    * To select value by text and passing the value in the form of sendkeys.
    * @author Innovify
    * @param {webElement} locator 
    * @param {string} targetText 
    */
   this.selectValueByText = async function(locator, targetText) {
       await waitHelper.waitForElementToBeDisplayed(locator);
        await locator.sendKeys(targetText);
   }

   /**
    * To select the value from the drop-down using label.
    * @author Innovify
    * @param {webElement} locator 
    * @param {string} targetLabel 
    */
   this.selectValueByOptionLabel = async function(locator, targetLabel) {
    await waitHelper.waitForElementToBeDisplayed(locator);
    await pageHelper.click(locator);
    await locator.$(`option[label = "${targetLabel}"]`).click();
}

  /**
   * To select the text from the server side dropdown.
   * @param {WebElement} locator 
   * @param {WebElement} targetField 
   * @param {string} targetText 
   */
  this.selectValueFromServerSideSearch = async function(dropLocator, textLocator, tag , targetText) {
    stepLogger('Click on the dropdown');
    await pageHelper.clickUsingJs(dropLocator);

    stepLogger('Enter value in the dropdown Text field');
    await textboxHelper.sendKeys(textLocator, targetText);
    await waitHelper.waitForFiveSeconds(); // To wait till text shows up

    stepLogger('Select the element from the dropdown');
    await this.selectElemetByTag(tag, targetText);
    assertLogger('Value should be selected from the drop-down');

    await pageHelper.clickUsingJs(dropLocator);
    assertLogger('Drop-down should be closed');
  }

}
module.exports = new DropdownHelpers();