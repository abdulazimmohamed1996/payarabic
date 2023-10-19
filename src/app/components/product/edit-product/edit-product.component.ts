import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  submitted: boolean = false
  id: number = 0
  lang: string;
  categoryLst: any = [];
  active: any;
  model: any =
    {
      id: 0,
      categoryId: 0,
      Vendor_Id: 0,
      nameEn: '',
      nameAr: '',
      descEn: '',
      descAr: '',
      price: 0,
      installment_Price: 0,
      quantity: 0,
      inActive: true,
      attachments: [],
      stockable: false,
      Stockable_Show: false,
      image: ''
    }
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute 
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
    this.GetCategory();
  }
  GetCategory() {
    const catFilter = {
      name: "",
      inActive: false,
      //vendor_Id : this.app.UserId()
    };
    this.productService.CategoryGetAll( catFilter).subscribe((response: any) => {
      
      if (response && response.response && response.isValid)
      {
        this.categoryLst = response.response;
        console.log(this.categoryLst)
        if(this.model.id == 0)
          this.model.categoryId = this.categoryLst[0].id;
      }
        
    });
  }
  LoadPageData() {
    if (this.id > 0) {
      this.productService.ProductGetById(this.id).subscribe((arg: any) => {
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
      this.productService.ProductUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/product/list"]);
          }, 2000);
        }
      });
    }
    else if (this.model.id == 0) {
      console.log('7')
      this.productService.ProductInsert(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/product/list"]);
          }, 2000);
        }
      });

    }

    return true
  }
}