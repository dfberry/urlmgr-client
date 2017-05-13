import { browser, by, element } from 'protractor';


describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Url Manager';
    expect(subject).toEqual(result);
  });

  it('should have buttons', () => {
    let subject = element(by.css('button')).getText();
    let result  = 'Login';
    expect(subject).toEqual(result);
  });

  //describe('App Auth', () => {
    //http://product.moveline.com/testing-angular-apps-end-to-end-with-protractor.html

    //let loginURL;
    //let email = element(by.name('user-name'));
    //let password = element(by.name('password'));
    //let loginButton = element(by.xpath('//form[1]/input[@type="submit"]'));
    //let error = element(by.model('loginError'));

    //it('should redirect to the login page if trying to load protected page while not authenticated', () => {
      //browser.get('/#/login');
      //loginURL = browser.getCurrentUrl();

      //browser.get('/#/dashboard');
      //expect(browser.getCurrentUrl()).toEqual(loginURL);
    //});
    //it('should warn on missing/malformed credentials', fail);
    //it('should return to the login page after logout', fail);
    //it('should accept a valid email address and password', () => {
      
      //browser.get('/');
      //expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login');
      
      //browser.executeScript("document.getElementById('username').value = '1@1.com';");
      //browser.executeScript("document.getElementById('password').value = '1@1.com';");

      //element(by.id('debug')).getText().then( debugtext => {
      //  expect(debugtext).toBe("1@1.com 1@1.com");
      //});

/*
      password = element(by.id('password'));
      expect(password).toBe("1@1.com");

      element(by.name('button-login')).submit().then(function(text) {
        expect(text).toBe("Login Success");
      });
*/

    //});

  //});
});
