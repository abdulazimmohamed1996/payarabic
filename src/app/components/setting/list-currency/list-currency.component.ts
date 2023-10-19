import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { SettingService } from 'src/app/shared/services/setting.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-currency',
  templateUrl: './list-currency.component.html'
})

export class ListCurrencyComponent implements OnInit {

  constructor(
    public app: GlobalApp, public SettingService: SettingService, private notifier: NotifierService
  ) {

  }
  isShown: boolean = false;
  navigateTitle: string = '';
  currentRoute: string = '';
  logo: any = "";
  selectedCurrency: number = 0;
  navigateURL: string = "currency"
  pageTitle: string = '';
  requestedCurrencyType: string = '';
  currencies: any[] = [];
  CurrencyPermissions: any[] = [];
  CurrencyFilter: any = {
    name: "",
  };

  ngOnInit(): void {
    this.SearchCurrencies();
  }
  SearchCurrencies() {
    console.log("start");
    this.SettingService.CurrencyGetAll(this.CurrencyFilter).subscribe((response: any) => {
      console.log(response);
      if (response != null && response.isValid && response.response != null && response.response.length > 0) {
        this.currencies = response.response;
      }
      else {
        this.currencies = [];
        this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
      }
    });
  }
  ChangeStatus(id: any, status: any) {
    const index = this.currencies.indexOf(id);
    this.currencies.splice(index, 1);
  }
  ConfirmDelete(id: any) {
    Swal.fire({
      title: this.app.GetTranslation('AreYouSure'),
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.app.GetTranslation('Yes'),
      cancelButtonText: this.app.GetTranslation('No'),
    }).then((result) => {
      if (result.value) {
        this.SettingService.CurrencyDelete(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.currencies.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.currencies = filteredItems;
            this.notifier.notify("success", this.app.GetTranslation('DeletedSuccessfully'));
          }
          else {
            this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.app.GetTranslation('Cancelled'),
          this.app.GetTranslation('NotDeleted'),
          'error',
        )
      }
    })
  }
}


