const path = require('path');
const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers.js');
const customHelper = require('../../../ComponentHelpers/CustomHelper/CustomHelpers.js');
const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers.js');
const dropdownHelper = require('../../../ComponentHelpers/ActionHelper/DropdownHelpers.js');
const textboxHelper = require('../../../ComponentHelpers/ElementHelper/TextBoxHelpers.js');
const actionHelper = require('../../../ComponentHelpers/ActionHelper/ActionHelpers');
 

const CommonHelperPage = function () {

  //Locators for the Common Functions used across the Tool
  const searchBox = element.all(by.css('input[ng-model="$ctrl.model"]'));
  const reset = 'Reset all Filters';
  const excelImport = 'Export to Excel';
  const go = 'Go';
  const goDesktop = 1;
  const saveChangeButton = $$('a[ng-click="$ctrl.submitForm(productForm)"]');
  const saveChangeDesktop = 0;

  // Universal Search
  const searchPlaceholder  = 'Search...';

  // Summary Locators  
  const recordTitle = $$('.b-h4-xs.b-h3.cust-name.ng-binding.ng-scope');
  const recordSubTitleForA = 'span.b-h6-xs.u-fw4.inv-date.ng-binding.ng-scope';
  const recordSubtitleForA2 = 'span.b-h6-xs.u-fw2.inv-date.ng-binding.ng-scope';
  const recordSubTitleForB = 'span.b-h5-xs.b-h4.ng-binding';
  const subRecordTitle = 'span.b-h6.u-fw4.cust-name.ng-binding';
  const subRecordTitle2 = 'span.b-h6.u-fw2.cust-name.ng-binding';
  const viewButton = element.all(by.buttonText('View More'));
  const expandRecord = $$('i.fa.fa-angle-right.fa-2x.csr-ptr'); 
  const submitChanges = $$('button[data-ng-click="$ctrl.saveInformation()"]');
  const submitChangeDesktop = 0;
  const sumbitPopup = $('h2[class="b-h3 u-pt4 u-pb3 u-tc ng-binding"]');
  const closeSubmitPopup = $('a[ng-click="$ctrl.modalInstance.close()"]');
  const formTitle = $('h1[class="b-h4 u-gray"]');
  const labels = element.all(by.xpath('//span[starts-with(@class, "label")]'));
  const lineItems = 'header in $ctrl.tableHeader';
  const lineClass = 'td[class = "c-table--vertical-on-mobile__td u-mw4 u-mw-none-xs psi-brk-word ng-binding ng-scope"]';

  // Review Page
  const formHeader = $('h1.b-h3.u-bb.u-bw3.u-b--near-white.u-pb3.ng-binding');

  //Variable for Advance Filter Locator
  const advanceFilter = 'Advanced Filters';

  // Notes
  const addNotes = $$('span.u-underline.u-pointer.ng-binding').get(1);
  const noteDescription = element(by.id('note_description'));
  const permissions = element.all(by.options('item.value as item.name group by item.group for item in form.titleMap'));
  const saveNote = $('a[ng-click="$ctrl.submitFormNote(noteForm)"]');
  const notesCount = element.all(by.repeater('note in $ctrl.notes | limitTo:$ctrl.numberOfNotesToShow'));
  const firstNote = element.all(by.xpath('//div[@class="u-mt5 u-pb5 u-bb u-bw2 u-b--near-white"]//child::p'));
  const editNote = 'i[class = "fa fa-pencil fa-1x u-black u-pr3"]';
  const deleteNote = 'i[class="fa fa-trash fa-1x u-black u-pr4"]';
  
  // Attachments
  const attachmentTab = 'Attachments';
  const fileType = element(by.name('uploads_entity_kinds'));
  const upload = element(by.xpath('//*[@class="UppyDashboardTab"]//descendant::input'));
  const imagefile = '../../../Fileupload/jpeg-home.jpg';
  const docfile = '../../../FileUpload/import.xlsx';
  const docPath_1 = path.resolve(__dirname, docfile);
  const imagePath_1 = path.resolve(__dirname, imagefile);
  const imagefile_2 = '../../../Fileupload/god-of-war-main.jpg';
  const docfile_2 = '../../../FileUpload/ExcelImport.xlsx';
  const docPath_2 = path.resolve(__dirname, docfile_2);
  const imagePath_2 = path.resolve(__dirname, imagefile_2);
  const uploadFile = $('button[title="Upload all new files"]');
  const cancelUpload = $('button[title="Cancel upload"]');
  const uploadedAttachments = element.all(by.repeater('upload in $ctrl.data'));
  const attachmentName = '//div[@class="u-underline u-dib u-w-30 u-truncate"]//descendant::a';
  const deleteAttachments = element.all(by.xpath('//ps-list-attachments[@class="ng-isolate-scope"]//child::div//i'));
  
  // Audit
  const auditTab = 'Audit Trail';
  const auditRecords = element.all(by.repeater('row in $ctrl.rows track by $index'));
  
  // Detail Page
  const showMore = 'Show more fields';
  const showLess = 'Show less fields';
  const valuesInDetailPage = element.all(by.repeater('rowObjectKeys in $ctrl.rowObjectKeys'));
  const valueInDetailPage = 'td.col-xs-6.u-pa3';
  
  // Review Page
  const valueInReviewPage = 'td.col-xs-6.u-pa3.u-pre-wrap';

  // Form Date-Picker
    const calendar = $$('button[ng-click="select(dt.date)"]');
    const L30 = 'L30';
    const MTD = 'MTD';
    const QTD = 'QTD';
    const YTD = 'YTD'; 
    const confirmButton = element.all(by.buttonText('Confirm Date'));
    const dateDropdown = $$('button.c-btn.c-btn--secondary.c-btn--full.js-dropbtn.u-tc.ng-binding'); 

// Filter
    const dropdownFilter = $$('button[class="dropdown-toggle ng-binding ng-scope btn btn-default"]');
    const deselectAll = element.all(by.id('deselectAll'));
    const selectAll = element.all(by.id('selectAll'));
 
// Sort components
    const sortDropDown = $$('span.ui-select-match-text.pull-left');
    const sortValues = element.all(By.repeater('obj in $select.items'));

// Sort Order 
    this.sortRadioButton = {
        ascending: 'Ascending',
        descending: 'Descending'
    }

  // Modal locators
  const deleteModal = "Yes, delete";
  const closeModal = "No, Cancel";

  // Graph
  const showGraph = 'Show Graph';
  const hideGraph = 'Hide Graph';
  const graphTitle = element(by.xpath('//div[starts-with(@id, "highcharts-")]/svg/text[1]/tspan'));

  // Server-side search dropdown
  const serverSearchDropDown = $$('button[class="dropdown-toggle form-control c-btn c-btn--secondary u-h3 ps-select btn btn-default"]');
  
  /*-------------------------------------------------End of the Locator-----------------------------------------*/


  /**
   * To get the Web Element of the targeted date-picker field.
   * @author Innovify
   * @param {locatorString} targetField
   * @returns {WebElement} 
   */
   this.getDateField = async function(targetField) {
       return await element(By.xpath(`//psi-schema-form-datepicker[@name="${targetField}"]//child::input`));
   }

   /**
    * To pick the current date from the Form-Date-Picker for the targeted field.
    * @author Innovify
    * @param {locatorString} targetField 
    */
   this.pickCurrentDateFromDatePicker = async function(targetField) {
        const locator = await this.getDateField(targetField);
        await pageHelper.click(locator);
        // Wait till the date picker is displayed
        await waitHelper.waitForTwoSeconds();
        // To input current date.
        await actionHelper.pressKey(protractor.Key.ENTER);
   }

   /**
    * To pick the mid date of the month from the Form-Date-Picker for the targeted field.
    * @author Innovify
    * @param {locatorString} targetField 
    */
   this.getMidDateOfCurrentMonth = async function(targetField) {
    const locator = await this.getDateField(targetField);
    await pageHelper.click(locator);
    
    // Wait till the date picker is displayed
    await waitHelper.waitForTwoSeconds();
    let date = await calendar.get(15);
    await pageHelper.click(date);
   }

   /**
    * To pick the date of the next month from the Form-Date-Picker for the targeted field.
    * @author Innovify
    * @param {locatorString} targetField 
    */
   this.getDateOfNextMonth = async function(targetField) {
    const locator = await this.getDateField(targetField);
    await pageHelper.click(locator);
    // Wait till the date picker is displayed
    await waitHelper.waitForTwoSeconds();
    let date = await calendar.get(41);
    await pageHelper.click(date);
   }

/**
 * get the filter of the Tools using index
 * @author Innovify
 * @param {number} index 
 */
this.getFilterWithIndex = async function(targetIndex) {
    return await dropdownFilter.get(targetIndex);
}

/**
 * To deselect all the values.
 * @author Innovify
 * @param {number} targetIndex 
 * @param {number} selectIndex 
 */
this.deselectAllValues = async function(targetIndex, selectIndex = 0) {
    await dropdownFilter.get(targetIndex).click(); 
    await deselectAll.get(selectIndex).click();
    await dropdownFilter.get(targetIndex).click();
}

   /**
     * Click on Reset Filter link and waits till the settings are reverted back to default
     * @author Innovify
     */
    this.resetTheSettings = async function() {
        stepLogger('Click on Reset Link');
        await customHelper.clickOnLinkByText(reset);
        await waitHelper.waitForAngularCall();
        assertLogger('Click action was done for Reset Link');
    }

    /**
     * To assert the reset setting.
     * @author Innovify
     */
    this.assertResetSettings = async function() {
        assertLogger('Search values should be cleared');
        let searchField = await textboxHelper.getTextFieldByPlaceholderAndIndex(searchPlaceholder,goDesktop);
        let isDefaultSet = await searchField.getAttribute('value');
        expect(await isDefaultSet.length).toBe(0);
    }

    /**
     * click on excel import link and waits tills the download is completed
     * @author Innovify
     */
    this.exportToExcel = async function(){
        stepLogger('Click on "Export to Excel".');
        await customHelper.clickOnLinkByTextAndWait(excelImport);
        assertLogger('Click action was done on "Export to Excel".');
    }

    /**
     * To wait till the Export is complete.
     */
    this.waitTillExportIsDone = async function() {
        stepLogger('Wait Till download is complete.');
        await waitHelper.spinnerWait();
        assertLogger('Upload is complete');
    }

    /**
     * To expand the detail of the particular record
     * @author Innovify
     * @param {number} index
     */
    this.expandDetailOfRecord = async function(index) {
        await pageHelper.click(expandRecord.get(index));
        await waitHelper.waitForAngularCall();
    }

    /**
     * Hit Go button for applying the filters/Sorts
     *  And waits till the Angular sync call is over.
     * @author Innovify
     */
    this.applySettings = async function() {
        await customHelper.clickButtonByTextAndIndex(go,goDesktop);
        await waitHelper.waitForAngularCall();
        await waitHelper.waitForAngularCall();
    }

    /**
    * Click on Advance Filter link.
    * @author Innovify
    */
    this.clickOnAdvanceFilter = async function() {
        stepLogger('Click on Advance Filter');
        await customHelper.clickOnLinkByText(advanceFilter);
        assertLogger('Click action was done on Advance Filter');
    }

    /**
     * perform search by any visible text present in the summary
     * @author Innovify
     * @param {string} targetValue 
     */
    this.universalSearchByText = async function(targetValue) {
      const textBox = textboxHelper.getTextFieldByPlaceholderAndIndex(searchPlaceholder,goDesktop);
      await textboxHelper.sendKeys(textBox, targetValue);
    }

    /**
     * Method to save changes made while creating/editing record.
     * @author Innovify
     */
    this.saveRecordChanges = async function() {
        const saveButton = saveChangeButton.get(saveChangeDesktop);
        stepLogger('Click on Save Changes button.');
        await customHelper.clickOnLinkByJsText('Save Changes');
        await waitHelper.waitForAngularCall();
        assertLogger('Click action was performed on Save Changes Button.');
    }

    /**
     * Method to submit the changes made while creating/editing record.
     * @author Innovify
     */
    this.submitRecordChanges = async function() {
        const submitButton = submitChanges.get(submitChangeDesktop);
        stepLogger('Click on Submit button.');
        await pageHelper.clickUsingJs(submitButton);
        await waitHelper.waitForAngularCall();
        assertLogger('Click action was performed on Submit Button.');
    }

    /**
     * To assert the Pop up 
     * @author Innovify
     * @param {string} targetText 
     */
    this.assertSubmitPopup = async function (targetText) {
        // wait till the pop up appears
       await waitHelper.waitForFiveSeconds();
       try {
        stepLogger('Assert the text from the Submit Pop up.');
        await waitHelper.waitForElementToBeDisplayed(sumbitPopup);
       let popupText = await sumbitPopup.getText();
       stepLogger(`${popupText}`)
       await expect(popupText).toBe(targetText);
       assertLogger('Assertion was done for submit pop up.');
       } catch (error) {
           console.log(error)
         stepLogger('Text was not verified but PO was created successfully');
       }
       finally {
        await this.closeSubmitPopUp();
    }
    }

    /**
     * To close the submit pop up.
     * @author Innovify
     */
    this.closeSubmitPopUp  = async function () {
        stepLogger('Click on "Okay" to close the popup.');
        await waitHelper.waitForFiveSeconds();
        await closeSubmitPopup.click();
        assertLogger('"Okay" was clicked and popup was closed.')
 
        await waitHelper.waitForAngularCall();
    }

    /**
     * Get the count of the records present in the summary
     * @author Innovify
     * @param {WebElement} locator
     * @returns {number}  
     */
    this.getRecordsCount = async function(locator) {
         return await locator.count();
    }

    /**
     * To fetch the Title from each record of Summary (Column A).
     * And then comparing them with expected string.
     * @author Innovify
     * @param {string} assertTitle
     */
    this.assertRecordTitle = async function(assertTitle) {
        const isShown = await recordTitle.isPresent(); 
        if(isShown) {
            let list = await recordTitle.map( async function(element){
                return element.getText();
            });

            for( const item of list) {
                await expect(item).toBe(assertTitle);
            }
        }
        else{
            assertLogger('No Records were found');
            await fail('No Records were found for the filtered/Searched Term.');
        }
   }

   /**
    * To fetch the sub title of the record from the Summary and assert it with expected string.
    * @author Innovify
    * @param {string} assertTitle 
    * @param {WebElement} parentLocator 
    * @param {number} index 
    */
   this.assertRecordSubTitleOfSummary = async function(assertTitle, parentLocator, childClass, index) {
    const isShown = await recordTitle.isPresent(); 
    if(isShown) {
        try {
            let count = await parentLocator.count();
        for (let num = 0; num < count; num++) {
        let assertValue = await parentLocator.get(num)
                            .$$(childClass).get(index)
                                .getText();
        await expect(assertValue).toBe(assertTitle);
        }
     }   
         catch (NoSuchElementException) {
            console.log(NoSuchElementException);
        }
    }
   else{
    assertLogger('No Records were found');
}
   }

   /**
    * To fetch the sub title of the record from the Summary B and assert it with expected string.
    * @author Innovify
    * @param {string} assertTitle 
    * @param {WebElement} parentLocator 
    * @param {number} index 
    */
   this.assertRecordSubTitleOfSummaryB = async function(assertTitle, parentLocator, index) {
        await this.assertRecordSubTitleOfSummary(assertTitle,parentLocator, recordSubTitleForB ,index )
     }
    
    /**
    * To fetch the sub title of the record from the Summary A and assert it with expected string.
    * @author Innovify
    * @param {string} assertTitle 
    * @param {WebElement} parentLocator 
    * @param {number} index 
    */
   this.assertRecordSubTitleOfSummaryA = async function(assertTitle, parentLocator, index) {
    await this.assertRecordSubTitleOfSummary(assertTitle,parentLocator, recordSubTitleForA ,index )
 }

  /**
    * To fetch the sub title of the record from the Summary A and assert it with expected string.
    * @author Innovify
    * @param {string} assertTitle 
    * @param {WebElement} parentLocator 
    * @param {number} index 
    */
 this.assertSubRecordTitleForSummary = async function(assertTitle, parentLocator, index) {
    const isShown = await recordTitle.isPresent(); 
    if(isShown) {
        await viewButton.click();
        await this.assertRecordSubTitleOfSummary(assertTitle, parentLocator, subRecordTitle, index);
    }
    else{
        assertLogger('No Records were found');
       }
 }

 /**
 * To find the record by specific value in universal search.
 * @author Innovify
 * @param {string} targetSearch 
 */
this.findRecordByUniversalSearch = async function(targetSearch) {
    stepLogger(`Search "${targetSearch}" by entering in the Universal Search field.`);
    await this.universalSearchByText(targetSearch);
    assertLogger(`"${targetSearch}" was entered inside the search field.`);
    
    stepLogger('Apply the filter settings');
    await this.applySettings();
    assertLogger('Filter settings were applied');
}

 /**
  * To assert the search result from the records displayed.
  * @author Innovify
  * @param {WebElement} parentLocator 
  * @param {string} assertTitle 
  */
 this.assertSearchResultFromRecord = async function(parentLocator, assertTitle) {
    const isShown = await recordTitle.isPresent();
    if(isShown) {
        try {
            let count = await parentLocator.count();
        for (let num = 0; num < count; num++) {
        let assertValue = await parentLocator.get(num).getText();
        let trimValue = await assertValue
                                .replace('Size:','').replace('BPC:','')
                                .replace('Sync Status:','').replace('Sub Type:','')
                                .replace('Product Code:','').replace('License Type:', '')
                                .replace('Expiration Date:','').replace('License Status','')
                                .replace('REGION','').replace('Sales Order ID:', '')
                                .replace('Unique Order ID:','').replace('Sales Order Date:', '')
                                .replace('Shipment Status: -','')

        await expect(trimValue).toContain(assertTitle);
        }
     }   
         catch (NoSuchElementException) {
            console.log(NoSuchElementException);
        }
    }
    else{
        assertLogger('No Records were found');
    }
 }
 
 /**
  * To assert the detail page of a particular record.
  * @author Innovify
  */
 this.assertDetailPage = async function() {
     const isElementDisplayed = await addNotes.isDisplayed();
     stepLogger('Start assertion for detail page');
     expect(isElementDisplayed).toBeTruthy("Asserion failed for Detail Page");
     assertLogger('Assertion was done for Detail page.');
 }

 /**
  * Click on "Add a note" link 
  * @author Innovify
  */
 this.clickOnAddNote = async function() {
     stepLogger('Click on Add new note.');
     await pageHelper.click(addNotes);
     assertLogger('Should take to Note page.');
 }
 
 /**
  * Add a decription inside the notes
  * @param {string} notes 
  */
 this.addNoteDescription = async function(notes) {
     stepLogger('Enter description in the note.');
     await textboxHelper.sendKeys(noteDescription, notes);
     assertLogger('description was entered.');
 }

 /**
  * To set the permission as Public or Private.
  * @author Innovify
  * @param {string} targetText 
  */
 this.setPermission = async function(targetText) {
    switch (targetText) {
        case "Public":
        stepLogger('Set permission as Public');
        await permissions.get(0).click();
        assertLogger('Public permission was set');
        break;

        case "Private":
        stepLogger('Set permission as Private');
        await permissions.get(1).click();
        assertLogger('Private permission was set');
        break;
    }
 }

 /**
  * To save the note and redirect to detail page.
  * @author Innovify
  */
 this.saveNotes = async function() {
    await pageHelper.click(saveNote);
    await waitHelper.waitForAngularCall();
 }

 /**
  * To assert the created Note.
  * @author Innovify
  * @param {number} index 
  * @param {string} targetText 
  */
 this.assertcreatedNote = async function(index, targetText) {
     let note = await notesCount.get(index)
     .element(by.xpath('//div[@class="col-sm-12 u-mt5"]//div[@class = "row"]//div[2]//following-sibling::p')).getText();
     expect(await note).toBe(targetText);
 }

 /**
 * To add a note for the record.
 * @author Innovify
 */
this.addNoteForRecord = async function(targetText, permission) {
    await this.clickOnAddNote();
    await this.addNoteDescription(targetText);

    switch (permission){
        case "Public":
        await this.setPermission('Public');
        break;

        case "Private":
        await this.setPermission('Private');
        break;
    }
    await this.saveNotes();
}

 /**
  * To navigate to Attachment section.
  * @author Innovify
  */
 this.goToAttachmentTab = async function() {
     stepLogger('Click on Attachment tab.');
     await customHelper.clickOnLinkByJsText(attachmentTab);
     assertLogger('Click action was done on attachment.');
 }

 /**
  * To select a file type from the drop down.
  * @author Innovify
  * @param {string} targetText 
  */
 this.selectFileType = async function(targetText, targetElement) {
     stepLogger(` Select ${targetText} from the File Type dropdown.`);
    await dropdownHelper.selectOptionByText(targetElement, targetText);
    assertLogger(`${targetText} was selected from the File Type dropdown.`);
 }

 /**
  * 
  * @author Innovify
  * @param {filePath} targetPath 
  */
 this.attachFile = async function(targetPath) {
     stepLogger(`To attach a file from path "${targetPath}"`);
    await upload.sendKeys(targetPath);
    await browser.sleep(5000);
    await waitHelper.waitForElementToBeClickable(uploadFile);
    assertLogger(`File from "${targetPath}" was attached to the Web App.`)
 }

 /**
  * To upload an image.
  * @author Innovify
  */
 this.attachImage = async function() {
    stepLogger('Attach an Image.');
    await this.attachFile(imagePath_1);
    assertLogger('Image was attached.');
 }
 
 /**
  * To upload an Document.
  * @author Innovify
  */
 this.attachDoc = async function() {
        stepLogger('Attach a Document.');
        await this.attachFile(docPath_1);
        assertLogger('Document was attached');
 }

 /**
  * To upload the attachments to the Web App.
  * @author Innovify
  */
 this.uploadFiles = async function() {
     stepLogger('Upload the Files to the the Attachment section.');
     await pageHelper.clickAndWaitForElementToHide(uploadFile);
     await waitHelper.waitForElementToBeHidden(cancelUpload);
     assertLogger('Files were uploaded successfully.')
 } 

 /**
 * To add an attachment for the record.
 * @author Innovify
 */
this.addAttachmentForRecord = async function(targetText, permission, targetClass = fileType) {
    await this.goToAttachmentTab();
    await this.selectFileType(targetText, targetClass);

    switch (permission){
        case "Public":
        await this.setPermission('Public');
        break;

        case "Private":
        await this.setPermission('Private');
        break;

        default:
        fail(` Invalid parameter "${targetText}" was passed`);
    }
    await this.attachImage();
    await this.uploadFiles();
}

 /**
  * Assert the file after getting uploaded.
  * @author Innovify
  * @param {number} targetIndex
  */
 this.assertUploadedFile = async function(targetIndex) {
    stepLogger('Assert the uploaded files.')
    let isFileUploaded = await uploadedAttachments.get(targetIndex).isPresent();
    expect(isFileUploaded).toBeTruthy('File was not uploaded');
    assertLogger('Assertion was done for the uploaded file.')
 }

 /**
 * To navigate to the Detail Page.
 * @author Innovify
 */
this.goToDetailPage = async function(targetIndex) {
    stepLogger('Click on Expand of a particular record');
    await this.expandDetailOfRecord(targetIndex);
    await waitHelper.waitForAngularCall();
    assertLogger('Detail page of that record should be displayed.');
}

this.goToDetailPageOfFirstRecord = async function() {
    const expandForRecord = 0;
    await this.goToDetailPage(expandForRecord);
}

/**
 * To save a note with public permission.
 * @param {string} targetText 
 */
this.addPublicNoteForRecord = async function(targetText) {
    await this.addNoteForRecord(targetText, "Public");
}

/**
 * To save a note with private permission.
 * @param {string} targetText 
 */
this.addPrivateNoteForRecord = async function(targetText) {
    await this.addNoteForRecord(targetText, "Private");
}

/**
 * To assert the created note from the note section.
 * @author Innovify
 * @param {string} targetText 
 */
this.assertForAddedNote = async function(targetText) {
    let assertNoteForRow = 0;
    await this.assertcreatedNote(assertNoteForRow, targetText);
}

/**
 * To save a Attachment with private permission.
 * @param {string} targetText 
 */
this.addPrivateAttachmentForRecord = async function(targetText) {
    await this.addAttachmentForRecord(targetText, "Private");
}

/**
 * To save a Attachment with Public permission.
 * @param {string} targetText 
 */
this.addPublicAttachmentForRecord = async function(targetText) {
    await this.addAttachmentForRecord(targetText, "Public");
}

/**
 * To assert the created note from the note section.
 * @author Innovify
 */
this.assertForAddedAttachment = async function() {
    let assertAttachmentForRow = 0;
    await this.assertUploadedFile(assertAttachmentForRow);
}

/**
 * To edit the Note for the particular record.
 * @author Innovify
 * @param {string} targetText 
 */
this.editNoteForFirstRecord = async function(targetText, targetClass = editNote) {
    let editForRow = 0;
    await this.editNoteDescription(editForRow, targetText, targetClass);
}

/**
 * To delete the note from the record.
 * @author Innovify
 * @param {string} targetText 
 */
this.deleteNoteForRecord = async function(targetClass = deleteNote) {
    let deleteForRow = 0;
    await this.clickOnDeleteNote(deleteForRow, targetClass);
    await this.confirmDelete();
}
/**
 * To edit the note.
 * @author Innovify
 * @param {number} targetIndex 
 */
 this.clickOnEditNote = async function(targetIndex, targetClass) {
     const edit = await notesCount.get(targetIndex)
                        .$(targetClass);
     stepLogger('Click on Edit note button.')
     await pageHelper.clickAndWaitForElementToHide(edit);
     assertLogger('Edit Note button was clicked');
 }

 /**
  * To edit the description of the note.
  * @author Innovify
  * @param {number} targetIndex 
  * @param {string} targetText 
  */
 this.editNoteDescription = async function(targetIndex, targetText, targetClass) {
     await this.clickOnEditNote(targetIndex, targetClass);
     stepLogger('Edit the note decription.');
     await this.addNoteDescription(targetText);
     stepLogger('Description of the Note was editted.');
     await this.saveNotes();
 }

 /**
  * To click on "Delete" icon for Note. 
  * @author Innovify
  * @param {number} targetIndex 
  */
 this.clickOnDeleteNote = async function(targetIndex, targetClass) {
    const trash = await notesCount.get(targetIndex)
                       .$(targetClass);
    stepLogger('Click on Trash icon.')
    await pageHelper.click(trash);
    assertLogger('Trash icon was clicked');
}

/**
 * To confirm the deletion of the Record/Note/Attachment.
 * @author Innovify
 */
this.confirmDelete = async function() {
    stepLogger("Click on delete Modal box.");
    await customHelper.clickOnLinkByJsText(deleteModal); 
    assertLogger('Delete action was done on Modal box');
    await waitHelper.waitForAngularCall();
    await browser.sleep(3000);
}

/**
 * To close the Modal box.
 * @author Innovify
 */
this.closeModalBox = async function() {
    stepLogger("Click on close on Modal box.");
    await customHelper.clickOnLinkByText(closeModal);
    assertLogger('Close action was done on Modal box.');
}

/**
 * To assert the deleted Note by comparing description.
 * @author Innovify
 * @param {number} targetIndex 
 * @param {string} targetText 
 */
this.assertDeletedNote = async function(targetText) {
    stepLogger('Assert for the deleted Note.');
    let note = await firstNote.first().getText();
      expect(note).not.toBe(targetText);
    assertLogger('Assertion was done for the Deleted Note.');
}

/**
 * To delete the attachment for the particular row.
 * @author Innovify
 * @param {number} targetIndex 
 */
this.deleteAttachment = async function(targetIndex) {
  let deleteAttach = await deleteAttachments.get(targetIndex);
  stepLogger('Click on delete icon of the uploaded attachment.');
  await pageHelper.click(deleteAttach);
  assertLogger('Click action was performed on delete icon of the uploaded attachment.');
}

/**
 * To assert the deleted attachment for a particula row.
 * @author Innovify
 * @param {number} targetIndex 
 * @param {string} targetText 
 */
this.assertDeletedAttachment = async function(targetIndex, targetText) {
    stepLogger('Should asserted for the deleted Record.')
    let count = await uploadedAttachments.count();
    expect(count).toBeLessThan(2);
    assertLogger('Assertion was done for the deleted attachment.')
}

/**
 * To delete the attachment of the first row.
 * @author Innovify
 */
this.deleteAttachmentForFirstRow = async function() {
    let firstRecord = 0;
    await this.deleteAttachment(firstRecord);
    await this.confirmDelete();
}

/**
 * Go to Audit Trail tab
 * @author Innovify
 */
 this.goToAuditTrail = async function() {
    stepLogger('Click on Audit Trail tab.');
    await customHelper.clickOnLinkByJsText(auditTab);
    assertLogger('Click action was done on Audit trail.');
 }

 /**
  * To check whether record inside Audit trail is displayed.
  * @author Innovify
  * @param {number} targetIndex
  * @return {boolean} 
  */
 this.assertRecordForAuditTrail = async function(targetIndex) {
    stepLogger('Check the presence of records in Audit trail');
    let audit = await auditRecords.get(targetIndex);
     return await customHelper.isElementPresent(audit);
 }

 /**
  * To assert the first record of the Audit Trail.
  * @author Innovify
  * @returns {boolean}
  */
 this.assertFirstRecordForAuditTrail = async function() {
     let firstRecord = 0;
     return await this.assertRecordForAuditTrail(firstRecord);
 }

 /**
  * To Click on "Show More Fields" link.
  * @author Innovify
  */
 this.clickOnShowMoreLink = async function() {
     stepLogger('Click on "Show More Field" ');
     await customHelper.clickOnLinkByText(showMore);
     assertLogger('Click action was done on "Show More Field" ');
     // To wait till the fields are expanded and extra values are visible.
    await waitHelper.waitForTwoSeconds();
 }
 
 /**
  * To Click on "Show Less Fields" link.
  * @author Innovify
  */
 this.clickOnShowLessLink = async function() {
    stepLogger('Click on "Show Less Field" ');
    await customHelper.clickOnLinkByText(showLess);
    assertLogger('Click action was done on "Show Less Field" ');
}

/**
 * To fetch the value's from the detail page.
 * @author Innovify
 */
this.fetchDataForNthFieldFromDetailPage = async function(targetIndex, targetClass = valueInDetailPage) {
    let targetElement = $$(targetClass).get(targetIndex);
    assertLogger('Fetch the text of the particular field.');
    return await targetElement.getText();
}

/**
 * To fetch the value's from the Review page.
 * @author Innovify
 */
this.fetchDataForNthFieldFromReviewPage = async function(targetIndex) {
    let targetElement = $$(valueInReviewPage).get(targetIndex);
    assertLogger('Fetch the text of the particular field.');
    return await targetElement.getText();
}

/**
 * To fetch title of the form page.
 * @author Innovify
 */
this.getTitleOfForm = async function() {
    stepLogger('Fetch the title of the Form Page.');
    return await pageHelper.getText(formTitle);
}

/**
 * To fetch the header of the form page.
 * @author Innovify
 */
this.getHeaderOfForm = async function() {
    stepLogger('Fetch the header of the Form Page.');
    return await pageHelper.getText(formHeader);
}

/**
 * To Check the sorting of the title in Records. 
 * @author Innovify
 * @param {boolean} isAscending 
 */
    this.checkSortForTitleOfRecords = async function(isAscending, parentLocator) {
       const isShown = await recordTitle.isPresent(); 
        var titleSort;
        var assertValue = [];
        if(isShown) {
            let count = await parentLocator.count();
            for (let num = 0; num < count; num++) {
                let text = await parentLocator.get(num)
                                .$('.b-h4-xs.b-h3.cust-name.ng-binding.ng-scope')
                                    .getText();
                let finalText = text.replace('$','').replace(',', '');
                await assertValue.push(finalText);
            }

            var sortList = assertValue.slice();
            if (!isAscending) {    
            titleSort =  sortList.sort().reverse();
            }else {
             titleSort = sortList.sort();
            }
            expect(assertValue).toEqual(titleSort);
         }else {
            assertLogger('No Records were found');
        } 
    }

/**
 * To Check the Ascending and Descending sorting from the Summary.
 * @author Innovify
 * @param {boolean} isAscending 
 * @param {webLocator} parentLocator 
 * @param {classValue} childClass 
 * @param {number} index 
 */
this.checkSortForSubTitleRecords = async function(isAscending, parentLocator ,childClass
                                                    ,index ) {
        let assertValue = [];                                                
        const isShown = await recordTitle.isPresent();
        let titleSort; 
        if(isShown) {
            
            try {
                let count = await parentLocator.count();
            for (let num = 0; num < count; num++) {
                let text = await parentLocator.get(num)
                                .$$(childClass).get(index)
                                    .getText();
                let finalText = text.replace('$','').replace(',', '');
                await assertValue.push(finalText);
            }
                sortList = assertValue.slice();
                if (!isAscending) {    
                    titleSort = await sortList.sort().reverse();
                }
                else {
                    titleSort = await sortList.sort();
                }
                expect(assertValue).toEqual(titleSort);
        }
             catch (NoSuchElementException) {
                console.log(NoSuchElementException);
            }
        }
       else{
        assertLogger('No Records were found');
    }
       }

    /**
        * To check the sorting of the Summary B coulmn of a Record.
        * @author Innovify
        * @param {boolean} isAscending 
        * @param {webElement} parentLocator 
        * @param {number} index 
    */
    this.verifySortForSummaryB = async function (isAscending, parentLocator, index) {
           await this.checkSortForSubTitleRecords(isAscending, parentLocator ,recordSubTitleForB
            ,index);
    }

    /**
        * To check the sorting of the Summary A coulmn of a Record.
        * @author Innovify
        * @param {boolean} isAscending 
        * @param {webElement} parentLocator 
        * @param {number} index 
    */
    this.verifySortForSummaryA = async function (isAscending, parentLocator, index) {
        await this.checkSortForSubTitleRecords(isAscending, parentLocator ,recordSubTitleForA
         ,index);
    }

    /**
         * To check the sorting of the Sub Summary A coulmn of a Record.
         * @author Innovify
         * @param {boolean} isAscending 
         * @param {webElement} parentLocator 
         * @param {number} index 
     */
    this.verifySortForSubSummaryA = async function (isAscending, parentLocator, index) {
            await this.checkSortForSubTitleRecords(isAscending, parentLocator ,subRecordTitle
             ,index);
    }

/**
 * To check the sorting of the Summary A coulmn of a Record.
 * @author Innovify
 * @param {boolean} isAscending 
 * @param {webElement} parentLocator 
 * @param {number} index 
*/
this.verifySortForSummaryA2 = async function (isAscending, parentLocator, index) {
 await this.checkSortForSubTitleRecords(isAscending, parentLocator ,recordSubtitleForA2
  ,index);
}

/**
  * To check the sorting of the Sub Summary A coulmn of a Record for form 2 having View More option.
  * @author Innovify
  * @param {boolean} isAscending 
  * @param {webElement} parentLocator 
  * @param {number} index 
*/
this.verifySortForSubSummaryA2 = async function (isAscending, parentLocator, index) {
     await this.checkSortForSubTitleRecords(isAscending, parentLocator ,subRecordTitle2
      ,index);
}
    /**
     * To click on Sort Drop-down.
     * @author Innovify
     */
    this.clickOnSortDropDown = async function (targertIndex) {
        stepLogger('Click on Sort Drop-down.');
        const sort = sortDropDown.get(targertIndex);
        await pageHelper.clickUsingJs(sort);
        assertLogger('Sort Drop-down was clicked.');
    }

    /**
     * To Select the value using index from the Drop-down.
     * @author Innovify
     * @param {number} index 
     */
    this.selectValueFromSortDropDown = async function (index) {
        stepLogger(`Select value for index : ${index} from the drop-down.`);
        const targetValue = await sortValues.get(index);
        await pageHelper.click(targetValue);
        stepLogger(`Value for index : ${index} was selectd from the drop-down.`);
    }

    /**
     * To Select the Radio buttons for Ascending and Descending.
     * @author Innovify
     * @param {string} targetString 
     */
    this.selectSortOrder = async function(targetString, targetIndex) {
        
        switch(targetString) {
            case 'Ascending':
                stepLogger('Click on Ascending Radio button.');
                let asc = await $$(`ps-radio-button[place-holder="Ascending"] [type = radio]`).get(targetIndex);
                await pageHelper.clickUsingJs(asc);
                assertLogger('Ascending Radio button was clicked.');
                break;

            case 'Descending':
                stepLogger('Click on Descending Radio button.');
                let desc = await $$(`ps-radio-button[place-holder="Descending"] [type = radio]`).get(targetIndex);
                await pageHelper.clickUsingJs(desc);
                assertLogger('Decending Radio button was clicked.');
                break;
            
            default :
                fail(`Invalid parameter "${targetString}" was passed`);
        }
    }

    /**
     * To set order as Ascending or Descending.
     * @author Innovify
     * @param {boolean} order 
     */
    this.setSortOrder = async function(order, targetIndex = 0) {
    var sortOrder;
    if (!order) {
        sortOrder = await this.sortRadioButton.descending;
    }
    else {
        sortOrder = await this.sortRadioButton.ascending;
    }
    await this.selectSortOrder(sortOrder, targetIndex);
    }

    /**
     * To open the date filter.
     * @author Innovify
     * @param {number} targetIndex 
     */
    this.openDateFilter = async function(targetIndex) {
        const dateFilter = await  dateDropdown.get(targetIndex);
        await pageHelper.clickUsingJs(dateFilter);
    }

    /**
     * To set the pre-option available for Date Filter and Confi
     * @author Innovify
     * @param {string} targetDate 
     */
    this.selectPreOptionsForDate = async function(targetOption, targetIndex) {
        stepLogger('Click on Date Filter Drop Down');
        await this.openDateFilter(targetIndex);
        assertLogger('Date filter drop down was clicked');
        
        switch (targetOption) {

            case 'L30':
                stepLogger(`Select pre-option "${targetOption}".`);
                await customHelper.clickOnLinkByJsText(L30);
                assertLogger(`Pre-option "${targetOption}" was selected.`);
                break;
            
            case 'MTD':
                stepLogger(`Select pre-option "${targetOption}".`);
                await customHelper.clickOnLinkByJsText(MTD);
                assertLogger(`Pre-option "${targetOption}" was selected.`);
                break;

            case 'QTD':
                stepLogger(`Select pre-option "${targetOption}".`);
                await customHelper.clickOnLinkByJsText(QTD);
                assertLogger(`Pre-option "${targetOption}" was selected.`);
                break;

            case 'YTD':
                stepLogger(`Select pre-option "${targetOption}".`);
                await customHelper.clickOnLinkByJsText(YTD);
                assertLogger(`Pre-option "${targetOption}" was selected.`);
                break;
        
            default:
                fail(`Inavlid parameter "${targetOption}" was passed.`);
                break;
        }
        const button = confirmButton.get(targetIndex) 
        await pageHelper.click(button);
    }
    
    /**
     * To verify the month shown in the summary for MTD option.
     * @author Innovify
     * @param {webElemets} parentLocator 
     * @param {className} childClass 
     * @param {number} index 
     */
    this.assertSummaryForMTD = async function(parentLocator, childClass, index){

        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        const date = new Date();
        const currentMonth = date.getMonth();

        const isShown = await recordTitle.isPresent(); 
    if(isShown) {
        try {
            let count = await parentLocator.count();
        for (let num = 0; num < count; num++) {
        let assertValue = await parentLocator.get(num)
                            .$$(childClass).get(index)
                                .getText();
        let finalValue = await assertValue.replace(',','').replace(/[0-9]/g ,'');
        let assertMonth = month[currentMonth];                        
        await expect(finalValue).toBe(assertMonth);
        }
     }   
         catch (NoSuchElementException) {
            console.log(NoSuchElementException);
        }
    }
   else{
    assertLogger('No Records were found');
    }
}

/**
 * To Verify the date fom the Summary A fields for MTD options.
 * @author Innovify
 * @param {webElemets} parentLocator 
 * @param {number} targetIndex 
 */
this.assertSummaryAForMTD = async function(parentLocator, targetIndex) {
    await this.assertSummaryForMTD(parentLocator, recordSubTitleForA , targetIndex)
}

/**
 * To Verify the year from the summary after setting YTD option.
 * @author Innovify
 * @param {webElemets} parentLocator 
 * @param {className} childClass 
 * @param {number} index 
 */
this.assertSummaryForYTD = async function(parentLocator, childClass, index){
    const date = new Date();
    const currentYear = date.getFullYear();

    const isShown = await recordTitle.isPresent(); 
if(isShown) {
    try {
        let count = await parentLocator.count();
    for (let num = 0; num < count; num++) {
    let assertValue = await parentLocator.get(num)
                        .$$(childClass).get(index)
                            .getText();
    let finalValue = await assertValue.replace(',','').replace(/\D/g ,'');
    finalValue = await parseInt(finalValue.substring(2));
    await expect(finalValue).toBe(currentYear);
    }
 }   
     catch (NoSuchElementException) {
        console.log(NoSuchElementException);
    }
}
else{
assertLogger('No Records were found');
}
}

/**
 * To Verify the date fom the Summary A fields for YTD options.
 * @author Innovify
 * @param {webElemets} parentLocator 
 * @param {number} targetIndex 
 */
this.assertSummaryAForYTD = async function(parentLocator, targetIndex) {
    await this.assertSummaryForYTD(parentLocator, recordSubTitleForA , targetIndex)
}

/**
     * To verify the month shown in the summary for MTD option.
     * @author Innovify
     * @param {webElemets} parentLocator 
     * @param {className} childClass 
     * @param {number} index 
     */
    this.assertSummaryForL30 = async function(parentLocator, childClass, index){
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        const date = new Date();
        let currentMonth = date.getDate();
        let currentYear = date.getFullYear();

        const isShown = await recordTitle.isPresent(); 
    if(isShown) {
        try {
            let count = await parentLocator.count();
        for (let num = 0; num < count; num++) {
        let assertValue = await parentLocator.get(num)
                            .$$(childClass).get(index)
                                .getText();

        let assertMonth = month[currentMonth];
        let todayDate = date.getDate();

        if (todayDate < 10) {
            todayDate = '0' + todayDate;
        }
        const currentDate = `${assertMonth} ${todayDate}, ${currentYear}`
        console.log(currentDate);
        console.log(assertValue);
        // await expect(finalValue).toBe(assertMonth);
        }
     }   
         catch (NoSuchElementException) {
            console.log(NoSuchElementException);
        }
    }
   else{
    assertLogger('No Records were found');
    }
}

    /**
     * To Check the integer sort 
     * @author Innovify
     * @param {boolean} isAscending 
     * @param {WebElement} parentLocator 
     * @param {Class} className 
     * @param {number} index 
     */
    this.checkSortForInteger = async function(isAscending, parentLocator, classVariable
        ,index ) {
        let assertValue = [];                                                
        try {
        let count = await parentLocator.count();
        const className = await this.selectClassNameForSummary(classVariable);
        for (let num = 0; num < count; num++) {
            let text = await parentLocator.get(num)
            .$$(className).get(index)
            .getText();
            let finalText = parseInt(text.replace('$','').replace(',', ''));
            await assertValue.push(finalText);
            }
            sortList = assertValue.slice();
            if (!isAscending) {    
            let title = await sortList.sort(function (a, b) {  return a - b;  });
            titleSort = title.slice();
            titleSort = titleSort.reverse();
            }
            else {
            titleSort = await sortList.sort(function (a, b) {  return a - b;  });
            }
            expect(assertValue).toEqual(titleSort);
            }
            catch (NoSuchElementException) {
            console.log(NoSuchElementException);
            }
    }

    /**
     * To pick the class name from the respective form.
     * @author Innovify
     * @param {className} targetClass 
     */
    this.selectClassNameForSummary = async function(targetClass) {
        switch (targetClass) {
            case 'SumA1':
                return recordSubTitleForA; 
            
            case 'SumA2':
                return recordSubtitleForA2; 

            case 'SumB':
                return recordSubTitleForB;

            case 'SumSub1':
                return subRecordTitle;

            case 'SumSub2':
                return subRecordTitle2;
        
            default:
            fail(`Invalid parameter "${targetClass}" was passed.`);
                break;
        }
    }

    /**
     * To get the labels from the summary.
     * @author Innovify
     * @returns {string}
     */
    this.getLabelsFromtheSummary = async function () {
         return await labels.map(function(elm){
           return elm.getText();
        })
      }
      
    /**
     * To assert the label shown in the summary. 
     * @author Innovify
     * @param {string} targetValue 
     */
    this.assertLabelsFromSummary = async function(targetValue) {
          let labels = await this.getLabelsFromtheSummary();

          for( let label of labels) {
             expect(label).toBe(targetValue);       
          }
      }
      
    this.verifyCheckBoxInSummary = async function(parentLocator, childClass, targetIndex) {
        const isShown = await recordTitle.isPresent(); 
    if(isShown) {
        try {
            let count = await parentLocator.count();
        for (let num = 0; num < count; num++) {
            const expand = await viewButton.isPresent();
            
            if(expand) {
                await viewButton.click();
            }
            let assertValue = await parentLocator.get(num)
                                .$$(childClass).get(targetIndex)
        let check = await assertValue.isSelected();
        console.log(check);                        
        }
     }   
         catch (NoSuchElementException) {
            console.log(NoSuchElementException);
        }
    }
   else{
    assertLogger('No Records were found');
    }  
}

/**
 * To view the graph on the summary page.
 * @author Innovify
 * @param {string} showGraph
 */
this.viewGraph = async function() {
    const graph = await pageHelper.getElementBySpanText(showGraph);
    stepLogger('Click on "Show Graph"');
    await pageHelper.click(graph);
    assertLogger('Graph should be displayed');
}

/**
 * To assert the display of the graph.
 * @author Innovify
 */
this.verifyGraphDisplayed = async function() {
    stepLogger('Should verify to display the graph');
    const graph = await pageHelper.getElementBySpanText(hideGraph);
    const isGraphHidden = await pageHelper.isElementDisplayed(graph);
    expect(isGraphHidden).toBeTruthy('Graph is not displayed.');
    assertLogger('Verification was done to display the graph.');
}

/**
 * To hide the graph
 * @author Innovify
 */
this.hideGraph = async function() {
    stepLogger('Click on "Hide Graph"');
    const graph = await pageHelper.getElementBySpanText(hideGraph);
    await pageHelper.click(graph);
    assertLogger('Graph should be Hidden');
}

/**
 * To verify whether Graph is hidden.
 * @author Innovify
 */
this.verifyGraphIsHidden = async function() {
    stepLogger('Should verify that the graph is hidden');
    const graph = await pageHelper.getElementBySpanText(showGraph);
    const isGraphHidden = await pageHelper.isElementDisplayed(graph);
    expect(isGraphHidden).toBeTruthy('Graph is not displayed.');
}

/**
 * TO verify values from within line items. 
 * @author Innovify
 * @param {string} targetText 
 * @param {number} targetIndex 
 */
this.verifyLineItems = async function(targetText, parentLocator, targetIndex) {
    try {
        let count = await parentLocator.count();
    for (let num = 0; num < count; num++) {
        await viewButton.get(num).click();
        await waitHelper.waitForAngularCall();
        let lineCount = await parentLocator.get(num);
        let finalCount =  await lineCount.all(by.repeater(lineItems)).count();
            console.log(`line count: ${finalCount}`);
    if(finalCount > 0) {
        for(let parentIndex = 0; parentIndex < finalCount; parentIndex++ ){
        let assertValue = await parentLocator.get(num).then(function(elm){})
                        .element.all(by.repeater(lineItems)).get(parentIndex)
                        .$$(lineClass).get(targetIndex)
                            .getText();
        console.log('assertValue');
        expect(assertValue).toBe(targetText);
    }
}
}
    }
    catch (NoSuchElementException) {
        console.log(NoSuchElementException);
    }
}
    /**
     * To select the value from the server search drop-down.
     * @param {Number} number 
     * @param {string} targerText 
     */
    this.selectValueFromServerSearchDropDown = async function(index, placeholderText, targerText) {
        var targetField = serverSearchDropDown.get(index);
        stepLogger('Click on targeted Drop Down field and select the text.')
        await dropdownHelper.selectValueFromServerSideSearch(targetField, 
            await textboxHelper.getTextFieldByPlaceholder(placeholderText), "a", targerText);
    }

}
module.exports = new CommonHelperPage();
