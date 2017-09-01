import { Component } from '@angular/core';


/**************************************************************************
 * 
 * Show Dashboard
 * 
 * 
*/
@Component({
  selector: 'contact',
  template: `
      <h3>Dina Berry</h3>
      <h4>Programmer, Writer</h4>
      <h4><a href="mailto:dinaberry@outlook.com"><div analytics-on="click" analytics-event="Button email" analytics-category="Commands" id="email" class="fa fa-envelope-o">&nbsp;&nbsp;dinaberry@outlook.com</div></a></h4>
      <div class="social-icon-body"> 
          <a analytics-on="click" analytics-event="Button twitter" analytics-category="Commands" href="http://www.twitter.com/dfberry"><div id="twitter" class="fa fa-twitter social-icon fa-2x"></div></a>
          <a analytics-on="click" analytics-event="Button linkedIn" analytics-category="Commands" href="https://www.linkedin.com/pub/dina-berry/8/7a3/129"><div class="fa fa-linkedin-square social-icon fa-2x"></div></a>
          <a analytics-on="click" analytics-event="Button github" analytics-category="Commands" href="http://www.github.com/dfberry/"><div class="fa fa-github-alt social-icon fa-2x"></div></a>
          <a analytics-on="click" analytics-event="Button 31a" analytics-category="Commands" href="/blog"><div class="fa fa-rss social-icon fa-2x"></div></a>   
      </div>     
  `,
  styleUrls:[
    './contact.component.css'
  ]
})
export class ContactComponent {

}