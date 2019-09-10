const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers.js');
const customHelper = require('../../../ComponentHelpers/CustomHelper/CustomHelpers.js');
const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers.js');
const dropdownHelper = require('../../../ComponentHelpers/ActionHelper/DropdownHelpers.js');
const textboxHelper = require('../../../ComponentHelpers/ElementHelper/TextBoxHelpers.js');
const actionHelper = require('../../../ComponentHelpers/ActionHelper/ActionHelpers');
const commonHelperPage = require('./CommonHelperPage');

const SaveReportPage = function() {

    /**
     * Locators of the Save report Component.
     * @author Innovify
     */
     const eliptical = $('i.fa.fa-ellipsis-v.fa-1x.black.u-pt1.u-ml4.u-dib.u-v-mid.csr-ptr');
     const saveReport = 'Save this Report';
     const saveInputBox = $('input[placeholder="Report name..."]');
     const saveButton = $('button[data-ng-click="$ctrl.submitData();"]');
     const saveTitle = $('h2[class="b-h3 u-pt4 u-pb3 u-tc ng-binding"]');
     
     // My saved Report
     const mySavedReport = 'My Saved Reports';
     const savedReportsTitle = $$('h1.b-h4-xs.b-h3.cust-name.ng-binding.ng-scope');
     const savedReportRecords = element.all(by.repeater('row in vm.savedReportData'));
    
     /**
      * To Click on the tray.
      * @author Innovify
      */
    this.openTray = async function() {
        await pageHelper.click(eliptical);
        waitHelper.waitForTwoSeconds(); // To wait till the tray opens.
    }

    /**
     * To click on Save report and launch Save report.
     * @author Innovify
     */
    this.clickOnSaveReport = async function() {
        await customHelper.clickOnLinkByText(saveReport);
        waitHelper.waitForTwoSeconds(); // To wait till the tray opens.
    }

    /**
     * To enter the name for the fields.
     * @author Innovify
     * @param {string} targetText
     */
    this.EnterReportName = async function(targetText) {
        await textboxHelper.sendKeys(saveInputBox, targetText);
    }

    /**
     * To click on the save button to save the report.
     * @author Innovify
     */
    this.saveReport = async function() {
        await pageHelper.click(saveButton);
    }

    /**
     * To get the text of the success title.
     * @author Innovify
     * @returns Text
     */
    this.getSaveTitle = async function() {
        return await saveTitle.getText();
    }

    /**
     * click on Saved reports.
     * @author Innovify
     */
    this.clickOnMySavedReports = async function() {
        await customHelper.clickOnLinkByText(mySavedReport);
        await waitHelper.waitForAngularCall();
    }

    /**
     * Navigate to My saved Reports.
     * @author Innovify
     */
    this.navigateToMySavedReports = async function() {
        stepLogger('Click on eliptical button.');
        await this.openTray();

        stepLogger('Click on My Saved reports.');
        await this.clickOnMySavedReports();
    }


    /**
     * To save a report for the summary.
     * @author Innovify
     * @param {string} targetText 
     */
    this.OpenAndSaveTheReportForSummary = async function(targetText) {
        stepLogger('Click on eliptical button.');
        await this.openTray();
        assertLogger('Tray should be open.');

        stepLogger('Click on Save report.');
        await this.clickOnSaveReport();
        assertLogger('Saved report should open.');

        stepLogger(`Enter ${targetText} in the field.`);
        await this.EnterReportName(targetText);
        assertLogger(`${targetText} was entered in the field.`);

        stepLogger('click on Save button.');
        await this.saveReport();
        assertLogger('Save button was clicked.');
    }

    /**
     * To assert the success title after saving the report.
     * @author Innovify
     */
    this.assertSavedReport = async function() {
        expect(await this.getSaveTitle()).toBe('Report Saved!');
        await commonHelperPage.closeSubmitPopUp();
    }

    /**
     * To assert saved report from the reports.
     * @param {string} targetText 
     * @author Innovify
     */
    this.viewRecordsFromSavedReport = async function(targetText) {
        var results = await savedReportsTitle.map(async function(result){
             return await result.getText(); 
        });
        
       var filterValue =  await results.filter(function(text){
            return text === targetText;  
        })
        return filterValue[0];
     }

}
module.exports = new SaveReportPage(); 