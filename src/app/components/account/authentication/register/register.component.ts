import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalApp } from 'src/app/shared/helper/global';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'

})
export class RegisterComponent implements OnInit {
  SharedModule = new SharedModule
  mobileNumberGroup = new FormGroup({
    mobile: new FormControl(undefined, [Validators.required]),
  });
  validationError: any = {
    name: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    email: "",
    companyName: "",
    workPhone: "",
    accountType: "",
    recaptchaToken: ""
  }
  submitted = false;
  disabled = ""
  show_Success = false
  active: any;
  dataModel: any = {
    name: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    email: "",
    companyName: "",
    workPhone: "",
    recaptchaToken: "",
    accountType: "HomeBusiness"
  }
  constructor(private authservice: AuthService, private notifier: NotifierService, private router: Router, public app: GlobalApp) {
  }

  ngOnInit(): void {
  }

  clearErrorMessage() {
  }

  register(form: any) {

    this.submitted = true;
    console.log('form valid: ' + form.invalid);
    var valid = true
    if (this.dataModel.mobile == null) {
      this.validationError.mobile = 'Mobile Required';
      valid = false
    }
    if (this.dataModel.mobile) {
      if (this.dataModel.mobile.length < 8) {
        this.validationError.mobile = 'Invalid Mobile Number';
        valid = false
      } else
        this.dataModel.mobile = this.dataModel.mobile.e164Number
    }
    if (form.invalid || !valid) {
      console.log('Not Valid');
      return true
    }
    else {

      this.disabled = "btn-loading"
      console.log(this.dataModel)
      this.clearErrorMessage();
      if (this.validateForm()) {
        this.authservice.Register(this.dataModel).subscribe((response: any) => {
          if (response.errorKey) {
            this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
          } else {
            this.notifier.notify("success", this.app.GetTranslation('Registeration completed successfully, you will receive activation email to complete process.'));
            this.show_Success = true
          }
        })

      }
      return true
    }
  }

  validateForm() {
    console.log(this.dataModel.email)
    if (this.dataModel.email.length === 0) {
      this.notifier.notify("error", "please enter email id");
      return false;
    }

    return true;

  }
  //public registrationForm!: FormGroup;
  public error: any = '';

  // get form() {
  //   //return this.registrationForm.controls;
  // }
  Submit() {
    this.notifier.notify("success", "Notice! You have 4 notification");
    this.disabled = "btn-loading"
    this.validationError = {
      name: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      email: "",
      companyName: "",
      accountType: "",
      workPhone: "",
      recaptchaToken: ""
    }
    var valid = true

    if (this.dataModel.name == '') {
      this.validationError.name = "name required";
      valid = false
    }

    // if (this.registrationForm.controls['username'].value === "spruko@admin.com" && this.registrationForm.controls['password'].value === "sprukoadmin") {
    //   //this.router.navigate(['/dashboard/sales']);
    // }
    // else {
    //   this.error = "Please check email and passowrd"
    // }
  }
}
