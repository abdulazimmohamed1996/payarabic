import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {
  submitted: boolean = false
  id: number = 0
  lang: string;
  categoryLst: any = [];
  active: any;
  model: any =
    {
      id: 0,
      nameEn: '',
      nameAr: '', 
      sort: 0,
    }
  constructor(private categoryService: ProductService, private notifier: NotifierService, private router: Router, private activatedRoute: ActivatedRoute , public app: GlobalApp) {
    this.activatedRoute.params.subscribe(params => {
      if (parseInt(params['id']) > 0)
        this.id = params['id'];
      else
        this.id = 0
    });
  }

  ngOnInit(): void {
    this.LoadPageData()
    this.GetCategory();
  }
  GetCategory() {
    const catFilter = {
      name: "",
      inActive: false,
      //vendor_Id : this.app.UserId()
    };
    this.categoryService.CategoryGetAll( catFilter).subscribe((response: any) => {
      if (response && response.response && response.isValid)
      {
        this.categoryLst = response.response;
        if(this.model.id == 0)
          this.model.category_Id = this.categoryLst[0].id;
      }
        
    });
  }
  LoadPageData() {
    if (this.id > 0) {
      this.categoryService.CategoryGetById(this.id).subscribe((arg: any) => {
        this.model = arg.response;
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
      return true;
    }
  }
  fileChangeEvent(fileInput: any, field: any) {
    {
      var fileResult: string[] = this.app.SaveFile(fileInput, this.model, field,'image');
      if (fileResult.length < 0 || fileResult[0] == 'false') {
        // Swal.fire({
        //   html: this.translate.instant('AllowedImageExtension') + this.translate.instant('AllowedSize'),
        //   icon: 'error'
        // });
      }
    }

  }
  onSubmit() {
    if (this.model.id > 0) {
      this.categoryService.CategoryUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/category/list"]);
          }, 2000);
        }
      });
    }
    else if (this.model.id == 0) {
      console.log('7')
      this.categoryService.CategoryInsert(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/category/list"]);
          }, 2000);
        }
      });

    }

    return true
  }
}