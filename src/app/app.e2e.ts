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

  describe('App Auth', () => {
    //http://product.moveline.com/testing-angular-apps-end-to-end-with-protractor.html

    let loginURL;
    //let email = element(by.name('login-email'));
    //let password = element(by.name('login-password'));
    //let loginButton = element(by.xpath('//form[1]/input[@type="submit"]'));
    //let error = element(by.model('loginError'));

    it('should redirect to the login page if trying to load protected page while not authenticated', () => {
      browser.get('/#/login');
      loginURL = browser.getCurrentUrl();

      browser.get('/#/dashboard');
      expect(browser.getCurrentUrl()).toEqual(loginURL);
    });
    //it('should warn on missing/malformed credentials', fail);
    //it('should accept a valid email address and password', fail);
    //it('should return to the login page after logout', fail);
  });
});
