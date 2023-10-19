import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { NotifierService } from 'angular-notifier';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent implements OnInit {
  totalRecords: number;
  loading: boolean;
  isAdmin: boolean = false;
  invoiceFilter: any = {
    code: "",
    refNumber: "",
    status: "",
    amountFrom: '0',
    amountTo: '0',
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    createDateFrom: "",
    createDateTo: "",
    expiryDateFrom: "",
    expiryDateTo: "",
    //listOptions:null,
  };
  invoices: any[] = [];
  paymentmethods: any = []
  constructor(public app: GlobalApp, private api: InvoiceService, private notifier: NotifierService,) { }
  ngOnInit(): void {
    if (this.app.UserType().toLowerCase() == "admin" || this.app.UserType().toLowerCase() == "superadmin" || this.app.UserType().toLowerCase() == "systemadmin") {
      this.isAdmin = true;
    }
    //this.SearchInvoices();
  }
  SearchInvoices() {

  }
  LoadList(event: LazyLoadEvent) {
    //console.log(event);
    // this.loading = true;
    // event.first = 0
    // event.rows = 3 
    // event.sortField ='' ;
    // event.sortOrder = -1;


    //filters:{}
    //this.invoiceFilter.listOptions = event;
    //console.log(this.invoiceFilter);
    this.api.GetAll(this.invoiceFilter, event).subscribe((response: any) => {
      if (response != null && response.isValid && response.response != null && response.response.length > 0) {
        this.loading = false;
        this.invoices = response.response;
        this.totalRecords = response.response.length;
      }
      else {
        this.invoices = [];

      }
    });
    //  setTimeout(() => {
    //   if (this.datasource) {
    //       this.productList = this.datasource.slice(event.first, (event.first + event.rows));
    //       console.log(` sliced ${this.productList}`);
    //       this.loading = false;
    //    }
    //   }, 1000);

  }

}
