
const addAttendancePage = require('../../PageObjects/AddAttendance/AddAttendance');
const testData = require('../../../TestData/addAttendance.json')

testData.forEach(function(Data){
    describe('To add attendance.',function (){

        beforeAll(async function() {
            await addAttendancePage.goToUrl();
        });

        beforeEach(async function(){
            preCondition();
            await addAttendancePage.login(Data.username, Data.password);
        });
    
        afterEach(async function(){
            postCondition();
            await addAttendancePage.logout();
        });


    it('To Add attendance in Innovify ParkStreet.',async function(){
        await addAttendancePage.openCreateAttendancePage();
        await addAttendancePage.selectProjectName()
        await addAttendancePage.selectAttendanceType();
        await addAttendancePage.clickOnCreateButton();
        
    });

    

});
});