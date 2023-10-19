import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingService } from 'src/app/shared/services/setting.service';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-edit-currency',
  templateUrl: './edit-currency.component.html'
})
export class EditCurrencyComponent implements OnInit {
  submitted: boolean = false
  id: number = 0
  lang: string;
  currencyLst: any = [];
  active: any;
  model: any =
    {
      id: 0,
      nameEn: '',
      nameAr: '',
      symboleEn: '',
      symboleAr: '',
      conversionRate: 0,
      decimalPlacement: 0,
    }
  constructor(public currencyService: SettingService, private router: Router, private activatedRoute: ActivatedRoute , public app: GlobalApp) {
    this.activatedRoute.params.subscribe(params => {
      if (parseInt(params['id']) > 0)
        this.id = params['id'];
      else
        this.id = 0
    });
  }

  ngOnInit(): void {
    this.LoadPageData()
    this.GetCurrency();
  }
  GetCurrency() {
    const catFilter = {
      name: "",
      inActive: false,
      //vendor_Id : this.app.UserId()
    };
    this.currencyService.CurrencyGetAll( catFilter).subscribe((response: any) => {
      if (response && response.response && response.isValid)
      {
        this.currencyLst = response.response;
        if(this.model.id == 0)
          this.model.currency_Id = this.currencyLst[0].id;
      }
        
    });
  }
  LoadPageData() {
    if (this.id > 0) {
      this.currencyService.CurrencyGetById(this.id).subscribe((arg: any) => {
        this.model = arg.response;
      })
    } else {
    }
  }


  SaveForm(form: any) {
    this.submitted = true;
    console.log(form.invalid);
    if (form.invalid) {
      console.log('Not Valid');
      return false
    }
    else {
      console.log('Valid');
      return true;
    }
  }
  fileChangeEvent(fileInput: any, field: any) {
    {
      var fileResult: string[] = this.app.SaveFile(fileInput, this.model, field,'image');
      if (fileResult.length < 0 || fileResult[0] == 'false') {
        // Swal.fire({
        //   html: this.translate.instant('AllowedImageExtension') + this.translate.instant('AllowedSize'),
        //   icon: 'error'
        // });
      }
    }

  }
  onSubmit() {
    if (this.model.id > 0) {
      this.currencyService.CurrencyUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          let errors: any = response.errorKey.split("\n")
          var error = ""
        } else {
          this.router.navigate(["/currency/list"]);
        }
      });
    }
    else if (this.model.id == 0) {
      console.log('7')
      this.currencyService.CurrencyInsert(this.model).subscribe((response: any) => {
        if (response.errorKey) {
        }
        else {
          this.router.navigate(["/currency/list"]);
        }
      });

    }

    return true
  }
}