import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { PaymentLinkService } from 'src/app/shared/services/paymentlink.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-paymentlink',
  templateUrl: './list-paymentlink.component.html'
})

export class ListPaymentLinkComponent implements OnInit {

  constructor(
    public app: GlobalApp, public PaymentLinkService: PaymentLinkService, private notifier: NotifierService
  ) {

  }
  baseURL: any = location.origin
  PaymentLinkFilter: any = {
    title: "",
  };
  paymentlinks: any[] = [];
  PaymentLinkPermissions: any[] = [];

  ngOnInit(): void {
    this.SearchPaymentLinks();
  }
  ChangeStatus(id: any, status: any) {
    const index = this.paymentlinks.indexOf(id);
    this.paymentlinks.splice(index, 1);
    this.SearchPaymentLinks()
  }

  SearchPaymentLinks() {
    this.PaymentLinkService.PaymentLinkGetAll(this.PaymentLinkFilter).subscribe((response: any) => {
      if (response != null && response.errorKey == '' && response.response != null && response.response.length > 0) {
        this.paymentlinks = response.response;
      }
      else {
        this.paymentlinks.length = 0;
        this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
      }
    });
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
        this.PaymentLinkService.PaymentLinkDelete(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.paymentlinks.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.paymentlinks = filteredItems;
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

  ResetSearch() {
    this.PaymentLinkFilter = {
      paymentlinkType: "",
      name: "",
      mobile: "",
      inactive: "",
      email: ""
    };
    this.SearchPaymentLinks()
  }

}


