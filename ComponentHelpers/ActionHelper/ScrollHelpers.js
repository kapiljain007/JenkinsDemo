const ScrollHelper = function(){

	// Scroll to Bottom
	this.scrollToBottom = function(){
		browser.executeScript("window.scrollTo(0,document.body.scrollHeight)");
	}

	// Scroll to Top
	this.scrollToTop = function(){
		browser.executeScript("window.scroll(0,0)");
	}

	// Scroll to Element Below
	this.scrollToElementBelow = async function(el){
		return await browser.executeScript('arguments[0].scrollIntoView(true);',el);
	}

	// Scroll to Element Above
	this.scrollToElementAbove = async function(el){
		return await browser.executeScript('arguments[0].scrollIntoView(false);',el);
	}

	// Scroll to Element Right
	this.scrollToRight = function(){
		browser.executeScript("window.scrollBy(2000,0)");
	}

	// Scroll to Element Left
	this.scrollToLeft = function(){
		browser.executeScript("window.scrollBy(-2000,0)");
	}

	// Scroll to Element to View
	this.scrollToElement= function(element) {
        browser.executeScript('arguments[0].scrollIntoView();', element);
    }

}
module.exports = new ScrollHelper();
