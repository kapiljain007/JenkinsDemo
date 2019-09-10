const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers.js');
const dropdownHelper = require('../../../ComponentHelpers/ActionHelper/DropdownHelpers.js');
const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers.js');

var ClientPage = function(){

	//Locator for selecting the client
	const selectClient = $(".ms-choice");
	const searchClient = $('input[type = "text"]');
	const clientDiv = 'label';
	const logIn = element(by.id('select-clients-button'));

/*--------------------------------End of the Locator Variables-----------------------------------------------*/

  /**
   * Search and Select the client from the Client Dropdown.
   * Click on the Login Button.
   * @author Innovify
   * @param {string} clientName
   */
	this.selectTheClient = async function(clientName) {
			stepLogger('Select a Client from the Dropdown.');
			await dropdownHelper.enterAndSelectElementByTag(selectClient, searchClient,
												clientDiv, clientName);
			assertLogger(`${clientName} was selected.`);

			try {
				stepLogger('Click on Login button.');
				await pageHelper.clickUsingJs(logIn);
				assertLogger('Click action was performed on Login Button.');
			}
			catch (error){
				console.error("Promise should be handled");
		}
	}
}
module.exports = new ClientPage();
