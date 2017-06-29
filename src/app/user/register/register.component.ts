import { Component, ViewChild, AfterViewChecked, KeyValueDiffers, DoCheck, Input} from '@angular/core';
import { AbstractControl, NgForm, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ClientAuthenticationService, UserEvent } from '../services';
import { User } from "../";
import { Configuration } from '../config';
import { Broadcaster } from '../../services';


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent   {

    @Input() serverError: string; // returned from server - for registration process

    emailError: Boolean=false;
    passwordError: Boolean=false;

    formModel: FormGroup; 

    constructor(
        //public authHttpService: ServerAuthenticationService /* for server auth */,
        private router: Router,
        private userEvent: UserEvent, /* for state events */  
        private broadcaster: Broadcaster 
    ){
        console.log("registerComponent ctor");

        this.formModel = new FormGroup({
            'email': new FormControl('', [ 
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) ]), 
            'password': new FormControl('', [
                Validators.required, 
                Validators.minLength(4)])
        });
    }
    validateEmail() {
        if (this.formModel.controls['email'].dirty) console.log("email is dirty");
        if (this.formModel.controls['email'].hasError('required')) console.log("email required error");
        if (this.formModel.controls['email'].hasError('pattern')) console.log("email pattern error");

        console.log(this.formModel.controls['email'].errors);

        if (this.formModel.controls['email'].hasError('pattern') ||
            this.formModel.controls['email'].hasError('required')){
            
            this.emailError=true;
        } else {
            this.emailError=false;
        }
    }
    validatePassword() {
        if (this.formModel.controls['password'].dirty) console.log("password is dirty");
        if (this.formModel.controls['password'].hasError('required')) console.log("password required error");
        if (this.formModel.controls['password'].hasError('minlength')) console.log("password minLength error");

        console.log(this.formModel.controls['password'].errors);

        if (this.formModel.controls['password'].hasError('minlength') ||
            this.formModel.controls['password'].hasError('required')){
            
            this.passwordError=true;
        } else {
            this.passwordError=false;
        }
    }
    register() {
        console.log("########################################register called#############################################");
        console.log(this.formModel.value);        
        this.userEvent.fire('USER_REGISTRATION_REQUESTED',this.formModel.value);
    }
}