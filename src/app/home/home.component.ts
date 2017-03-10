import { Component, OnInit} from '@angular/core';
import { ConfigService } from '../config/config.service';


@Component({
    selector: 'home',
    template: ` 
     public home
    `
})
export class HomeComponent implements OnInit {

    constructor(private configService: ConfigService){}

    ngOnInit() {  
        let currentConfig = this.configService.getAll();
        console.log("currentConfig = " + JSON.stringify(currentConfig));
     }
}