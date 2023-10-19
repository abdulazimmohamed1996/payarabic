import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-productlink',
  templateUrl: './list-productlink.component.html'
})

export class ListProductLinkComponent implements OnInit {

  constructor(
    public app: GlobalApp, public ProductLinkService: ProductService,private notifier: NotifierService
  ) {

  }
  isShown: boolean = false;
  baseURL: any = location.origin
  navigateTitle: string = '';
  currentRoute: string = '';
  logo: any = "";
  lang: string;
  selectedProductLink: number = 0;
  categoryLst: any = [];
  navigateURL: string = "productlink"
  pageTitle: string = '';
  requestedProductLinkType: string = '';
  ProductLinkFilter: any = {
    name: "",
  };
  productlinks: any[] = [];
  ProductLinkPermissions: any[] = [];

  ngOnInit(): void {
    this.SearchProductLinks();
  }
  GetCategory() {
    const catFilter = {
      name: "",
      inActive: false,
    };
    this.ProductLinkService.CategoryGetAll(catFilter).subscribe((response: any) => {
      if (response && response.response && response.isValid) {
        this.categoryLst = response.response;
      }
      else
      {
        this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
      }
    });
  }

  ChangeStatus(id: any, status: any) {

    // this.ProductLinkService.ProductLinkActivate(id, status).subscribe((response: any) => {
    // });
    const index = this.productlinks.indexOf(id);
    this.productlinks.splice(index, 1);
    this.SearchProductLinks()
  }

  SearchProductLinks() {

    console.log(this.ProductLinkFilter);
    if (this.ProductLinkFilter.categoryId == "")
      this.ProductLinkFilter.categoryId = "0"
    this.ProductLinkService.ProductLinkGetAll(this.ProductLinkFilter).subscribe((response: any) => {
      console.log(response);
      console.log(response.isValid);
      console.log(response.response);
      if (response != null && response.errorKey == '' && response.response != null && response.response.length > 0) {
        this.productlinks = response.response;
      }
      else {
        this.productlinks.length = 0;
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
        this.ProductLinkService.ProductLinkDelete(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.productlinks.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.productlinks = filteredItems;
            this.notifier.notify("success", this.app.GetTranslation('DeletedSuccessfully'));
          }
          else
          {
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
    this.ProductLinkFilter = {
      productlinkType: "",
      name: "",
      mobile: "",
      inactive: "",
      email: ""
    };
    this.SearchProductLinks()
  }

}


