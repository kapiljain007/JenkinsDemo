const textBoxHelper = require('../../../../ComponentHelpers/ElementHelper/TextBoxHelpers');
const dropDownHelper = require('../../../../ComponentHelpers/ActionHelper/DropdownHelpers');
const customHelper = require('../../../../ComponentHelpers/CustomHelper/CustomHelpers');
const pageHelper = require('../../../../ComponentHelpers/ElementHelper/PageHelpers');
const commonPageHelper = require('../../../NavigatorPageObjects/Common/CommonHelperPage');

const SalesInvoiceReportPage = function() {

    /**
     * Locators for Sales invoice Report page.
     * @author Innovify
     */

     // title
     const salesTitle = 'Sales Invoice Report';

     // Summary
     const summaryLocator = element.all(by.repeater('row in vm.salesInvoiceData.data'));

    // index 
    const salesIndex = {

        dropDown: {
            sort : 1,
            dateFilter: 1
        },
        sort: {
            invoiceDate: 0,
            customer: 1,
            poNumber: 3,
            invoiceNumber:2
        },

        filter: {
            customer: 0,
            customerType: 1,
            licensedStates: 2,
            nationalAccounts: 3,
            stateDistributionGroups: 4,
            inventoryProduct: 5,
            brand: 6,
            subBrand: 7,
            subBrandProducts: 8 
        },

        summary: {
            invoiceDate: 0,
            invoice: 1,
            po: 2,
            licensedStates: 3,
            productDescription: 1
        }
    }

    const placeholder = {
        customer: 'Customers',
        customerType: 'Customer Types',
        licensedStates: 'Licensed States',
        nationalAccounts: 'National Accounts',
        stateDistributionGroups: 'State Distribution Groups',
        inventoryProduct: 'Inventory Product',
        brand: 'Brand',
        subBrand: 'Sub Brands',
        subBrandProducts: 'Sub Brand Products'
    }

    const htmlTags = {
        titleTag : 'h1',
        anchor : 'a'
    } 

/*--------------------------------End of Locator Variables-------------------------------------------------*/

/**
 * To fetch the title from the Summary Page of the Sales Invoice Report tool
    and return in text.
 * @author Innovify
 * @returns {string} 
 */
this.getTittleofSalesInvoiceReport  = async function() {
    stepLogger(`Fetch the title of the ${salesTitle} Summary Page`);
    let title = await customHelper.getTitleOfSummary(htmlTags.titleTag, salesTitle);
    assertLogger(`Was able to get the title of the ${salesTitle} Summary Page`);
    return await pageHelper.getText(title);
  }

/**
 * To sort and assert the Summary by Ascending and Descending for Customer.
 * @author Innovify
 * @argument {webElements} summaryLocator
 */
this.sortAndAssertSummaryForCustomer = async function(order) {
    await commonPageHelper.clickOnSortDropDown(salesIndex.dropDown.sort);
    await commonPageHelper.selectValueFromSortDropDown(salesIndex.sort.customer);
    stepLogger('Select Ascending/Descending Order for Customer.');
    await commonPageHelper.setSortOrder(order);
    stepLogger('Ascending/Descending Order for Customer was selected.');
    await commonPageHelper.applySettings();
    stepLogger('Check the Sorting of the summary for Customer.');
    await commonPageHelper.checkSortForTitleOfRecords(order);
}

/**
 * To sort and assert the Summary by Ascending and Descending for Invoice Number.
 * @author Innovify
 * @argument {webElements} summaryLocator
 */
this.sortAndAssertSummaryForInvoiceNumber = async function(order) {
    await commonPageHelper.clickOnSortDropDown(salesIndex.dropDown.sort);
    await commonPageHelper.selectValueFromSortDropDown(salesIndex.sort.invoiceNumber);

    stepLogger('Select Ascending/Descending Order for Invoice.');
    await commonPageHelper.setSortOrder(order);
    stepLogger('Ascending/Descending Order for Invoice was selected.');
    await commonPageHelper.applySettings();
    stepLogger('Check the Sorting of the summary for Invoice.');
    await commonPageHelper.verifySortForSummaryA(order, summaryLocator, salesIndex.summary.invoice);
}

/**
 * To sort and assert the Summary by Ascending and Descending for PO number.
 * @author Innovify
 * @argument {webElements} summaryLocator
 */
this.sortAndAssertSummaryForPoNumber = async function(order) {
    await commonPageHelper.clickOnSortDropDown(salesIndex.dropDown.sort);
    await commonPageHelper.selectValueFromSortDropDown(salesIndex.sort.poNumber);
    stepLogger('Select Ascending/Descending Order for PO number.');
    await commonPageHelper.setSortOrder(order);
    stepLogger('Ascending/Descending Order for PO number was selected.');
    await commonPageHelper.applySettings();
    stepLogger('Check the Sorting of the summary for PO number.');
    await commonPageHelper.verifySortForSummaryA(order, summaryLocator, salesIndex.summary.po);
}

/**
 * To filter and assert the value from the summary by Customer.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByCustomer = async function(targetValue, assertionValue = targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from States.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.customer),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.customer)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from States.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();

    stepLogger(`Assert for the ${assertionValue} value from the Summary.`);
    await commonPageHelper.assertRecordTitle(assertionValue);
    assertLogger(`Assertion was done for the ${assertionValue} from the summary.`);
}

/**
 * To filter the value from the summary by Customer Type.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByCustomerType = async function(targetValue, assertionValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from Customer type.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.customerType),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.customerType)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from Customer type.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To filter the value from the summary by Licensed State.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByLicensedState = async function(targetValue, assertionValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from Licensed States.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.licensedStates),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.licensedStates)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from Licensed States.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();

    stepLogger(`Assert for the ${assertionValue} value from the Summary.`);
    await commonPageHelper.assertSubRecordTitleForSummary(assertionValue, summaryLocator, salesIndex.summary.licensedStates);
    assertLogger(`Assertion was done for the ${assertionValue} from the summary.`);
}

/**
 * To filter the value from the summary by National Accounts.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByNationalAccount = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from national accounts.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.nationalAccounts),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.nationalAccounts)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from national accounts.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To filter the value from the summary by State distribution group.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByStateDistributionGroup = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from state distribution group.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.stateDistributionGroups),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.stateDistributionGroups)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from state distribution group.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To filter the value from the summary by Inventory Product.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByInventoryProduct = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from Inventory Product.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.inventoryProduct),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.inventoryProduct)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from Inventory Product.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();

    stepLogger('Should assert the value from the line items.');
    await commonPageHelper.verifyLineItems(targetValue, summaryLocator, salesIndex.filter.productDescription);
    assertLogger('Was able to asssert the value from the line items.');
}

/**
 * To filter the value from the summary by Brand.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByBrand = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from Brand.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.brand),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.brand)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from Brand.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To filter the value from the summary by Sub Brand.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryBySubBrand = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from state distribution group.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.subBrand),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.subBrand)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from state distribution group.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To filter the value from the summary by Sub Brand Product.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryBySubBrandProduct = async function(targetValue) {
    stepLogger('Open Advance Filter Section');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    stepLogger(`Select "${targetValue}" from Sub Brand Product.`);
    await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(salesIndex.filter.subBrandProducts),
    await textBoxHelper.getTextFieldByPlaceholder(placeholder.subBrandProducts)
    ,htmlTags.anchor, targetValue);
    assertLogger(`${targetValue} was selected from state distribution group.`);

    stepLogger('Open Advance Filter Section.');
    await commonPageHelper.clickOnAdvanceFilter();
    assertLogger('Advance filter section would be opened.');

    await commonPageHelper.applySettings();
}

/**
 * To set filter and verify the summary by Invoice.
 * @author Innovify
 */
this.filterAndVerifySummaryByInvoiceDate = async function() {
    stepLogger('Should able to select the preset options.');
    await commonPageHelper.selectPreOptionsForDate('YTD', salesIndex.dropDown.dateFilter);
    assertLogger('YTD option was selected.');

    await commonPageHelper.applySettings();

    stepLogger('Verify the summary for YTD option.');
    await commonPageHelper.assertSummaryAForYTD(summaryLocator, salesIndex.summary.invoiceDate);
    assertLogger('Should able to verify the option for MTD.');
}

/**
 * Assert the value in each Records searched by universal search. 
 * @author Innovify
 * @param {string} targetSearch 
 */
this.assertValuesShownByUniversalSearch = async function(targetSearch) {
    await commonPageHelper.assertSearchResultFromRecord(summaryLocator, targetSearch);
}

}
module.exports = new SalesInvoiceReportPage();