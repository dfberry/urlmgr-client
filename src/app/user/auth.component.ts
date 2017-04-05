import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'user-auth',
    template: ` 
<div  style="background-color:#ff00ff">
    <div class="row">
        <div class="col-xs-11 col-sm-6">
            <div class="row">
                <div class="col-xs-3 col-sm-4">
                    <login></login>
                </div>
                <div class="col-xs-1 col-sm-4">
                    &nbsp;
                </div>
                <div class="col-xs-3 col-sm-4">
                   <register></register>
                </div>
                <div class="col-xs-1 col-sm-4">
                    &nbsp;
                </div>
                <div class="col-xs-3 col-sm-4">
                   <profile></profile>
                </div>            
              </div>
        </div>
</div>
`
})
export class AuthenticationComponent {

    constructor(private http: Http){}
    ngOnInit() { }
}