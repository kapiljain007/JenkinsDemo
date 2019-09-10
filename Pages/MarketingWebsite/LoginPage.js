const LoginPage = function(){

    
    const loginButton = element(by.css('.nav-item.gnr-log'));
    const email = element(by.name('email'));
    const password = element(by.name('password'));
    const loginButton1 = element(by.css('.LoginPage__LoginButton-jwKHQs.euFxgV.btn.btn-secondary'));

    this.goToUrl = async function(){
		browser.ignoreSynchronization = true;
		let url = browser.baseUrl;
		stepLogger(`Navigate to the ${url}`);
		await browser.get(url);
		assertLogger(`Navigated to ${url}`);
	}

    // To click on login button from mktweb
    this.clickOnLoginButton = async function(){
        stepLogger(`click on login button`);
        await loginButton.click();
        assertLogger(`clicked successfully`);
    }

    // Login function
    this.login = async function(){
        stepLogger(`Try Login`);
        await email.sendKeys('kapil@mailinator.com');
        await password.sendKeys('Test@123');
        await loginButton1.click();
        assertLogger(`Login successfully`);

    }
}

module.exports = new LoginPage();