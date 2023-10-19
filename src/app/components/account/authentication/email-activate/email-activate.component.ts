import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-email-activate',
  templateUrl: './email-activate.component.html',
})
export class EmailActivateComponent implements OnInit {
  activationForm: any = FormGroup;
  submitted = false;
  activationKey: string = ''
  isLoading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public apiService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router

  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      if (params['code']) {
        this.activationKey = params['code']
      }
    });
  }

  GetTranslation(translateKey: any) {
    var translateTXT = ''
    this.translate.get(translateKey).subscribe((translatedString: any) => {
      translateTXT = translatedString
    });
    return translateTXT
  }

  ngOnInit(): void {
    this.activationForm = this.formBuilder.group({
      activationCode: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.activationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    if (this.activationForm.invalid) {
      this.isLoading = false;
      return;
    }
    console.log(this.activationKey+"#"+this.activationForm.value.activationCode)
    this.apiService.ActivateEmail( this.activationKey,this.activationForm.value.activationCode).subscribe((response: any) => {
      this.isLoading = false;
      if (response.isValid) {
        this.ConfirmAdding()
      }
      else {
        this.submitted = false;
        this.ErrorLogin(this.GetTranslation(response.errorKey))
      }


    });
  }
  ConfirmAdding() {
    Swal.fire({
      html: this.GetTranslation('ConfirmActivate'),
      icon: 'success',
      confirmButtonText: this.GetTranslation('Ok')
    }).then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
  ErrorLogin(msgTxt: any) {
    Swal.fire({
      html: msgTxt,
      icon: 'error',
      confirmButtonText: this.GetTranslation('Ok')
    });
  }
}
