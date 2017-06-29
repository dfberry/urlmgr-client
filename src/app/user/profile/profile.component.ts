import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { User } from '../index';
import { ClientAuthenticationService, UserEvent } from '../services';
import { Broadcaster } from '../../services';
import { Configuration } from '../config';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html' 
})
export class ProfileComponent {

    @Input() user: User;
    @Input() serverError: string; // returned from server - for registration process

    emailError: Boolean=false;

    formModel: FormGroup;

    constructor(
        private clientAuthService: ClientAuthenticationService,
        private router: Router,
        private userEvent: UserEvent, /* for state events */  
        private broadcaster: Broadcaster 
    ){

        console.log(this.user);

        this.formModel = new FormGroup({
            'lastName': new FormControl('', [/* no validators */]),
            'firstName': new FormControl('', [/* no validators */])
        });
    }

    ngOnInit() {  
        console.log("ngOnInit");

        this.clientAuthService.getCurrentUser().subscribe(user => {
            console.log("profile user  " + JSON.stringify(user));
            this.user = user;

            this.formModel.setValue({
                lastName: this.user.lastName,
                firstName: this.user.firstName
            });

        });  
     }
    save() {
        console.log("########################################save profile called#############################################");
        console.log(this.formModel.value);        
        this.userEvent.fire('USER_PROFILE_SAVE_REQUESTED',this.formModel.value);
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
}