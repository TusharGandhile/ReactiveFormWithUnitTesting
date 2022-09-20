import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ReactiveForm';
    
  regForm!:FormGroup;
  loginForm!:FormGroup;
  data:any = [];
  myInputmsg:string = 'i am parent component';
  myOutput=""
  constructor(private fb:FormBuilder){}

  ngOnInit(){
this.loginForm = this.fb.group({
  email:new FormControl(),
  password:new FormControl()})

  this.regForm=this.fb.group({
      firstName:['',[Validators.required,Validators.maxLength(6),this.nospaceallowed]],
      lastName:['',[Validators.required,Validators.maxLength(6),this.nospaceallowed]],
      email:['',[Validators.required,Validators.email]],
      city:['',[Validators.required,Validators.minLength(6)]],
      state:['',[Validators.required,Validators.maxLength(6)]],
      zip:['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      password: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(8)])],
});
  }

getChildData(event:any){
console.log(event);
this.myOutput=event;

}

  get firstName() {
    return this.regForm.get('firstName') as FormControl;
  }
  
  get lastName() {
    return this.regForm.get('lastName') as FormControl;
  }
    SubmitForm(){
    // console.log(this.regForm);
  }

  nospaceallowed(control:FormControl){
    if(control.value != null && control.value.indexOf(' ')!=-1){
      return {nospaceallowed:true};
    }
    return null;
  }
 isValidNumber(control:FormControl){
if(control.value != null){
return 
}
 }
}
