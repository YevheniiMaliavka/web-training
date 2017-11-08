require('chromedriver');

const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

const By = webdriver.By;

const until = webdriver.until;

const selectors = {
    form: By.id('e2e-form'),
    login: By.id('e2e-input-login'),
    password: By.id('e2e-input-password'),
    submit: By.id('e2e-button-submit'),
    image: By.id('e2e-cool-image')
}

describe('Simple selenium test', function() {
    beforeEach(function(done){
        driver.get('http://localhost:8080')
        .then(done);
    })

    afterEach(function(done){
        driver.close().then(done);
    })

    it('should show image on form submit', function(done) {
      driver.wait(until.elementIsVisible(driver.findElement(selectors.form)), 1000)
      .then(function(){driver
           return driver.findElement(selectors.login).sendKeys('my-login');
      }).then(function(){
           return driver.findElement(selectors.password).sendKeys('my-password');
      }).then(function(){
           return driver.findElement(selectors.submit).click();
      }).then(function(){
          return driver.wait(until.elementLocated(selectors.image));
      }).then(function(){
          // lets see the image
          return setTimeout(done, 1000);
      })
    }).timeout(10000);
})


