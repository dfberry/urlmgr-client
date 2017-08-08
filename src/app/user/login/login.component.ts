import { Component, ViewChild, AfterViewChecked, KeyValueDiffers, DoCheck, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class LoginComponent  implements OnChanges {

    @Input() user: User; //only needed for logout
    @Input() serverError: string; // returned from server - for registration process

    emailError: Boolean=false;
    passwordError: Boolean=false;

    email: string='';
    password: string='';

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
    // when point from parent changes
    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {  
            let change = changes[propName];
            
            let curVal  = JSON.stringify(change.currentValue);
            let prevVal = JSON.stringify(change.previousValue);
            let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;
            
            if (propName === 'user') {
                console.log("change user email in ngOnChanges");

                // password is NEVER set from parent
            } 
        }
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
        console.log("login");
        console.log(this.formModel.value);

        const formModel = this.formModel.value;
        this.userEvent.fire('USER_LOGON_REQUESTED',formModel);
    }
    logout(user) {
        
        if(!user || user.id ){   
            console.log("logout requested, user isn't valid");
            console.log(user);
        } 
        console.log("logout requested and user found");
        
        // even though user isn't valid - send the event anyway.
        // when the server side error comes back - the client-side
        // code should still delete the user from local storage           
        // TBD: make sure there an a test to handle e2e for this

        this.userEvent.fire('USER_LOGOUT_REQUESTED',user);
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
    // is this only for testing? if yes, delete these next 4 functions
    setForm(){
        this.formModel.patchValue({
            email:    this.user.email
        });
    }
    clearForm(){
        this.formModel.reset({
            email: '',
            password: ''
        });
    }

    // used for tests
    setInput(newInput) {
      this.user = newInput;
    }
    getInput(){
      return this.user;
    }
}