const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers.js');
const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers.js');
const textboxHelper = require('../../../ComponentHelpers/ElementHelper/TextBoxHelpers.js')

const LoginPage = function(){

//  Locators of the Navigator login page
	const username = element(by.id('username'));
	const password = element(by.id('password'));
	const logIn = element(by.buttonText('Sign In'));

/*----------------------------------------------------------End of Locator variables--------------------------------------------------*/

	/**
	 * To navigate to the URL
	 * @author Innovify
	 */
	this.goToUrl = async function(){
		browser.ignoreSynchronization = true;
		let url = browser.baseUrl;
		stepLogger(`Navigate to the ${url}`);
		await browser.get(url);
		assertLogger(`Navigated to ${url}`);
	}

	/**
	 * Logging in the application with PSI user.
	 * @author Innovify
	 */
	this.signInAsPsi = async function(){
		let Username = browser.params.psi.username;
		stepLogger(`Enter the Username: ${Username}`);
		await textboxHelper.sendKeys(username, Username);
		assertLogger(`Entered "${Username}" as the Username`);

		let Password = browser.params.psi.password;
		stepLogger(`Enter the Password: ${Password}`);
		await textboxHelper.sendKeys(password, Password);
		assertLogger(`Entered ${Password} as the Password`);

		stepLogger('Click on Sign-in button');
		await waitHelper.waitForTwoSeconds();
		await pageHelper.click(logIn);
		assertLogger('Click action was executed on Sign-in Button');
	}

	/**
	 * Logging in the application with Non-PSI user.
	 * @author Innovify
	 */
	this.signInAsNonPsi = async function(){
		let username = browser.params.nonPsi.username;
		stepLogger(`Enter the Username: ${Username}`);
		await textboxHelper.sendKeys(username, Username);
		assertLogger(`Entered "${Username}" as the Username`);

		let password = browser.params.nonPsi.password;
		stepLogger(`Enter the Password: ${Password}`);
		await textboxHelper.sendKeys(password, Password);
		assertLogger(`Entered ${Password} as the Password`);

		stepLogger('Click on Sign-in button');
		await waitHelper.waitForTwoSeconds();
		await pageHelper.click(logIn);
		assertLogger('Click action was executed on Sign-in Button');
	}
}
module.exports = new LoginPage();
