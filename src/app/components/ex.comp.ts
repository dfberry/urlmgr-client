import { Component }   from '@angular/core';
/***
 * Example - only used to hook up Karma/Jasmine
 * 
 * 
 */
@Component({
  selector: 'exComp',
  template: '<h1>{{title}}</h1>'
})
export class ExComponent {
  title = 'Test Tour of Heroes';
}