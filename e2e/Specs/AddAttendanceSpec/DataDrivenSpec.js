
var using = require('jasmine-data-provider');
const addAttendancePage = require('../../PageObjects/AddAttendance/AddAttendance');


describe('Data driven test spec', function () { 
   /*define sets of input data as array in method called arrayOfData*/
   //OR retrieve all test data and stored into array and the follow below    
   //approach

   function arrayOfData() {
   return [
          {
            "username": "kapil.j",
            "passwordField": "123456"
          },

         {
          "username": "milan.m",
          "passwordField": "milan1234"
          }
      ]
    } /*below one will loop the test case based on data size and pass single  
       data set every time till complete the end of array*/

     using(arrayofData, function (inputData) {
      it('test case logic to be executed for each set of data', function (){
                addAttendancePage.goToUrl();
                addAttendancePage.login();
                addAttendancePage.openCreateAttendancePage();
                addAttendancePage.selectProjectName()
                addAttendancePage.selectAttendanceType();
                addAttendancePage.clickOnCreateButton();
        });
    });
 });