import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalApp } from 'src/app/shared/helper/global';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  SharedModule = new SharedModule
  submitted = false;
  disabled = ""
  active: any;
  dataModel: any = {
    email: "",
    password: "",
    isMobile: false,
    recaptchaToken: ""
  }
  constructor(private authservice: AuthService, public app: GlobalApp, private router: Router,private notifier: NotifierService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (localStorage.getItem("remember_me") == "1" && localStorage.getItem("token") != null && localStorage.getItem("token") != "") {
      this.router.navigate(['/dashboard/sales'])
    } else {
      if (localStorage.getItem("token") != null && localStorage.getItem("token") != "") {
        this.authservice.Signoutapi().subscribe((response: any) => { })
      }
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  clearErrorMessage() {
  }
  get f() {
    return this.loginForm.controls;
  }
  validateForm(email: string, password: string) {

    if (email.length === 0) {
      console.log('email',email)
      this.notifier.notify("error", "Please enter email id");
      return false;
    }

    if (password.length === 0) {
      this.notifier.notify("error", "Please enter password");
      return false;
    }

    if (password.length < 6) {
      this.notifier.notify("error", "password should be at least 6 char");
      return false;
    }

    return true;

  }

  //angular
  public loginForm!: FormGroup;
  public error: any = '';

  get form() {
    return this.loginForm.controls;
  }

  Submit() {
    this.disabled = "btn-loading"
    this.submitted = true;
    this.clearErrorMessage();
    console.log(this.dataModel.email)
    console.log(this.dataModel.password)
    if (this.validateForm(this.dataModel.email, this.dataModel.password)) {

      this.dataModel.recaptchaToken = "";
      this.authservice.Login(this.dataModel).subscribe((response: any) => {
        console.log(response)
        if (response.isValid) {
          if (this.loginForm.value.userRemember)
            localStorage.setItem("remember_me", "1");
          else localStorage.setItem("remember_me", "");

          localStorage.setItem("token", response.response.token);
          localStorage.setItem("userInfo", JSON.stringify(response.response.user));
          this.authservice.GetUserPermissions(response.response.user.id).subscribe((permResponse: any) => {
            console.log(permResponse)
            if (permResponse.isValid) {
              localStorage.setItem("userPermissions", JSON.stringify(permResponse.response));
            }
          })
          this.notifier.notify("success", "Login successfully, you will be redirected to dashboard now");
          setTimeout( () => {
            this.router.navigate(['/dashboard/sales'])
          }, 2000);
        }
        else {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        }
      });

      this.disabled = ""
    }
    else
      this.disabled = ""
  }
}
