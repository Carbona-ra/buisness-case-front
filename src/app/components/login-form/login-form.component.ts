import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';


export interface LoginFormContent {
  username: string,
  password: string,
  stayConnected: boolean
}



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})


export class LoginFormComponent implements OnInit{
 
  form: FormGroup

  @Input({required: false})
  errMsg?: string  
  
  @Output()
  formSubmitted: EventEmitter<LoginFormContent> = new EventEmitter<LoginFormContent>()


  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('admin@example.com', [
          Validators.required,
          Validators.minLength(3)
        ]),
      password: new FormControl('1234admin', [
          Validators.required, 
          Validators.minLength(8)
        ]),
      stayConnected: new FormControl(false)
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid){
      const {username, password, stayConnected} = this.form.value 
      this.formSubmitted.emit({username, password, stayConnected})
    }
  }
}
