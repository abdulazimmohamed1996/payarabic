import { Component, OnInit } from '@angular/core';
const DATA = [{
  id: "1",
  name: "Customer Permission",
  backend: "View",
  date: "	15/11/2022",
  team: "	15 Members",
  checked: "checked"
},
{
  id: "2",
  name: "Deposits",
  backend: "Edit",
  date: "		25/11/2022",
  team: "		12 Members",
  checked: ""
},
{
  id: "3",
  name: "Installment Plan Permission",
  backend: "Full",
  date: "5/12/2022",
  team: "	20 Members",
  checked: "checked"
},
{
  id: "4",
  name: "Settings",
  backend: "Full",
  date: "	14/12/2022",
  team: "	10 Members",
  checked: ""
},
{
  id: "5",
  name: "Invoices",
  backend: "View",
  date: "	4/12/2022",
  team: "	17 Members",
  checked: "checked"
},
]

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})

export class EditUserComponent implements OnInit {
  submitted = false;
  confirmPassword: string = '';
  model: userobj;
  productData = DATA
  constructor() {
    this.model = new userobj();
  }

  ngOnInit(): void {
  }
  click = (id: any) => {
    var data = this.productData.filter(x => {
      return x.id != id
    })
    this.productData = data
  }
  togglePassword(x: any, y: any) {
    x.type = x.type == 'password' ? 'text' : 'password';
    x.type == 'password' ? (y.className = 'fa fa-eye-slash password-show-i') : (y.className = 'fa fa-eye password-show-i')
  }
  SaveForm(form: any) {
    this.submitted = true;
    console.log(form.invalid);
    if (form.invalid) {
      console.log('Not Valid');
      return false
    }
    else {
      if (this.model.name!.length < 10) {
        form.get('name')?.setErrors({ incorrect: true, message: "Please enter a 10 digit value" });
      }
      if (this.model.company_Name!.length < 10) {
        form.get('company_Name')?.setErrors({ incorrect: true, message: "Please enter a 10 digit value" });
      }
      console.log('Valid');
      return true;
    }
  }
}
export class userobj {
  id?: number;
  userType?: number;
  smS_Id?: number;
  smS_Sender?: string;
  email_Id?: number;
  invoice_Valid_Days?: number;
  paymentMethods: [];
  name?: string;
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
  company_Name?: string;
  logo?: string;
  webSite_Url?: string;
  work_Email?: string;
  work_Phone?: string;
  invoice_Lang?: string;
  terms_Condition?: string;
  bank_Id?: string;
  Bank_name?: string;
  Bank_Name_Ar?: string;
  account_Holder_Name?: string;
  account_Number?: string;
  iban?: string;
  commercial_License?: string;
  signature_Authorization?: string;
  article_Association?: string;
  commercial_Register?: string;
  civil_Id_Owner?: string;
  civil_Id_Manager?: string;
  kyC_doc?: string;
  bank_Account_Letter?: string;
  other?: string;
  reviewed?: boolean;
  inActive?: boolean;
  Social_Links_Json?: string;
  account_Type?: string;
  sales_Referral_Code?: string;
  users: [];
}

