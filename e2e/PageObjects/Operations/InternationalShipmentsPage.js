const pageHelper = require('../../../ComponentHelpers/ElementHelper/PageHelpers');
const textBoxHelper = require('../../../ComponentHelpers/ElementHelper/TextBoxHelpers');
const customHelper = require('../../../ComponentHelpers/CustomHelper/CustomHelpers');
const commonHelperPage = require('../../NavigatorPageObjects/Common/CommonHelperPage');
const dropDownHelper = require('../../../ComponentHelpers/ActionHelper/DropdownHelpers');

const InternationalShipmentsPage = function() {

    /**
     * Locators of International Shipment.
    */

    title = 'International Shipments';

    // Add New Shipment
    const addNewShipmentLink = 'Add a New Shipment';
    const addShipmentForm = {

        // Basic Information
        client : element(by.name('client_id')),
        shipmentReference : element(by.name('shipment_reference')),
        shipmentStatus : element(by.name('status')),
        suppliers : {
            placeholder : 'Enter Suppliers name..',
            index: 0
        },
        docsSentToBroker: 'sent_to_broker',
        isfSent: 'isf_sent',
        customClearance: 'cleared_customs',
        entryNumber: element(by.name('entry_number')),
        shipmentType: element(by.name('shipment_type')),
        wssaInsured: element(by.name('wssa')),
        coordinator: element(by.name('coordinator')),

        //Shipping Dates
        estimatedDepartureDate : 'departure_date',
        estimatedArrivalDateToPort : 'arrival_date',
        estimatedArrivalFinalDestination : 'arrival_date_final',
        lastFreeDay: 'last_free_date',
        
        //Freight Information
        arrangedBy : element(by.name('arrange_by')),
        frieghtForwader: {
            placeholder: 'Enter Freight Forwarder name..',
            index : 1
        },
        shippingMethod: element(by.name('shipping_method')),
        originCountry: element(by.name('origin_country')),
        quotedRate: element(by.name('quoted_rate')),
        rateTerms: element(by.name('rate_terms')),
        portToDoorCarrier: {
            placeholder: 'Type Port to Door Carrier..',
            index: 2
        },
        portOfLanding: element(by.name('port_of_lading')),
        portOfEntry: element(by.name('port_to_entry')),
        destination: element(by.name('destination')),

        //Cargo Information
        totalCases: element(by.name('cases')),
        totalCaseTaxPaid: element(by.name('cases_tax_paid')),
        casesInBond: element(by.name('cases_bond')),
        containerNumber: element(by.name('container_number')),
        billOfLading: element(by.name('bol_number')),
        cargoType: element(by.name('cargo_type')),
        cargoSize: element(by.name('cargo_size')),
        hazmat: element(by.name('hazmat'))
    }

    /**
     * Test methods for International Shipment.
     * @author Innovify
    */

    /**
        * To fetch the title from the Summary Page of the International Shipment tool
        and return in text. 
    */
    this.getTittleofInternationalShipmentTool = async function() {
        stepLogger(`Fetch the title of the ${title} Summary Page`);
        let shipmentTitle = await customHelper.getTitleOfSummary(tag = 'h1', title);

        assertLogger(`Was able to get the title of the ${title} Summary Page`);
        return await pageHelper.getText(shipmentTitle);
    }

    /**
     * To click on Add a new Shipment.
     */
    this.goToAddShipmentForm = async function() {
        await customHelper.clickOnLinkByText(addNewShipmentLink);
    }

    /**
     * To select the value from Server side search drop-down.
     * @param {string} targetText 
     */
    this.selectSupplier = async function(targetText) {
        let supplierPlaceholder = addShipmentForm.suppliers.placeholder;
        let supplierIndex = addShipmentForm.suppliers.index;

        stepLogger('To select the value from the Supplier drop-down')
        await commonHelperPage.selectValueFromServerSearchDropDown(supplierIndex, 
            supplierPlaceholder, targetText);
    }

    /**
     *  Add Shipment -> Basic Information Section
    */

    /**
     * To select the client name from the list.
     * @param {string} targetClient
     */
    this.selectClient = async function(targetClient) {
        let clientLocator = addShipmentForm.client; 
        stepLogger(`Select the client "${targetClient}" from the list.`);
        await dropDownHelper.selectValueByText( clientLocator, targetClient);
    }

    /**
     * To Enter the Shipment reference number
     * @param {string} targetText 
     */
    this.enterShipmentReference = async function(targetText) {
        let textLocator = addShipmentForm.shipmentReference;
        stepLogger('Enter Shipment reference number');
        await textBoxHelper.sendKeys(targetText);
    }

    /**
     * To pick a date for ISF by picking random mid - date from current month. 
     */
    this.setDateForIsf = async function() {
        let dateLocator = addShipmentForm.isfSent;
        stepLogger('Pick date for the ISF Date');
        await commonPageHelper.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To pick a date for Doc sent to Broker by picking random mid - date from current month.
     */
    this.setDateForDocSentToBroker = async function() {
        let dateLocator = addShipmentForm.docsSentToBroker;
        stepLogger('Pick date for Doc sent to Broker');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To pick a date for clearance by picking random mid - date from current month.
     */
    this.setDateForCustomClearance = async function() {
        let dateLocator = addShipmentForm.customClearance;
        stepLogger('Pick date for Custom Clearance');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To enter the entry number for the new shipment. 
     * @param {string} targetText 
     */
    this.enterEntryNumber = async function(targetText) {
        let textLocator = addShipmentForm.entryNumber;
        stepLogger('Enter the entry number.');
        await textBoxHelper.sendKeys(textLocator, targetText);
    }
    
    /**
     * To select the shipment type.
     * @param {string} targetText 
     */
    this.shipmentType = async function(targetText) {
        let dropDownLocator = addShipmentForm.shipmentType;
        stepLogger(`Select value "${targetText}" from Shipment Type.`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }

    /**
     * To set option for WSSA Insured.
     * @param {string} targetText 
     */
    this.selectWssaInsured = async function(targetText) {
        let dropDownLocator = addShipmentForm.wssaInsured;
        stepLogger(`Select option "${targetText}" for WSSA Insured.`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }

    /**
     * To select coordinator.
     * @param {string} targetText 
     */
    this.selectCoordinator = async function(targetText) {
        let dropDownLocator = addShipmentForm.coordinator;
        stepLogger(`Select coordinator "${targetText}"`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }

    /**
     * Shipment Dates
    */

    /**
     * To set date for Estimated departure Time.
     */
    this.setDateForEstimatedDepartureTime = async function() {
        let dateLocator = addShipmentForm.estimatedDepartureDate;
        stepLogger('Pick date for Estimated Departure date.');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To set date for Estimated Arrival date to port.
    */
    this.setDateForEstimatedArrivalDateToPort = async function() {
        let dateLocator = addShipmentForm.estimatedDepartureDate;
        stepLogger('Pick date for Estimated Departure date.');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To set date for Estimated Arrival to Final destination.
    */
    this.setDateForEstimationFinalDestination = async function() {
        let dateLocator = addShipmentForm.estimatedArrivalFinalDestination;
        stepLogger('Pick date for Estimated Arrival to Final destination date.');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * To set date for Last free day.
     */
    this.setDateForLastFreeDay = async function() {
        let dateLocator = addShipmentForm.lastFreeDay;
        stepLogger('Pick date for last free day.');
        await commonHelperPage.getMidDateOfCurrentMonth(dateLocator);
    }

    /**
     * Frieght Information.
    */

    /**
     * To select value for arrange By 
    */
    this.selectValueForArrangedBy = async function(targetText) {
        let dropDownLocator = addShipmentForm.arrangedBy;
        stepLogger(`Select option "${targetText}" for Arranged By.`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }

    /**
     * To select frieght forwader.
     * @param {string} targetText 
     */
    this.selectFrieghtForwader = async function(targetText) {
        let frieghtForwaderPlaceholder = addShipmentForm.frieghtForwader.placeholder;
        let frieghtForwaderIndex = addShipmentForm.frieghtForwader.index;

        stepLogger('To select the value from the frieght forwader drop-down')
        await commonHelperPage.selectValueFromServerSearchDropDown(frieghtForwaderIndex, 
            frieghtForwaderPlaceholder, targetText);
    }

    /**
     * To select shipping method
     * @param {string} targetText
    */
    this.selectShippingMethod = async function(targetText) {
        let dropDownLocator = addShipmentForm.shippingMethod;
        stepLogger(`Select option "${targetText}" for Arranged By.`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }
    
    /**
     * To select the origin country.
     * @param {string} targetText 
     */
    this.selectOriginCountry = async function(targetText) {
        let dropDownLocator = addShipmentForm.originCountry;
        stepLogger(`Select option "${targetText}" for Origin Country.`);
        await dropDownHelper.selectValueByText(dropDownLocator, targetText);
    }
}
module.exports = new InternationalShipmentsPage();