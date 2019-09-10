const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers.js');
const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers.js');
const customHelper = require('../../../ComponentHelpers/CustomHelper/CustomHelpers.js');
const actionHelper = require('../../../ComponentHelpers/ActionHelper/ActionHelpers');
const EC = protractor.ExpectedConditions;

const DashboardPage = function(){

/* Locators of the Dashboard Page */

// Locators for log out
	const profileMenu = $$('div[href="#menu1"]').get(0);
	const logOut = 'Sign Out';

/* Locators and strings for Dashboard page */

	// Operation Menu 
	const operationMenu = 'Operations';
	const salesReportSubMenu = 'Sales Reports';
	const salesInvoiceReportSubMenu = 'Sales Invoice Report';
	const productManagementSubMenu = 'Product Management';
	const productToolChildMenu = 'Products Tool Beta';

	// Complaince Menu
	const complianceMenu = 'Compliance';
	const licenseRegistrationSubMenu = 'License Registrations';
	const addLicenseChildMenu = 'Add New License';
	const viewLicenseChildMenu = 'View Licenses';
	const federalComplianceMenu = 'Federal Compliance';
	const colaSummarySubMenu = 'COLA Summary'; 

	// Accounting Menu
	const accountingMenu = 'Accounting';
	const accountReceivableReportSubMenu = 'Accounts Receivable Reports';
	const totalArReportSubMenu = 'Total AR Report';

	// Internal tools
	const internalToolsMenu = 'Internal Tools';
	const betaMenu = 'Beta';
	const orderStatusMenu = 'Order Status System';
	const subBrandProduct = 'Sub Brand Product';
	const internationalShipmentMenu = 'International Shipments'
	const modal = $('[class="c-modal__header u-bb u-b--near-white"]'); 

/*----------------------------------------------------------End of Locator variables--------------------------------------------------*/

/**
 * Sign out from the Navigator Application
 * @author Innovify
 */
	this.signOut = async function(){
	
		stepLogger('Click on Profile Menu');
		await pageHelper.clickUsingJs(profileMenu);
		assertLogger('Profile Menu was open up');

		stepLogger('Click on Sign Out');
		await customHelper.clickOnLinkByJsText(logOut);
		await waitHelper.waitForImplicitCall();
		assertLogger('User was successfully Logged out');
	}

	/**
	 * To click on Menu displayed on the Page and get redirected to the Tool.
	 * @author Innovify
	 * @param {string} menuText
	 */
	this.navigateToToolByMenu = async function(menuText) {
		stepLogger(`click on ${menuText} Menu`);
		await customHelper.clickOnLinkByJsText(menuText);
		assertLogger(`${menuText} Menu would be clicked`);
		await waitHelper.waitForImplicitCall();

	}

	/**
	 * Click on the Menu , then click on it's Sub menu
	 *	And get redirected to the Tool.
	 * @author Innovify
	 * @param {string} menuText
	 * @param {string} subMenuText
	*/
	this.navigateToToolBySubmenu = async function(menuText, subMenuText) {
		await this.navigateToToolByMenu(menuText);

		stepLogger(`click on ${subMenuText} sub menu`);
		await customHelper.clickOnLinkByJsText(subMenuText);
		assertLogger(`${subMenuText} sub menu would be clicked`);
		await waitHelper.waitForImplicitCall();
	}
	
	/**
	 * Click on the Menu , then hover on it's Sub menu.
	 * Click on it's child sub menu and get redirected to the Tool.
	 * @author Innovify
	 * @param {string} menuText 
	 * @param {string} subMenuText 
	 * @param {string} childSubMenu 
	 */
	this.navigateToToolByChildSubMenu = async function(menuText, subMenuText, childSubMenu) {
		await this.navigateToToolByMenu(menuText);

		stepLogger(`Hover over ${subMenuText} sub menu`);
		await customHelper.hoverOnLinkByText(subMenuText);
		assertLogger(`Would open the child menu of the ${subMenuText} Sub menu`);

		// Sleep added for stability
		waitHelper.waitForOneSecond();

		stepLogger(`click on ${childSubMenu} Sub menu`);
		await customHelper.clickOnLinkByJsText(childSubMenu);
		assertLogger(`${childSubMenu} Sub menu would be clicked`);
		await waitHelper.waitForImplicitCall();
	}

	/**
	 * Navigate to Product Tool page.
	 * @author Innovify
	 */
	this.goToProductTool = async function() {
		stepLogger('Navigate to Product Tool');
		await this.navigateToToolByChildSubMenu(operationMenu, productManagementSubMenu,
												 productToolChildMenu);
		assertLogger('Navigated to the Product Tool');
		await waitHelper.waitForAngularCall();
		assertLogger('Wait till Summary Page is loaded');										 
	}

	/**
	 * Navigate to View License Page.
	 * @author Innovify
	 */
	this.goToViewLicenseRegistraion = async function() {
		stepLogger('Navigate to Compliance Tab');
		await this.navigateToToolByChildSubMenu(complianceMenu, licenseRegistrationSubMenu,
												viewLicenseChildMenu);
		assertLogger('Navigated to the View License Registration Page');
		await waitHelper.waitForAngularCall();
		assertLogger('Wait till Summary Page is loaded');
	}

	/**
	 * Navigate to Add License Page.
	 * @author Innovify
	 */
	this.goToAddLicenseRegistration = async function() {
		stepLogger('Navigate to Compliance Menu');
		await this.navigateToToolByChildSubMenu(complianceMenu, licenseRegistrationSubMenu,
												addLicenseChildMenu);
	}

	/**
	 * Navigate to Total AR Report.
	 * @author Innovify
	 */
	this.goToTotalARReport = async function() {
		stepLogger('Navigate to Accounting Menu');
		await this.navigateToToolByChildSubMenu(accountingMenu, accountReceivableReportSubMenu,
												totalArReportSubMenu);
		assertLogger('Navigated to the Total AR Report');
	}
	
	/**
	 * Navigate to Sales Invoice report.
	 * @author Innovify
	 */
	this.goTosalesInvoiceReport = async function() {
		stepLogger('Navigate to Operation Menu');
		await this.navigateToToolByChildSubMenu(operationMenu, salesReportSubMenu,
												salesInvoiceReportSubMenu);
		assertLogger('Navigated to the Sales Invoice Report');
	}

	/**
	 * Navigate to Order Status System
	 * @author Innovify
	 */
	this.goToOrderStatusSystem = async function() {
		stepLogger('Navigate to Internal Tools menu');
		await this.navigateToToolByChildSubMenu(internalToolsMenu, betaMenu,
			orderStatusMenu);
			assertLogger('Navigated to the Order Status System');
	}

	/**
	 * Navigate to COLA Summary Page
	 * @author Innovify
	 */
	this.goToColaSummary = async function() {
		stepLogger('Navigate to COLA Summary Page');
		await this.navigateToToolByChildSubMenu(complianceMenu, federalComplianceMenu, 
			colaSummarySubMenu);
	}

	/**
	 * Navigate to Sub Brand Product Page.
	 * @author Innovify
	 */
	this.goToSubBrandProduct = async function() {
		stepLogger('Navigate to Sub Brand Product Tool');
		await this.navigateToToolByChildSubMenu(internalToolsMenu, betaMenu,
			subBrandProduct);
	}

	/**
	 * Navigate to International Shipment Tool.
	 * @author Innovify
	*/
	this.goToInternationalShipmentTool = async function() {
		stepLogger('Navigate to International Shipment Tool');
		await this.navigateToToolByChildSubMenu(internalToolsMenu, betaMenu,
			internationalShipmentMenu);
	}
}
module.exports = new DashboardPage();
