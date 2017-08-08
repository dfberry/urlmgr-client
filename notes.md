# UrlmgrClientNg4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0. webpack was extracted and cli was removed due to conflict with statically typed errors.

NG version = 4.x
Webpack = 2.x

## Development server

Run `http-server dist -p 3000` for a dev server. Navigate to `http://localhost:3000/`. 

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

fixing ng
    "start": "ng serve --host 0.0.0.0 --port 3000",
    ng eject

    Chrome in docker Container
    https://hub.docker.com/r/markadams/chromium-xvfb-js/


Docker/Chromium/Protractor/Selenium Issues
> whereis chromium-browser

http://becausejavascript.com/faking-x-server-to-run-js-unitintegration-tests-in-chrome/
https://github.com/elgalu/docker-selenium/issues/20#issuecomment-133011186


urlmgr-client-running:
build files then use 'npm run test:serve:protractor' to run e2e

fix to e2e tests running in container:
https://github.com/SeleniumHQ/docker-selenium/issues/429

testing
https://github.com/blacksonic/angular-testing-ground

good examples of unit tests
http://stackoverflow.com/questions/39623722/angular-2-final-release-router-unit-test

testing individual form elements
http://stackoverflow.com/questions/38365761/angular2-use-ngmodel-with-ngmodeloptions-standalone-true-to-link-to-a
http://plnkr.co/edit/N95Scj9LcUbxaLhZismT?p=preview

form validation
https://angular.io/docs/ts/latest/cookbook/form-validation.html

lifecycle hooks for classes
http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
http://plnkr.co/edit/9GsRwyNmDMFwAtyg25Xh?p=preview

form element via jasmine test 
https://angular.io/docs/ts/latest/cookbook/form-validation.html
http://plnkr.co/edit/N95Scj9LcUbxaLhZismT?p=preview
https://github.com/kirjai/blog-code-snippets/tree/master/testing-form-inputs
http://stackoverflow.com/questions/38365761/angular2-use-ngmodel-with-ngmodeloptions-standalone-true-to-link-to-a
https://github.com/angular/angular/blob/master/packages/forms/test/template_integration_spec.ts#L14
https://github.com/mgechev/angular-seed/issues/1881
http://stackoverflow.com/questions/39582707/updating-input-html-field-from-within-an-angular-2-test
http://stackoverflow.com/questions/37352337/angular2-component-testing-form-input-value-change
http://stackoverflow.com/questions/39793405/how-to-change-value-of-a-select-box-in-angular2-unit-test
http://stackoverflow.com/questions/40915547/angular-2-jasmine-how-to-test-a-function-of-a-component/40916194
http://stackoverflow.com/questions/39015918/cant-resolve-all-parameters-for-router-in-angular-rc-5-w
https://developers.livechatinc.com/blog/testing-angular-2-apps-dependency-injection-and-components/
http://stackoverflow.com/questions/41496194/unit-testing-angular-2-authguard-spy-method-is-not-being-called
http://stackoverflow.com/questions/39623722/angular-2-final-release-router-unit-test
https://github.com/textbook/salary-stats/blob/8df142c9f3330889e2146f49ab47a097dea32402/src/app/table/table.component.spec.ts#L126
//http://stackoverflow.com/questions/41897444/angular2-testing-error-when-trying-to-use-angular-platform-browser-testing-br
//https://github.com/angular/angular/blob/master/packages/forms/test/template_integration_spec.ts#L14

*****https://plnkr.co/edit/9RQqbz4msxgagsipQDpl?p=preview

component change detection
https://juristr.com/blog/2016/04/angular2-change-detection/#but-what-if-i-always-want-to-get-notified

testing html components continued
http://plnkr.co/edit/08ppx8olCnTMpkPdW3eC?p=preview

jasmine spy cheatsheet
http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/

My Plunker/StackOverflow on integration testing
https://plnkr.co/edit/hSoXsdYvcLY3XXrFSYQl?p=preview

//http://stackoverflow.com/questions/38786995/avoid-angular2-to-systematically-submit-form-on-button-click
  
//http://plnkr.co/edit/FrVMMaLc0NQkArGUC8yb?p=preview

doCheck plunker
https://plnkr.co/edit/hCKn9V1L8rzDPYzGc5HW?p=info
http://plnkr.co/edit/pvOQZs0xJOxrMJe2whn1?p=preview
** only checks basic json - not nested

roles
https://gist.github.com/btroncone/cebec10b89540f5501dd

event plunker
http://embed.plnkr.co/rXSepV1PpxaHNfBdwUEW/

  public onTreeClicked(){
     this.eventService.emitMessageEvent(this.eventService.eventNames.EVENT_TREE,{cost: 3, label: "beans"});
  }

    onEventHandler(item: any) {
    console.log("RiverComponent onEventHandler item: ", item);
    if (item.name === "EVENT_TREE") {
        this.item = "$" + item.data.cost + ":00";
        this.message = item.data.label;
    }
 
  }

  mediator (pub/sub master)
  https://addyosmani.com/largescalejavascript/#facadepattern

  testing child components
  //https://github.com/Aik-Master/ComponentInputTest
  //https://medium.com/@AikoPath/testing-angular-components-with-input-3bd6c07cfaf6
  //https://yakovfain.com/2016/04/19/angular-2-exposing-child-components-api/
  //https://github.com/Aik-Master/ComponentInputTest
//https://medium.com/@AikoPath/testing-angular-components-with-input-3bd6c07cfaf6
