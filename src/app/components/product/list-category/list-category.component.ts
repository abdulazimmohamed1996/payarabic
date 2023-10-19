import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html'
})

export class ListCategoryComponent implements OnInit {

  constructor(
    public app: GlobalApp, public CategoryService: ProductService, private notifier: NotifierService
  ) {

  }
  isShown: boolean = false;
  navigateTitle: string = '';
  currentRoute: string = '';
  logo: any = "";
  selectedCategory: number = 0;
  navigateURL: string = "category"
  pageTitle: string = '';
  requestedCategoryType: string = '';
  categories: any[] = [];
  CategoryPermissions: any[] = [];
  depositFilter: {}

  ngOnInit(): void {
    this.SearchCategories();
  }
  SearchCategories() {
    this.CategoryService.CategoryGetAll(this.depositFilter).subscribe((response: any) => {
      console.log(response);
      if (response != null && response.isValid && response.response != null && response.response.length > 0) {
        this.categories = response.response;
      }
      else {
        this.categories = [];
        this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
      }
    });
  }
  ChangeStatus(id: any, status: any) {
    const index = this.categories.indexOf(id);
    this.categories.splice(index, 1);
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
        this.CategoryService.CategoryDelete(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.categories.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.categories = filteredItems;
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

  }

}


