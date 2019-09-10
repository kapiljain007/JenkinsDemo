const waitHelper = requireHelper('WaitHelpers');

const AlertHelpers = function () {

      // Accept the alert to appear
      this.acceptAlert = async function(message = 'Alert is not present') {
          await waitHelper.waitForAlertToBePresent(waitHelper.setDefaultWaitTime(), message);
           browser.switchTo().alert().then(function (alert) {
            alert.accept();
        });
      }

      //Dismiss the alert
      this.dismissAlert = async function(message = 'Alert is not present') {
          await waitHelper.waitForAlertToBePresent(waitHelper.setDefaultWaitTime(), message);
          browser.switchTo().alert().then(function (alert) {
            alert.cancel();
        });
      };

      // Get the text for the Alert
      this.getAlertText = async function(message = 'Alert text could not be retrieved') {
        await waitHelper.waitForAlertToBePresent(waitHelper.setDefaultWaitTime(), message);
          return browser.switchTo().alert().then(function (alert) {
            return alert.getText()
              .then(function(text){
              return text;
              })
            });
          }
    }
module.exports = new AlertHelpers();
