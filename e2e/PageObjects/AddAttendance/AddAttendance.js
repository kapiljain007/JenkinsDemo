const waitHelper = require('../../../ComponentHelpers/WaitHelper/WaitHelpers')

const addAttendancePage = function() {

    const userNameTextBox = $$('input[placeholder="Username"]')
    const passwordTextBox = $$('input[placeholder="Password"]')
    const LoginButton = element(by.name('login-button'));

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



    this.login = async function(Username, Password){
        
      //  let Username = browser.params.admin.username;
        stepLogger(`Enter the Username: ${Username}`);
        await userNameTextBox.sendKeys(Username)
        assertLogger(`Entered "${Username}" as the Username`);

		//let Password = browser.params.admin.password;
		stepLogger(`Enter the Password: ${Password}`);
        await passwordTextBox.sendKeys(Password)
        assertLogger(`Entered ${Password} as the Password`);

        stepLogger('Click on Sign-in button');
        await LoginButton.click();
        
        assertLogger('Click action was executed on Sign-in Button');
    }

    this.openCreateAttendancePage = async function(){
        const createAttendanceLink = $('.fa.fa-sticky-note');
        await waitHelper.waitForElementToBeClickable(createAttendanceLink, 'Test')
        await createAttendanceLink.click();   
    }

    this.selectProjectName = async function(){
        const projectName = $('option[value="98"]');
        await projectName.click();
    }

    this.selectAttendanceType = async function(){
        const projectName = $('option[value="Full"]');
        await projectName.click();
        
    }

    this.clickOnCreateButton = async function(){
        const createButton = element(by.buttonText('Create'));
        await createButton.click();
        await waitHelper.waitForFiveSeconds();
    }

    this.logout = async function(){
        const menu = $$('.dropdown.user.user-menu')
        const signOut = $$('.btn.btn-default.btn-flat')
        await menu.get(0).click();
        await signOut.get(0).click();
    }


}

module.exports = new addAttendancePage;