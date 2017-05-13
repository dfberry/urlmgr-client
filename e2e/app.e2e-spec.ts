import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/')
  });
  fit('should have page source', () => {
    browser.getPageSource()
    .then( (txt) => {
        console.log(txt);
    });

  });
});

