const testData = require('../../../TestData/Operations/InternationalShipment.json');
const homePage = require('../../NavigatorPageObjects/Dashboard/DashboardPage');
const clientPage = require('../../NavigatorPageObjects/Login/ClientPage');
const loginPage = require('../../NavigatorPageObjects/Login/LoginPage');
const intShipmentPage = require('../../NavigatorPageObjects/Operations/InternationalShipmentsPage');


testData.forEach(function(Data){
    describe("Test Suite of International Shipment Tool.",function(){
   
       beforeAll(async function() {
           await loginPage.goToUrl(Data['url']);
       });
   
       beforeEach(async function(){
           preCondition();
           await loginPage.signInAsPsi();
           await clientPage.selectTheClient(Data['client']);
           await homePage.goToInternationalShipmentTool();
       })
   
       afterEach(async function(){
           postCondition();
           await homePage.signOut();
       })

       it('should able to navigate to International shipment tool', async function() {
           await expect(await intShipmentPage.getTittleofInternationalShipmentTool()).toBe(Data['title']);
       })

       fit('should be able to add a new shipment', async function() {
            await intShipmentPage.goToAddShipmentForm();
            await intShipmentPage.selectSupplier('Brad Tuyn - FL');
            
       })

    })

})