import { browser, element, by } from 'protractor';

export class UrlmgrClientNg4Page {
  navigateTo() {
    return browser.get('/');
  }

  getngVersion() {
    let appRoot = element(by.tagName('app-root'));
    //console.log("appRoot found");
    let ngVersion = appRoot.getAttribute('ng-version');
    console.log("ngVersion found");
    console.log(ngVersion);
    return ngVersion;
  }
}
