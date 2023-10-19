import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalApp } from 'src/app/shared/helper/global';

@Component({
  selector: 'app-edit-productlink',
  templateUrl: './edit-productlink.component.html'
})
export class EditProductLinkComponent implements OnInit {
  submitted: boolean = false
  id: number = 0
  categoryLst: any = [];
  active: any;
  selectedToAdd: any;
  selectedToRemove: any;
  selectedItems: any = [];
  unSelectedItems: any = [];
  dataSource: any = [];
  align: string = 'right';
  lang: string = 'Ar';
  model: any =
    {
      key: 0,
      //createdBy: this.app.UserId(),
      nameEn: '',
      nameAr: '',
      termsCondition: '',
      inActive: false,
      active: true,
      termsConditionEnabled: false,
      products: []
    }
  constructor(private productlinkService: ProductService, private router: Router, private activatedRoute: ActivatedRoute 
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
    if (this.app.GetLang() == "en") {
      this.lang = 'En'
      this.align = 'left'
    }
  }
  filterArray(array: any, is_selected: any) {
    let retArr = array.filter((element: any) => {
      return element.productLinkId !== is_selected;
    })
    return retArr
  }

  assign(selectedVal: any, productLink: any) {
    selectedVal = selectedVal.replace(/\s/g, "");
    var splitted = selectedVal.split(":");

    for (let i = 0; i < this.dataSource.length; i++) {
      for (let j = 0; j < this.dataSource[i]['products'].length; j++) {
        if (this.dataSource[i]['products'][j]['id'] == splitted[1]) {
          this.dataSource[i]['products'][j]['productLinkId'] = productLink
        }
      }
    }
    this.selectedItems = this.dataSource.filter((element: any) => element.products.some((subElement: any) => subElement.productLinkId > 0));
    this.unSelectedItems = this.dataSource.filter((element: any) => element.products.some((subElement: any) => subElement.productLinkId == 0));
  }
  LoadPageData() {
    if (this.id == 0) {
      this.productlinkService.SelectProductLink(true).subscribe((arg: any) => {

        if (arg.response && arg.response.length > 0) {
          this.dataSource = arg.response;
          console.log('arg.response',arg.response)
          this.selectedItems = this.dataSource.filter((element: any) => element.products.some((subElement: any) => subElement.productLinkId > 0));
          this.unSelectedItems = this.dataSource.filter((element: any) => element.products.some((subElement: any) => subElement.productLinkId == 0));

        }                                                           
        else {
          this.dataSource.length = 0;
          // Swal.fire({
          //   text: this.translate.instant(arg.response.errorKey),
          //   icon: 'warning'
          // });
        }


      })
    }
    else {
      if (this.id > 0) {
        this.productlinkService.ProductLinkGetById(this.id).subscribe((arg: any) => {
          
          this.model = arg.response;
          this.model.active = !this.model.inActive;
          this.dataSource = this.model.categories
          this.selectedItems = this.model.categories.filter((element: any) => element.products.some((subElement: any) => subElement.productLinkId > 0));

//          var selected_ids: string = [];
          let selected_ids: Array<string>;
          selected_ids = [];

          var counter = 0;
          for (var i = 0; i < this.selectedItems.length; i++) {
            for (var j = 0; j < this.selectedItems[i].products.length; j++) {
              selected_ids[counter] = this.selectedItems[i].products[j].id;
              counter++;
            }            
          }
          
          this.unSelectedItems = this.model.categories.filter((element: any) => element.products.some((subElement: any) => (subElement.productLinkId == 0 && !selected_ids.includes(subElement.id)  )));
          
        })
      }
    }
    if (this.app.GetLang() == "en") {
      this.lang = 'En'
      this.align = 'left'
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
     // this.saveObject()
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
  onSubmit()
  {
    
    //let products_lst = new Map();
    let products_lst = [];
    var counter = 0
    for (let i = 0; i < this.dataSource.length; i++) {
      for (let j = 0; j < this.dataSource[i]['products'].length; j++) {
        if (this.dataSource[i]['products'][j]['productLinkId'] > 0) {
          products_lst.push( this.dataSource[i]['products'][j]['id'] );
          counter++
        }
      }
    }
    this.model.products = products_lst
    console.log('products_lst',products_lst)
    if (this.id > 0) {
      console.log('this.model',this.model)
      this.productlinkService.ProductLinkUpdate(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/productlink/list"]);
          }, 2000);
        }
      });
    }
    else if (this.id == 0) {
      console.log('7')
      this.productlinkService.ProductLinkInsert(this.model).subscribe((response: any) => {
        if (response.errorKey) {
          this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
        } else {
          this.notifier.notify("success", this.app.GetTranslation('SavedSuccessfully'));
          setTimeout( () => {
            this.router.navigate(["/productlink/list"]);
          }, 2000);
        }
      });

    }
  }
  
}