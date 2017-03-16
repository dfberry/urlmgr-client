import { Component} from '@angular/core';
/**************************************************************************
 * 
 * Show Dashboard
 * 
 * 
*/
@Component({
  selector: 'dashboard',
  template: `
   <!--dashboard begin -->
   <url-mgr></url-mgr>
   <!--dashboard end -->
  `
})
export class DashboardComponent {
  constructor(){}
  ngOnInit(){
    console.log("dashboard component ngOnInit");

  }
}