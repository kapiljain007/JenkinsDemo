const Login = require('../Pages/MarketingWebsite/LoginPage');



describe('To verify login functionality', function(){

    beforeAll(async function() {
        await Login.goToUrl();
    });

    it('To open Login page', async function(){
        await Login.clickOnLoginButton();
    });

    it('To check login functionality', async function(){
        await Login.login();
    });
})