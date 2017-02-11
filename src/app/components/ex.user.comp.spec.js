"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var ex_comp_1 = require('./ex.comp');
var comp;
var fixture;
var de;
var el;
describe('ExComponent without AutoDetect on', function () {
    beforeEach(function () {
        /*
        fixture = TestBed.configureTestingModule({
            declarations: [ BannerComponent ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })
        */
        testing_1.TestBed.configureTestingModule({
            declarations: [ex_comp_1.ExComponent],
        });
        fixture = testing_1.TestBed.createComponent(ex_comp_1.ExComponent);
        comp = fixture.componentInstance; // ExComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        el = de.nativeElement; //'Test Tour of Heroes'
    });
    it('should display original title', function () {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });
    it('should display a different test title', function () {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
    it('no title in the DOM until manually call `detectChanges`', function () {
        expect(el.textContent).toEqual('');
    });
});
//# sourceMappingURL=ex.user.comp.spec.js.map