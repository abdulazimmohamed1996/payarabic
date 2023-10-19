import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { NotifierService } from 'angular-notifier';
import {  Router } from '@angular/router';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-batch',
  templateUrl: './invoice-batch.component.html'
})
export class InvoiceBatchComponent implements OnInit {
  submitted = false;
  invoice: any =
    {
       //id: 0,
      // vendorId: '2',//this.app.UserId(),
      // code: '',
      // refNumber: '',
      // key: '',
      // type: 'Invoice',
      // status: 'Unpaid',
      // orderStatus: '',
      // amount: 0,
      // sendType: 'SMS',
      // lang: 'En',
      //customerName: '',
      // customerMobile: '',
      // customerEmail: '',
      // currencyCode: 'KWD',
      // discountType: '',
      // discountAmount: 0,
      // discountAmountTotal: 0,
      // subtotal: 0,
      // total: 0,
      // //expiryDateUI: '',
      // expiryDate: '',
      // //transactions: [],
      // attachments: [],
      // remindAfter: 0,
      // termsConditionEnabled: true,
      // termsCondition: '',
      // comment: '',
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
    // sendinvoices: any =
    // {
    //   invoices: [this.invoice]
    // }
    //sendinvoices: any =[this.invoice];
    // {
    //   invoices: [this.invoice]
    // }
    constructor(public app: GlobalApp, private api: InvoiceService, private notifier: NotifierService,
      private router: Router) {
       
  }
  
  ngOnInit(): void {
    }
  
    onFileChange(event: any) {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
       // Swal.fire('Oops...', 'Cannot use multiple files', 'error')
        
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  
        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        var data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
  
        this.invoices.invoices = data;
        if(data.length == 0) {
          // Swal.fire({
          //   text: this.app.GetTranslation('NoDataFound'),
          //   icon: 'warning'
            
          // });
        }
      };
      
   }
    SaveForm(form: any) {
      this.submitted = true;
      if(this.invoices.invoices[0].customerName != undefined)  
      {
        Swal.fire({
          title: this.app.GetTranslation('AreYouSure'),
          text: this.app.GetTranslation('BatchInvoiceConfirm'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: this.app.GetTranslation('Yes'),
          cancelButtonText: this.app.GetTranslation('No'),
        }).then((result) => {
          if (result.value) {
            //assgin defaults for object
            this.invoices.invoices.forEach((inv:any, index:any) => {
              console.log
              //validate mobile
              if(inv.customerMobile != '') {
                if(inv.customerMobile.length == 8) 
                inv.customerMobile = '+965'+inv.customerMobile;
              }
            });
            this.api.Insert(this.invoices).subscribe((response: any) => {
              if(response.isValid)
              {
                this.notifier.notify("success", this.app.GetTranslation('Successfully'));
                setTimeout(() => {
                  this.router.navigate(["/invoice/list"]);
                }, 1000);

               
              }
              else
              {
                this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
              }
            
            })
            
            }
            }
            )}
            else
            {
              this.notifier.notify("error", "Please choose imported file first!!!");

            }
            
          
        

    }

}
