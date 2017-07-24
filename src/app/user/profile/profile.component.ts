import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, 
    ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { User } from '../index';
import { ClientAuthenticationService, UserEvent } from '../services';
import { Broadcaster } from '../../services';
import { Configuration } from '../config';

@Component({
    selector: 'profile',
    templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit{

    @Input() user: User;
    @Input() serverError: string; // returned from server - for registration process

    emailError: Boolean=false;

    formModel: FormGroup;

    constructor(
        
        private clientAuthService: ClientAuthenticationService,
        private router: Router,
        private userEvent: UserEvent, 
        private broadcaster: Broadcaster 
    ){  
        this.formModel = new FormGroup({
            'lastName': new FormControl('', [/* no validators */]),
            'firstName': new FormControl('', [/* no validators */])
        });
        //this.logNameChange();
    }
    ngOnInit() {  

        this.setForm();
     }
    ngOnChanges(changes) {

        this.formModel.reset();

        if (changes['user']) {

            this.setForm();
        }
    }
    save() {       

        const formModel = this.formModel.value;

        if (formModel.firstName) this.user.firstName = formModel.firstName;
        if (formModel.lastName) this.user.lastName = formModel.lastName;

        this.userEvent.fire('USER_PROFILE_SAVE_REQUESTED',this.user);
    }
    /*
    validateEmail() {
        if (this.formModel.controls['email'].dirty) console.log("email is dirty");
        if (this.formModel.controls['email'].hasError('required')) console.log("email required error");
        if (this.formModel.controls['email'].hasError('pattern')) console.log("email pattern error");

        if (this.formModel.controls['email'].hasError('pattern') ||
            this.formModel.controls['email'].hasError('required')){
            
            this.emailError=true;
        } else {
            this.emailError=false;
        }
    }
    onBlur(key,value){

        let changes = false;

        switch(key){
            case "lastName":
                changes = !changes;
                this.user.lastName = value;
                break;
            case "firstName":
                changes = !changes;
                this.user.firstName = value;
                break;
            
        }
        if(changes)this.setForm();

    }
    nameChangeLog: string[] = [];
    logNameChange() {
        const nameControl   = this.formModel.get('lastName');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        );
    }     
*/
    setForm(){
        this.formModel.setValue({
            lastName: this.user.lastName,
            firstName: this.user.firstName
        });
    }
    clearForm(){
        this.formModel.reset({
            lastName: this.user.lastName,
            firstName: this.user.firstName
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