
const Select = function(){

var Select = function(selector) {
    this.webElement = element(selector);
};

// Select options by Tag name
Select.prototype.getOptions = function() {
    return this.webElement.all(by.tagName('option'));
};

// Select options by selected
Select.prototype.getSelectedOptions = function() {
    return this.webElement.all(by.css('option[selected="selected"]'));
};

// Select by Value
Select.prototype.selectByValue = function(value) {
    return this.webElement.all(by.css('option[value="' + value + '"]')).click();
};

// Select by partial Text
Select.prototype.selectByPartialText = function(text) {
    return this.webElement.all(by.cssContainingText('option', text)).click();
};

//Select by Text
Select.prototype.selectByText = function(text) {
    return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
};

}
module.exports = new Select();
