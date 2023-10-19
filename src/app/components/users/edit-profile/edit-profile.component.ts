import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  SharedModule = new SharedModule;
  id: number = 0
  submitted = false;
  showVendorTabs = false
  isProfile = false
  showPasswprd = false
  pageTitle: string = ''
  confirmPassword: string = '';
  redirectURL: string = '';
  currentUserType: string = '';
  paymentmethods: any[] = [];
  UserPermissions: any[] = [];
  attachments: any[] = [];
  social: any = {
    facebook_link: '',
    instagram_link: '',
    snapchat_link: '',
    twitter_link: '',
    youtube_link: '',
    linkedin_link: ''
  }
  Banks: any[] = [{ "id": "1", "name_En": "Bank 1" }, { "id": "3", "name_En": "Bank 3" }, { "id": "2", "name_En": "Bank 2" },];
  model: userobj;
  paymentMethods: any[]
  constructor(private userService: UserService, public app: GlobalApp, private notifier: NotifierService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.model = new userobj();
    this.activatedRoute.params.subscribe(params => {
      if (parseInt(params['id']) > 0)
        this.id = params['id'];
      else
        this.id = 0
    });
  }

  ngOnInit(): void {
    this.matcherUserTitle()
    this.LoadPageData()
  }

  matcherUserTitle() {
    var url = this.activatedRoute.snapshot.url
    console.log('url', url)
    if (url.length > 0) {
      const path = url[0].path;
      this.currentUserType = path
      this.pageTitle = this.app.GetTranslation('AddEdit') + " " + this.app.GetTranslation(this.currentUserType)
      if (path.startsWith('profile')) {
        this.pageTitle = this.app.GetTranslation('Profile')
        this.currentUserType = this.app.UserType()
        this.id = this.app.UserId()
        this.redirectURL = "/dashboard/sales"
        this.isProfile = true
        this.showPasswprd = true
      }
      if (path.startsWith('Vendor') || this.app.UserType().toLowerCase() == "vendor") {
        this.showVendorTabs = true
      }
      //console.log('path',url[1].path)
      if (url.length > 1 && url[1].path.toLowerCase().endsWith('create')) {
        this.showPasswprd = true
      }
    }
  }

  LoadPageData() {
    console.log('this.id', this.id)
    if (this.id > 0) {
      this.userService.SelectUserRecord(this.id).subscribe((arg: any) => {
        console.log('arg.response', arg.response)
        this.model = arg.response;
        this.paymentmethods = arg.response.paymentMethods
        this.UserPermissions = arg.response.userPermissions
        //this.model.mobile = new SharedModule().removeCountryPhoneCode(this.invoice.customerMobile);
        if (this.model.socialLinksJson != null && this.model.socialLinksJson != '' && this.model.socialLinksJson != 'null') {
          this.social = JSON.parse(this.model.socialLinksJson);
        }
      })
    } else {
      if (this.showVendorTabs) {
        this.SearchPaymentmethods()
        this.GetBankList()
      }
    }
  }


  SearchPaymentmethods() {
    this.userService.PaymentMethodsGetAll(this.id).subscribe((response: any) => {
      console.log(response);
      if (response != null && response.response.length > 0) {
        if (this.id == 0) {
          this.paymentmethods = response.response.filter((element: any) => {
            return element.type == 'PaymentMethod';
          })
          this.paymentmethods.forEach(function (part, index) { part.inActive = true; });

        }
        // this.sMS_Gateway_Arr = response.response.filter((element: any) => {
        //   return element.type == 'SMS';
        // })
        // this.email_Gateway_Arr = response.response.filter((element: any) => {
        //   return element.type == 'Email';
        // })
      }
      console.log(this.paymentmethods);
    });
  }

  GetBankList() {
    // this.api.GetBankList().subscribe((response: any) => {
    //   if (response != null && response.response.length > 0) {
    //     this.Banks = response.response;
    //   }
    // });
  }

  click = (id: any) => {
    var data = this.paymentMethods.filter(x => {
      return x.id != id
    })
    this.paymentMethods = data
  }
  togglePassword(x: any, y: any) {
    x.type = x.type == 'password' ? 'text' : 'password';
    x.type == 'password' ? (y.className = 'fa fa-eye-slash password-show-i') : (y.className = 'fa fa-eye password-show-i')
  }
  downloadFile(x: any, y: any) {

  }
  SaveForm(form: any) {
    this.submitted = true;
    console.log(form.invalid);
    if (form.invalid) {
      console.log('Not Valid');
      return false
    }
    else {
      // if (this.model.name!.length < 10) {
      //   form.get('name')?.setErrors({ incorrect: true, message: "Please enter a 10 digit value" });
      // }
      // if (this.model.companyName!.length < 10) {
      //   form.get('companyName')?.setErrors({ incorrect: true, message: "Please enter a 10 digit value" });
      // }
      console.log('Valid');
      return true;
    }
  }
  fileChangeEvent(fileInput: any, field: any) {
    var fileResult: string[] = this.app.CheckFile(fileInput);
    if (fileResult.length < 0 || fileResult[0] == 'false') {
      this.notifier.notify("error", "Invalid Attachment");

    }
    else {
      const newAttach = {
        id: this.getFileId(field),//this.invoice.attachments.length + 1,
        entityId: this.model.id,
        EntityFieldName: field,
        name: fileInput.target.files[0].name,
        displayName: fileInput.target.files[0].name,
        attachment: '',
      };
      var reader = new FileReader();
      reader.onload = (e: any) => {
        newAttach.attachment = e.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      this.attachments.push(newAttach);

    }
  }
  getFileId(fieldName: any) {
    var fileId = 0
    let retArr = this.model.attachments.filter((element: any) => {
      return element.entityFieldName == fieldName;
    })
    console.log('retArr', retArr)
    if (retArr.length > 0)
      fileId = retArr[0].id
    return fileId
  }
  filterArrayLink(array: any, fieldName: any) {
    console.log('filterArray')
    var linkURL = ""
    let retArr = array.filter((element: any) => {
      return element.entityFieldName == fieldName;
    })
    console.log('retArr', retArr)
    if (retArr.length > 0)
      linkURL = retArr[0].name
    return linkURL
  }

  filterArray(array: any, fieldName: any) {
    console.log('filterArray')
    let retArr = array.filter((element: any) => {
      return element.entityFieldName == fieldName;
    })
    console.log('retArr', retArr)
    if (retArr.length > 0)
      return true
    else
      return false
  }

  onSubmit() {

    //this.sharedModule.clearHTMLControlErrors()
    var errorMsg = '';
    var valid = true
    var errorMessage = ''
    console.log(this.model)

    if (this.model.email) {
      const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regularExpression.test(String(this.model.email).toLowerCase())) {
        console.log('3')
        this.notifier.notify("error", this.app.GetTranslation("InvalidEmailAddress"));
        return false
      }
    }

    //
    if (this.model.mobile) {
      this.model.mobile = this.model.mobile.e164Number;
    }
    if (this.model.accountType == 'Business' && (!this.model.companyName || this.model.companyName == '')) {
      console.log('4')
      this.notifier.notify("error", this.app.GetTranslation("CompanyNameRequired"));
      // //this.sharedModule.showHTMLControlError("company_Name",this.GetTranslation('CompanyNameRequired'))   
      return false
    }


    this.model.attachments = this.attachments
    if (this.model.id === 0 || (this.model.id > 0 && this.isProfile)) {

      // if (!this.confirmPassword || this.confirmPassword.length < 8) {
      //   this.notifier.notify("error", this.app.GetTranslation("ConfirmRequired"));
      //   //this.sharedModule.showHTMLControlError("confirmPassword",this.GetTranslation('ConfirmRequired'))  
      //   console.log('5')
      //   return false
      // }
      if (this.confirmPassword && this.model.password && this.confirmPassword != this.model.password) {
        this.notifier.notify("error", this.app.GetTranslation("PasswordsMatched"));
        //this.sharedModule.showHTMLControlError("confirmPassword",this.GetTranslation('ConfirmRequired'))  
        console.log('5')
        return false
      }
      const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,})$/;
      // if (!regularExpression.test(this.model.password)) {        
      //   //this.sharedModule.showHTMLControlError("password",this.GetTranslation('PasswordFormatRequired'))          
      //   valid = false
      // }
    }
    else if (this.model.id > 0) {
      if (this.model.password) {
        const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,})$/;
        if (!regularExpression.test(this.model.password)) {
          //this.sharedModule.showHTMLControlError("password",this.GetTranslation('PasswordFormatRequired'))          
          valid = false
        }
      }
    }
    var inputs = document.querySelectorAll(" input[name='paymentIDs[]']");
    var paymentMethodsLst = []
    for (var i = 0; i < inputs.length; i++) {
      let inputElement = inputs[i] as HTMLInputElement;
      let paymentMethodId = inputElement.value;
      let active_chk = document.getElementById('inActive_' + paymentMethodId) as HTMLInputElement;
      if (active_chk.checked === true) {
        let fees_Type = document.getElementById('fees_Type_' + paymentMethodId) as HTMLInputElement;
        let feesFixed_Amount = document.getElementById('feesFixed_Amount_' + paymentMethodId) as HTMLInputElement;
        let feesPercent_Amount = document.getElementById('feesPercent_Amount_' + paymentMethodId) as HTMLInputElement;
        let paidBy = document.getElementById('paidBy_' + paymentMethodId) as HTMLInputElement;
        paymentMethodsLst.push({
          'inActive': false, 'feesType': fees_Type.value, 'feesFixed_Amount': feesFixed_Amount.value,
          'feesPercent_Amount': feesPercent_Amount.value, 'paidBy': paidBy.value,
          'id': paymentMethodId
        })
      }
    }
    var inputsPermissions = document.querySelectorAll(" input[name='permissionsIDs[]']");
    //var forms = document.getElementById('paymentIDs');
    var UserPermissionsLst = []
    for (var i = 0; i < inputsPermissions.length; i++) {
      let inputElement = inputsPermissions[i] as HTMLInputElement;
      let permissionId = inputElement.value;
      let active_chk = document.getElementById('inActive_' + permissionId) as HTMLInputElement;
      if (active_chk.checked === true) {
        let permission = document.getElementById('permission_' + permissionId) as HTMLInputElement;
        UserPermissionsLst.push({
          'InActive': false, 'Permission': permission.value,
          'Controller': permissionId
        })
      }
    }

    this.model.socialLinksJson = JSON.stringify(this.social);
    this.model.userType = this.currentUserType
    console.log('this.model.id', this.model.id)
    if (this.model.id > 0) {
      console.log('UserUpdate')
      if (!this.isProfile)
        this.model.password = ""
      this.userService.UserUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout(() => {
            if (this.redirectURL == "")
              this.router.navigate(["/" + this.currentUserType.toLowerCase() + "/list"]);
            else
              this.router.navigate([this.redirectURL]);
          }, 2000);
        }
      });


    }
    else if (this.model.id == 0) {
      this.userService.UserAdd(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout(() => {
            if (this.redirectURL == "")
              this.router.navigate(["/" + this.currentUserType.toLowerCase() + "/list"]);
            else
              this.router.navigate([this.redirectURL]);
          }, 2000);
        }
      });

    }

    return true
  }
}
export class paymentMethod {
  id: number = 0;
  nameEn?: string;
  nameAr?: string;
  code?: string;
  paymentMethodType?: string;
  feesType?: string;
  feesFixedAmount?: number;
  feesPercentAmount?: number;
  paidBy?: string;
  inActive?: boolean;
}
export class userobj {

  id: number = 0;
  smS_Id?: number;
  smS_Sender?: string;
  email_Id?: number;
  invoice_Valid_Days?: number;
  paymentMethods?: [paymentMethod];
  name?: string;
  username?: string;
  password?: string;
  mobile?: any;
  email?: string;
  companyName?: string;
  logo?: string;
  webSiteUrl?: string;
  workEmail?: string;
  workPhone?: string;
  invoice_Lang?: string;
  termsCondition?: string;
  bankId?: string;
  BankNameEn?: string;
  BankNameAr?: string;
  accountHolderName?: string;
  accountNumber?: string;
  iban?: string;
  commercialLicense?: string;
  signatureAuthorization?: string;
  articleAssociation?: string;
  commercialRegister?: string;
  civilIdOwner?: string;
  civilIdManager?: string;
  kyC_doc?: string;
  bankAccountLetter?: string;
  other?: string;
  reviewed?: boolean;
  inActive?: boolean;
  socialLinksJson?: string;
  accountType?: string = "HomeBusiness";
  userType?: string = "Vendor";
  salesReferralCode?: string;
  users: [];
  attachments: any[];
}
