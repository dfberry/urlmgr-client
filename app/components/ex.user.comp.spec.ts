import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ExComponent } from './ex.comp';
import { WelcomeComponent } from './ex.user.comp';

let comp: ExComponent;
let fixture: ComponentFixture<ExComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('ExComponent without AutoDetect on', () => {
    beforeEach(() => {

        /*
        fixture = TestBed.configureTestingModule({
            declarations: [ BannerComponent ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })
        */
        TestBed.configureTestingModule({
            declarations: [ExComponent], // declare the test component
        });

        fixture = TestBed.createComponent(ExComponent);

        comp = fixture.componentInstance; // ExComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement; //'Test Tour of Heroes'

    });
    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
    it('no title in the DOM until manually call `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });
});