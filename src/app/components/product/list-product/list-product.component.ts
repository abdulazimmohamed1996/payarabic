import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { ProductService } from 'src/app/shared/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})

export class ListProductComponent implements OnInit {

  constructor(
    public app: GlobalApp, public ProductService: ProductService, private notifier: NotifierService
  ) {

  }
  isShown: boolean = false;
  navigateTitle: string = '';
  currentRoute: string = '';
  logo: any = "";
  lang: string;
  selectedProduct: number = 0;
  categoryLst: any = [];
  navigateURL: string = "product"
  pageTitle: string = '';
  requestedProductType: string = '';
  ProductFilter: any = {
    name: "",
    desc: "",
    categoryId: ""
  };
  products: any[] = [];
  ProductPermissions: any[] = [];

  ngOnInit(): void {
    this.SearchProducts();
    this.GetCategory()
  }
  GetCategory() {
    const catFilter = {
      name: "",
      inActive: false,
    };
    this.ProductService.CategoryGetAll(catFilter).subscribe((response: any) => {

      if (response && response.response && response.isValid) {
        this.categoryLst = response.response;
        console.log(this.categoryLst)
      }

    });
  }

  ChangeStatus(id: any, status: any) {

    // this.ProductService.ProductActivate(id, status).subscribe((response: any) => {
    // });
    const index = this.products.indexOf(id);
    this.products.splice(index, 1);
    this.SearchProducts()
  }
  SearchProducts() {
    if (this.ProductFilter.categoryId == "")
      this.ProductFilter.categoryId = "0"
    this.ProductService.ProductGetAll(this.ProductFilter).subscribe((response: any) => {
      if (response != null && response.errorKey == '' && response.response != null && response.response.length > 0) {
        this.products = response.response;
      }
      else {
        this.products.length = 0;
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
        this.ProductService.ProductDelete(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.products.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.products = filteredItems;
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
    this.ProductFilter = {
      productType: "",
      name: "",
      mobile: "",
      inactive: "",
      email: ""
    };
    this.SearchProducts()
  }

}


