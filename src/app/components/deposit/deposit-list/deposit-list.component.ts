import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DepositService } from 'src/app/shared/services/deposit.service';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
})
export class DepositListComponent implements OnInit {
  depositFilter: any = {
    code: "",
    number: "",
    status: ""
   
  };
  deposits: any[] = [];
  paymentmethods: any = [];
  
  constructor( private depositApi: DepositService)
  {}
    ngOnInit(): void {
      this.SearchDeposits();
    }
    SearchDeposits() {
      this.depositApi.GetAll(this.depositFilter).subscribe((response: any) => {
        console.log(response);
        if (response != null && response.isValid && response.response != null && response.response.length > 0) {
          this.deposits = response.response;
        }
        else {
          this.deposits  = [];
         
        }
      });
    }
  
}
