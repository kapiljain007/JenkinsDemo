const textBoxHelper = require('../../../../ComponentHelpers/ElementHelper/TextBoxHelpers');
const dropDownHelper = require('../../../../ComponentHelpers/ActionHelper/DropdownHelpers');
const customHelper = require('../../../../ComponentHelpers/CustomHelper/CustomHelpers');
const pageHelper = require('../../../../ComponentHelpers/ElementHelper/PageHelpers');
const waitHelper = require('../../../../ComponentHelpers/WaitHelper/WaitHelpers');
const commonPageHelper = require('../../../NavigatorPageObjects/Common/CommonHelperPage');

const OrderStatusSystemPage = function() {

    /**
     * Locators of the order status system
     * @author Innovify
     */
    
     // New Purchase Order 
     const newPurchaseOrder = {
       newOrderLink : 'Add a New Purchase Order',
       client : element(by.name('client_id')),
       po: element(by.name('po_number')),
       customer: element(by.name('customer_id')),
       sales: element(by.name('so_number')),
       approvalStatus: element(by.name('approval_status'))
     }

     const reviewnewPurchaseOrder = {
         client: 0,
         customer: 2,
         sales: 3,
         approvalStatus: 7
     }

     // Summary 
     const title = 'Order Status System';
     const summaryRecords = element.all(by.repeater('row in $ctrl.orderSummaryData.data'));
  
     //Index 
     const index = {
       filter: {
         orderStatus: 2,
         approvalStatus : 3,
         customer: 4,
         customerType: 5,
         licensedStates: 6,
       nationalAccounts: 7,
         stateDistributionGroups: 8,
         inventoryProduct: 9,
         brand: 10,
         subBrand: 11,
         subBrandProducts: 12 
       },

       summary: {
         orderStatus: 0,
         approvalStatus: 1
       }
     }

     //Filter
     const placeholder = {
      approvalStatus: 'Approval Status',
      orderStatus: 'Order Status',
      customer: 'Customers',
      customerType: 'Customer Types',
      licensedStates: 'License States',
      nationalAccounts: 'National Accounts',
      stateDistributionGroups: 'State Distribution Groups',
      inventoryProduct: 'Inventory Product',
      brand: 'Brand',
      subBrand: 'Sub Brand',
      subBrandProducts: 'Sub Brand Product'
     }

     //Tags
     const htmlTags = {
         anchor : 'a',
         title: 'h1'
     }

     // Detail page
     const detailfields = 'td.col-xs-6.u-pa3.u-pre-wrap';
     const detailfieldsIndex = {
       po : 3
     }

     const editOrder = 'Edit this Order';
     const deleteNote = 'i.fa.fa-trash.fa-1x.u-black.u-pr4.u-pointer';
     const editNote = 'i.fa.fa-pencil.fa-1x.u-black.u-pr3.u-pointer';
     const addAttachment = element(by.name('upload_file_type'));

    /*--------------------------------------------------End of locator variables------------------------------->*/

    /**
     * To click on New Purchase Order.
     * @author Innovify
     */
    this.clickOnNewOrder = async function() {
        stepLogger('Click on New Purchase Order.');
        await customHelper.clickOnLinkByText(newPurchaseOrder.newOrderLink);
    }

    /**
     * To select Client for New Purchase Order.
     * @author Innovify
     */
    this.selectClientForNewPurchaseOrder = async function(targetText) {
        stepLogger(`Select "${targetText}" client for new purchase order.`);
         await dropDownHelper.selectValueByText(newPurchaseOrder.client, targetText);
     }

    /**
     * To Select Customer for New Purchase Order.
     * @author Innovify
     */
    this.selectCustomerForNewPurchaseOrder = async function(targetText) {
        stepLogger(`Select "${targetText}" customer for new purchase order.`);
        await dropDownHelper.selectValueByText(newPurchaseOrder.customer, targetText);
     }

     /**
      * To enter the PO number in the New Purchase Order.
      * @author Innovify
      */
     this.enterPoNumber = async function(targetText) {
        stepLogger(`Enter PO "${targetText}" for new purchase order.`);
        await textBoxHelper.sendKeys(newPurchaseOrder.po, targetText);
     }

     /**
      * To enter the Sales number in the Sales Number.
      */
     this.enterSalesNumber = async function(targetText) {
        stepLogger(`Enter Sales Order "${targetText}" for new purchase order.`);
        await textBoxHelper.sendKeys(newPurchaseOrder.sales, targetText);
     }

     /**
      * To select the approval status of the new purchase order.
      * @author Innovify
      * @param {string} targetText 
      */
     this.selectApprovalStatus = async function(targetText) {
       stepLogger(`Select Approval Status ${targetText} for Purchase Order.`);
       await dropDownHelper.selectValueByText(newPurchaseOrder.approvalStatus, targetText);
     }

/**
 * To fetch the title from the Summary Page of the Order Status System 
    and return in text.
 * @author Innovify
 * @returns {string} 
 */
this.getTittleOfOrderStatusSystem  = async function() {
    stepLogger(`Fetch the title of the ${title} Summary Page`);
    let pageTitle = await customHelper.getTitleOfSummary(htmlTags.title, title);
    assertLogger(`Was able to get the title of the ${title} Summary Page`);
    return await pageHelper.getText(pageTitle);
  }

  /**
   * To review the details for Client in the review page of new purchase order.
   * @author Innovify
   */
  this.reiewNewPurchaseOrderForClient = async function() {
    stepLogger(`Review the details for Client.`);
    return await commonPageHelper.fetchDataForNthFieldFromReviewPage(reviewnewPurchaseOrder.client);
    
  }

  /**
   * To assert the details for Customer in the review page of new purchase order.
   * @author Innovify
   */
  this.reiewNewPurchaseOrderForCustomer = async function() {
    stepLogger(`Review the details for Customer.`);
    let customer = await commonPageHelper.fetchDataForNthFieldFromReviewPage(reviewnewPurchaseOrder.customer);
    return customer;
  }

  /**
   * To assert the details for Sales Order in the review page of new purchase order.
   * @author Innovify
   */
  this.reiewNewPurchaseOrderForSalesNo = async function() {
    stepLogger(`Review the details for Sales Order Number.`);
    let SalesNumber = await commonPageHelper.fetchDataForNthFieldFromReviewPage(reviewnewPurchaseOrder.sales);
    return SalesNumber;
  }

  /**
   * To assert the details for Approval Status in the review page of new purchase order.
   * @author Innovify
   */
  this.reiewNewPurchaseOrderForApprovalStatus = async function() {
    stepLogger(`Review the details for Approval Status.`);
    return await commonPageHelper.fetchDataForNthFieldFromReviewPage(reviewnewPurchaseOrder.approvalStatus);
  }

  /**
   * Navigate to the detail page of the Purchase Order.
   * @author Innovify
   */
  this.goToDetailPageOfPurchaseOrder = async function() {
    stepLogger(`Navigate to the detail page of the Order.`);
    let record = summaryRecords.get(0);
    await record.element(by.linkText('APPROVAL STATUS')).click();
    await waitHelper.waitForAngularCall();
  }

  /**
   * Fetch the PO detail from the Detail page.
   * @author Innovify
   */
  this.getPoOfDetailPage = async function() {
    stepLogger('To get the PO of the detail page of the Record after navigation.');
    return await commonPageHelper.fetchDataForNthFieldFromDetailPage(detailfieldsIndex.po ,detailfields);
  }

  /**
   * Go to the Edit page of the order.
   * @author Innovify
   */
  this.goToEditPage = async () =>{
    stepLogger('To edit the order from the detail page of the record.');
    await customHelper.clickOnLinkByText(editOrder);
  } 

/**
 * To filter the value from the summary by Approval Status.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByApprovalStatus = async function(targetValue, assertionValue = targetValue) {

  stepLogger(`Select "${targetValue}" from Aproval Status.`);
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.approvalStatus),
  await textBoxHelper.getTextFieldByPlaceholder(placeholder.approvalStatus)
  ,htmlTags.anchor, targetValue);
  assertLogger(`${targetValue} was selected from Aproval Status.`);

  await commonPageHelper.applySettings();

  stepLogger(`Assert for the ${assertionValue} value from the Summary.`);
  await commonPageHelper.assertRecordSubTitleOfSummaryB(assertionValue, summaryRecords, index.summary.approvalStatus);
  assertLogger(`Assertion was done for the ${assertionValue} from the summary.`);
}

/**
 * To filter the value from the summary by Order Status.
 * @author Innovify
 * @param {string} targetValue 
 * @param {string} assertionValue 
 */
this.filterAndAssertSummaryByOrderStatus = async function(targetValue, assertionValue = targetValue) {

  stepLogger(`Select "${targetValue}" from Aproval Status.`);
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.orderStatus),
  await textBoxHelper.getTextFieldByPlaceholder(placeholder.orderStatus)
  ,htmlTags.anchor, targetValue);
  assertLogger(`${targetValue} was selected from Aproval Status.`);

  await commonPageHelper.applySettings();

  stepLogger(`Assert for the ${assertionValue} value from the Summary.`);
  await commonPageHelper.assertRecordSubTitleOfSummaryB(assertionValue, summaryRecords, index.summary.orderStatus);
  assertLogger(`Assertion was done for the ${assertionValue} from the summary.`);
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.customer),
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
this.filterAndAssertSummaryByCustomerType = async function(targetValue) {
  stepLogger('Open Advance Filter Section');
  await commonPageHelper.clickOnAdvanceFilter();
  assertLogger('Advance filter section would be opened.');

  stepLogger(`Select "${targetValue}" from Customer type.`);
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.customerType),
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
this.filterAndAssertSummaryByLicensedState = async function(targetValue) {
  stepLogger('Open Advance Filter Section');
  await commonPageHelper.clickOnAdvanceFilter();
  assertLogger('Advance filter section would be opened.');

  stepLogger(`Select "${targetValue}" from Licensed States.`);
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.licensedStates),
  await textBoxHelper.getTextFieldByPlaceholder(placeholder.licensedStates)
  ,htmlTags.anchor, targetValue);
  assertLogger(`${targetValue} was selected from Licensed States.`);

  stepLogger('Open Advance Filter Section.');
  await commonPageHelper.clickOnAdvanceFilter();
  assertLogger('Advance filter section would be opened.');

  await commonPageHelper.applySettings();
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.nationalAccounts),
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.stateDistributionGroups),
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.inventoryProduct),
  await textBoxHelper.getTextFieldByPlaceholder(placeholder.inventoryProduct)
  ,htmlTags.anchor, targetValue);
  assertLogger(`${targetValue} was selected from Inventory Product.`);

  stepLogger('Open Advance Filter Section.');
  await commonPageHelper.clickOnAdvanceFilter();
  assertLogger('Advance filter section would be opened.');

  await commonPageHelper.applySettings();

  stepLogger('Should assert the value from the line items.');
  await commonPageHelper.verifyLineItems(targetValue, summaryRecords, index.filter.productDescription);
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.brand),
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.subBrand),
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
  await dropDownHelper.enterAndSelectElementByTag(await commonPageHelper.getFilterWithIndex(index.filter.subBrandProducts),
  await textBoxHelper.getTextFieldByPlaceholder(placeholder.subBrandProducts)
  ,htmlTags.anchor, targetValue);
  assertLogger(`${targetValue} was selected from state distribution group.`);

  stepLogger('Open Advance Filter Section.');
  await commonPageHelper.clickOnAdvanceFilter();
  assertLogger('Advance filter section would be opened.');

  await commonPageHelper.applySettings();
}

/**
 * To uncheck all the values of the Order Status Filter.
 * @author Innovify
 */
this.unCheckAllForOrderStatusFilter = async () =>{
   await commonPageHelper.deselectAllValues(index.filter.orderStatus);
}

/**
 * To delete the note from the record.
 * @author Innovify
 */
this.deleteNoteFromOss = async () => {
  await commonPageHelper.deleteNoteForRecord(deleteNote);
}

/**
 * To add the attachment for the record in Order Status System.
 * @author Innovify
 * @param {string} permission 
 */
this.addAttachmentForOss = async (permission) =>{
  await commonPageHelper.addAttachmentForRecord('Purchase order', permission, addAttachment);
}

/**
 * To edit the note for the record.
 * @author Innovify
 * @param {string} targetText 
 */
this.editNoteForRecord = async (targetText) =>{
   await commonPageHelper.editNoteForFirstRecord(targetText, editNote);
}

}
module.exports = new OrderStatusSystemPage();
