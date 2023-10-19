import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { GlobalApp } from 'src/app/shared/helper/global';
import { DepositService } from 'src/app/shared/services/deposit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-deposit-manage',
  templateUrl: './deposit-manage.component.html',
})
export class DepositManageComponent implements OnInit {
  //@ViewChild('myModal') myModal:any;
  attachlink = '';
  cntrlDisabled: boolean = false;

  depositFilter: any = {
    list: "24Hours",
    code: "",
    number: "",
    status: "",
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    vendorName: "",
    invoiceCode: "",
    invoiceKey: "",
    invoiceRefNumber: "",

  };

  item: any =
    {
      id: 0,
      name: '',
      amount: 0,
      quantity: 0,
    }
  items: any = [this.item];
  invoiceDetails: any =
    {
      // id: 0,
      // vendor_Id: this.app.UserId(),
      // code: '',
      // status: 'Unpaid',
      // amount: 0,
      // sendType: '',
      // lang: '',
      // customer_Name: '',
      // customer_Mobile: '',
      // customer_Email: '',
      // currency_Code: 'KWD',
      // discount_Type: '',
      // discount_Amount: 0,
      // discount_Amount_Total: 0,
      // sub_Total: 0,
      // //expiry_Date_UI:new Date() ,
      // expiry_Date: '',
      // items: this.items,

      // attachment: '',
      // remind_After: 0,
      // terms_Condition: '',
      // comment: ''

    }
  vendorsLst: any[] = [];
  invoices: any[] = [];
  dataModel: any = {
    id: 0,
    amount: 0,
    number: '',
    code: '',
    document: '',
    currency_Code: 'KWD',
    status: 'Started',
    note: '',
    date: '',
    vendors: [],
    type: 'normal'
  }
  divdepositsearch: any;
  divdeposit: any;
  constructor(private api: DepositService, public app: GlobalApp,
    private activatedRoute: ActivatedRoute,
    private router: Router, private notifier: NotifierService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.dataModel.attachments = [];
    this.divdeposit = document.getElementById('divdeposit');
    this.divdepositsearch = document.getElementById('divdepositsearch');
    this.activatedRoute.params.subscribe(params => {
      if (params !== undefined && params !== null && parseInt(params['id']) > 0) {
        this.dataModel.id = params['id'];

        this.divdeposit.classList.remove('col-xl-10');
        this.divdepositsearch.style.display = 'none';
        this.GetDepositsById();
      }
      else {
        this.SearchDeposits();
        this.divdepositsearch.style.display = 'block';
      }
    });





  }
  SelectInvoiceDetails(modal: any, invoiceId: any) {
    this.modalService.open(modal, { size: 'lg' });
    if (parseInt(invoiceId) > 0) {
      this.api.getinvoicebyid(invoiceId).subscribe((arg: any) => {
        this.invoiceDetails = arg.response;
        this.invoiceDetails.expiry_Date = new Date(this.invoiceDetails.expiry_Date);
      })
    }
  }
  GetDepositsById() {

    this.api.getbyid(this.dataModel.id).subscribe((response: any) => {
      if (response != null && response.isValid && response.response.vendors != null && response.response.vendors.length > 0) {
        this.vendorsLst = response.response.vendors;
        this.dataModel = response.response;
        console.log(this.dataModel);
        this.dataModel.date = this.app.GetDateForCalnder(this.dataModel.date);
        if (this.dataModel.attachments != null && this.dataModel.attachments.length > 0) {
          this.attachlink = this.dataModel.attachments[0].name;
        }
        if (this.dataModel.status == 'Completed') {
          this.cntrlDisabled = true;
        }
        this.CheckAllVendor();
        this.CalculateTotal();
      }
      else {
        this.vendorsLst = [];

      }
    });
  }
  SearchDeposits() {

    this.api.GetVendorInvoicesReadyForDeposit(this.depositFilter).subscribe((response: any) => {
      if (response != null && response.isValid && response.response != null && response.response.length > 0) {
        this.vendorsLst = response.response;
        this.CheckAllVendor();
        this.CalculateTotal();
      }
      else {
        this.vendorsLst = [];

      }
    });
  }

  CheckAllVendor() {
    this.vendorsLst.forEach(function (vendor: any, index) {
      vendor.checked = true;
      vendor.invoices.forEach(function (invoice: any, invoiceindex: any) {
        invoice.checked = true;
      });
    })
  }

  ParentVendorchecked(vendorId: any) {
    this.vendorsLst.filter(
      x => x.vendorId === vendorId).forEach(function (vendor: any, index) {
        vendor.invoices.forEach(function (invoice: any, invoiceindex: any) {
          invoice.checked = vendor.checked;
        });
      })
    this.CalculateTotal();
  }
  CalculateTotal() {
    var totalAmount = 0;

    this.dataModel.amount = 0;


    this.vendorsLst.forEach(function (vendor: any, index) {
      var DepositInvoiceIds: number[] = [];
      vendor.DepositInvoiceIds = [];
      vendor.invoiceTotal = 0;
      vendor.invoices.forEach(function (invoice: any, invoiceindex: any) {
        if (invoice.checked) {
          DepositInvoiceIds.push(invoice.id);
          vendor.invoiceTotal += parseFloat(invoice.amount);
        }
      });
      vendor.DepositInvoiceIds = DepositInvoiceIds;
      totalAmount += vendor.invoiceTotal;
    })
    this.dataModel.amount = totalAmount;
  }
  ConfirmSubmit() {
    let is_confirmed = true
    if (this.dataModel.amount > 0) {
      // if (this.dataModel.status !== 'Started') {
      var msg = 'ConfirmDeposit';
      if (this.dataModel.id > 0)
        msg = 'ConfirmUpdateDeposit';
      Swal.fire({
        title: this.app.GetTranslation('AreYouSure'),
        text: this.app.GetTranslation(msg),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.app.GetTranslation('Yes'),
        cancelButtonText: this.app.GetTranslation('No'),
      }).then((result) => {
        if (result.value) {
          this.onSubmit();
        }
        else {
        }
      })

    }
    else {
      this.notifier.notify("error", "Please choose invoices first!!!");

    }
  }
  onSubmit() {

    if (this.dataModel.id == 0) {
      this.dataModel.vendors = this.vendorsLst
      this.api.Insert(this.dataModel).subscribe((response: any) => {
        if (response.isValid) {
          this.ConfirmAdding();
          this.router.navigate(["/deposit/list"]);
        }
        else {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        }
      });
    } else {
      this.dataModel.date = this.app.GetDateForSave(this.dataModel.date);
      this.api.Update(this.dataModel).subscribe((response: any) => {
        if (response.isValid) {
          this.ConfirmAdding();
          this.router.navigate(["/deposit/list"]);
        }
        else {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        }
      });
    }


  }
  ConfirmAdding() {
    Swal.fire({
      text: this.app.GetTranslation('SavedSuccessfully'),
      icon: 'success',
      confirmButtonText: this.app.GetTranslation('Ok')
    });
  }
  fileChangeEvent(fileInput: any) {
    var fileResult: string[] = this.app.CheckFile(fileInput);
    if (fileResult.length < 0 || fileResult[0] == 'false') {
      this.notifier.notify("error", "Invalid Attachment");

    }
    else {
      const newAttach = {
        id: 0,//this.invoice.attachments.length + 1,
        entityId: this.dataModel.id,
        EntityFieldName: 'Deposit',
        name: fileInput.target.files[0].name,
        displayName: fileInput.target.files[0].name,
        attachment: '',
      };
      var reader = new FileReader();
      reader.onload = (e: any) => {
        newAttach.attachment = e.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      this.dataModel.attachments.push(newAttach);

    }
  }
}

