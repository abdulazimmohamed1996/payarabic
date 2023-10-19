import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-invoice-manage',
  templateUrl: './invoice-manage.component.html'
})
export class InvoiceManageComponent implements OnInit {
  SharedModule = new SharedModule;

  submitted = false;
  cntrlDisabled: boolean = false;
  customerMobilehasError: boolean = false;

  item: any =
    {
      name: '',
      amount: 0,
      quantity: 0,
    };
  comment_remainingText = 500;
  terms_remainingText = 500;
  todayDate: Date = new Date();
  items: any = [this.item];
  attachlink = '';
  invoice: any =
    {
      id: '0',
      vendorId: '2',//this.app.UserId(),
      code: '',
      refNumber: '',
      key: '',
      type: 'Invoice',
      status: 'Unpaid',
      orderStatus: '',
      amount: 0,
      sendType: 'SMS',
      lang: 'En',
      customerName: '',
      customerMobile: '',
      customerEmail: '',
      currencyCode: 'KWD',
      discountType: '',
      discountAmount: 0,
      discountAmountTotal: 0,
      subtotal: 0,
      total: 0,
      expiryDateUI: '',
      expiryDate: '',
      items: this.items,
      //transactions: [],
      attachments: [],
      remindAfter: 0,
      termsConditionEnabled: true,
      termsCondition: '',
      comment: '',
      //TransactionID: '',
      // PaymentGateway: '',
      //  PaymentGatewayCode: '',
      // deleted: false,
      //  qr: ""
    }
  invoices: any =
    {
      invoices: [this.invoice]
    }


  quickInvoice = false;
  constructor(public app: GlobalApp, private api: InvoiceService, private notifier: NotifierService,
    private router: Router, private activatedRoute: ActivatedRoute, private location: Location

  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params !== undefined && params !== null && parseInt(params['id']) > 0) {
        this.invoice.id = params['id'];
      }

    });
  }
  setQuickInvoice() {
    this.quickInvoice = true;
    this.invoice.items.length = 0;
  }
  ngOnInit(): void {
    if (this.app.UserType().toLowerCase() == "admin" || this.app.UserType().toLowerCase() == "superadmin"
      || this.app.UserType().toLowerCase() == "systemadmin" || this.invoice.status == 'Paid') {
      this.cntrlDisabled = true;
    }
    const currentUrl = this.location.path();
    const urlContainsquick = currentUrl.includes('quick');
    if (urlContainsquick) {
      this.setQuickInvoice();
    }
    if (this.invoice.id > 0) {
      this.api.getbyid(this.invoice.id).subscribe((arg: any) => {
        console.log(arg.response);
        this.invoice = arg.response;
        this.invoice.customerMobile = new SharedModule().removeCountryPhoneCode(this.invoice.customerMobile);
        this.invoice.expiryDateUI = this.app.GetDateForCalnder(this.invoice.expiryDate);
        if (this.invoice.items.length <= 0) {
          this.setQuickInvoice();
        }
        if (this.invoice.attachments != null && this.invoice.attachments.length > 0) {
          this.attachlink = this.invoice.attachments[0].name;
        }
        //   this.SetInvoiceTotal();
      })
    }
    else {
      const today = new Date();
      var formatdate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
      this.invoice.expiryDateUI = formatdate;


    }
  }
  AddNewRow() {
    const newDynamicItem = {
      id: this.invoice.items.length + 1,
      name: '',
      amount: 0,
      quantity: 0,
    };
    this.invoice.items.push(newDynamicItem)
  }
  SetInvoiceTotal() {
    let total: number = 0;
    //   
    this.invoice.items.forEach(function (x: any) {
      total += x.amount * x.quantity;
    });
    var discountAmountTotal = this.invoice.discountAmount;
    if (this.invoice.discountType == "Percent")
      discountAmountTotal = (total * this.invoice.discountAmount) / 100;
    this.invoice.subtotal = total;
    this.invoice.discountAmount = discountAmountTotal;
    this.invoice.amount = total - discountAmountTotal;

  }
  ConfirmDelete(id: any) {
    var filteredItems: any = [];
    this.invoice.items.forEach(function (row: any) {
      if (row.id != id) {
        filteredItems.push(row)
      }
    });
    this.invoice.items = filteredItems;
    this.SetInvoiceTotal();
  }
  text_valueChange(type = '', value = 0) {

    if (type == 'comment')
      this.comment_remainingText = 500 - value;
    else if (type == 'terms')
      this.terms_remainingText = 500 - value;

  }
  fileChangeEvent(fileInput: any) {
    var fileResult: string[] = this.app.CheckFile(fileInput);
    if (fileResult.length < 0 || fileResult[0] == 'false') {
      this.notifier.notify("error", "Invalid Attachment");

    }
    else {
      const newAttach = {
        id: 0,//this.invoice.attachments.length + 1,
        entityId: this.invoice.id,
        EntityFieldName: 'Invoice',
        name: fileInput.target.files[0].name,
        displayName: fileInput.target.files[0].name,
        attachment: '',
      };
      var reader = new FileReader();
      reader.onload = (e: any) => {
        newAttach.attachment = e.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      this.invoice.attachments.push(newAttach);

    }
  }
  SaveForm(form: any) {
    //debugger;
    this.submitted = true;
    if (this.invoice.customerMobile != '' ) {
      this.invoice.customerMobile = this.invoice.customerMobile.e164Number
    }

    if (!this.quickInvoice && this.invoice.amount <= 0) {
      this.notifier.notify("error", "Please add invoice items ");
      return false;
    }
    else if (this.quickInvoice && this.invoice.amount <= 0) {
      this.notifier.notify("error", "Please add invoice amount ");
      return false;
    }
    else if (form.invalid) {
      this.notifier.notify("error", "Please add required fields ");

      return false
    }
    else {

      if (this.invoice.id > 0) {
        this.api.Update(this.invoice).subscribe((response: any) => {
          if (response.isValid) {
            this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
            setTimeout(() => {
              this.router.navigate(["/invoice/list"]);
            }, 1000);
          }
          else {
            this.notifier.notify("error", response.errorKey);
          }
        });
      }
      else if (this.invoice.id == 0) {
        this.invoices.invoices[0].expiryDate = this.app.GetDateForSave(this.invoices.invoices[0].expiryDateUI);
        this.api.Insert(this.invoices).subscribe((response: any) => {
          if (response.isValid) {
            this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
            setTimeout(() => {
              this.router.navigate(["/invoice/list"]);
            }, 1000);
          }
          else {
            this.notifier.notify("error", response.errorKey);
          }
        });
      }
      return true;
    }
  }
  setOrderStatus(order_status: any) {
    // this.api.setOrderStatus(this.invoice.id,order_status).subscribe((arg: any) => {
    // });
  }
}
