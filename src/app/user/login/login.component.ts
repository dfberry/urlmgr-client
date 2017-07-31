import { Component, ViewChild, AfterViewChecked, KeyValueDiffers, DoCheck, Input} from '@angular/core';
import { AbstractControl, NgForm, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ClientAuthenticationService, UserEvent } from '../services';
import { User } from "../";
import { Configuration } from '../config';
import { Broadcaster } from '../../services';


@Component({
    selector: 'login',
    templateUrl: './login.html'
})
export class LoginComponent   {

    @Input() user: User; //only needed for logout
    @Input() serverError: string; // returned from server - for registration process

    emailError: Boolean=false;
    passwordError: Boolean=false;

    formModel: FormGroup; 

    constructor(
        //public authHttpService: ServerAuthenticationService /* for server auth */,
        private userEvent: UserEvent, /* for state events */  
        private broadcaster: Broadcaster,
        private activatedRoute: ActivatedRoute 
    ){
        console.log("loginComponent ctor");
        console.log(this.user);
        console.log(this.serverError);

        // lotout
        if(activatedRoute && 
            activatedRoute.snapshot && 
            this.needToLogout(activatedRoute.snapshot)) {
                this.logout(this.user);
            }

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
    login() {
        this.serverError = "";
        this.userEvent.fire('USER_LOGON_REQUESTED',this.formModel.value);
    }
    logout(user) {
        if(user && user.id ){   
            console.log("logout requested and user found");
            this.userEvent.fire('USER_LOGOUT_REQUESTED',user);
        } else {
            throw Error("logout requested but user not found");
        }
    }
    needToLogout(snapshot){

        if(snapshot && 
            snapshot.data && 
            snapshot.data[0] && 
            snapshot.data[0]["logout"]) {
                console.log("logout requested");
                return true;
            }

        return false;
    }
}