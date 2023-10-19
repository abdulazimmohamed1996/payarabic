import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentLinkService } from 'src/app/shared/services/paymentlink.service';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-edit-paymentlink',
  templateUrl: './edit-paymentlink.component.html'
})
export class EditPaymentLinkComponent implements OnInit {
  submitted: boolean = false
  id: number = 0
  lang: string;
  categoryLst: any = [];
  active: any;
  model: any =
    {
      key: 0,
      title: '',
      amount: 0,
      currency:'KWD',
      lang:'',
      inActive: false,
      isOpenAmount: '0',
      minAmount: 0,
      maxAmount: 0,
      termsConditionEnabled: false,
      comment: '',
      terms_Condition:''
    }
  constructor(private paymentlinkService: PaymentLinkService, private router: Router, private activatedRoute: ActivatedRoute 
    , public app: GlobalApp, private notifier: NotifierService) {
    this.activatedRoute.params.subscribe(params => {
      if (parseInt(params['id']) > 0)
        this.id = params['id'];
      else
        this.id = 0
    });
  }

  ngOnInit(): void {
    this.LoadPageData()
  }
 
  LoadPageData() {
    if (this.id > 0) {
      this.paymentlinkService.PaymentLinkGetById(this.id).subscribe((arg: any) => {
        this.model = arg.response;
        console.log(this.model)
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
      //this.onSubmit()
      return true;
    }
  }
  fileChangeEvent(fileInput: any) {
    var fileResult: string[] = this.app.CheckFile(fileInput);
    if (fileResult.length < 0 || fileResult[0] == 'false') {
      this.notifier.notify("error", "Invalid Attachment");

    }
    else {
      const newAttach = {
        id: 0,//this.invoice.attachments.length + 1,
        entityId: this.model.id,
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

      this.model.attachments.push(newAttach);

    }
  }
  onSubmit() {
    if (this.model.id > 0) {
      this.paymentlinkService.PaymentLinkUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/paymentlink/list"]);
          }, 2000);
        }
      });
    }
    else if (this.model.id == 0) {
      console.log('7')
      this.paymentlinkService.PaymentLinkInsert(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        }
        else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/paymentlink/list"]);
          }, 4000);
        }
      });

    }

    return true
  }
}