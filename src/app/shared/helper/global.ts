import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalApp {

  public userArr: any = "";
  public userInfo: any = "";
  public isAjaxLoading = false;

  constructor(private translate: TranslateService) {
    this.userArr = localStorage.getItem("userInfo") || null;
    this.userInfo = (this.userArr != null && this.userArr != "undefined") ? JSON.parse(this.userArr) : "";
  }

  public UserName(): string {
    return this.userInfo.name;
  }

  public UserId(): number {
    var User_Id: number = 0;
    const userArr = localStorage.getItem("userInfo") || null;

    const userJson = userArr !== null ? JSON.parse(userArr) : "";
    if (userArr !== null || parseInt(userJson!.id) > 0) {
      User_Id = parseInt(userJson!.id);
    }
    return User_Id;
  }

  public UserType(): string {
    var User_Type: string = '';
    const userArr = localStorage.getItem("userInfo") || null;
    const userJson = userArr !== null ? JSON.parse(userArr) : "";

    if (userArr !== null && userJson.userType !== null) {
      User_Type = userJson!.userType;
    }
    return User_Type;
  }

  public UserReviewed(): boolean {
    var userReviewed: boolean = false;
    const userArr = localStorage.getItem("userInfo") || null;
    const userJson = userArr !== null ? JSON.parse(userArr) : "";
    if (userArr !== null && userJson.reviewed !== null) {
      userReviewed = userJson!.reviewed;
    }

    return userReviewed;
  }

  public HasPermission(model: string) {
    const userArr = localStorage.getItem("userPermissions") || null;
    const userJson = userArr !== null ? JSON.parse(userArr) : "";
    var allowed = false;
    userJson.forEach(function (permission: any) {
      if (permission.module == model) {
        allowed = true;
      }
    });
    return allowed;
  }
  SetLang(lang: string) {
    if (lang == '') lang = 'ar';
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
  public GetLang(): string {
    var lng = "ar";
    if (localStorage.getItem("lang") != null && localStorage.getItem("lang") != 'null') {
      lng = String(localStorage.getItem('lang') || '');
    } else if ((navigator.languages != undefined && navigator.languages[0].indexOf('en') != -1) || (navigator.language != undefined && navigator.language.indexOf('en') != -1)) {
      lng = "en";
    }
    return lng;
  }
  public GetDateForSave(date: any): any {
    let newdate = date.year + "-" + date.month + "-" + date.day;
    return newdate;
  }
  public GetDateForCalnder(date: any): any {
    let dateparts = date.split('/');
    var formatdate = { year: Number(dateparts[2].substring(0, 4)), month: Number(dateparts[0]), day: Number(dateparts[1]) };
    return formatdate;
  }
  downloadFile(attach: any, name: any) {

    const fileType = attach.substring("data:".length, attach.indexOf(";base64"))
    //  let fileType = attach.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let blob = new Blob([attach], { type: fileType });
    let url = window.URL.createObjectURL(blob);
    const nav = (window.navigator as any);
    if (window.navigator && nav.msSaveOrOpenBlob) {
      // download PDF in IE
      let byteChar = atob(attach);
      let byteArray = new Array(byteChar.length);
      for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      if (fileType.toLowerCase().indexOf("pdf") !== -1) {
        let blob = new Blob([uIntArray], { type: "application/pdf" });
        nav.msSaveOrOpenBlob(blob, `${name}.pdf`);
      } else if (fileType.toLowerCase().indexOf("png") !== -1) {
        let blob = new Blob([uIntArray], { type: "image/png" });
        nav.msSaveOrOpenBlob(blob, `${name}.png`);
      }
      else if (fileType.toLowerCase().indexOf("jpeg") !== -1) {
        let blob = new Blob([attach], { type: "image/jpeg" });

      }
      else if (fileType.toLowerCase().indexOf("jpg") !== -1) {
        let blob = new Blob([attach], { type: "image/jpg" });

      }


    } else {
      // Download PDF in Chrome etc.
      const source = attach;
      const link = document.createElement("a");
      link.href = source;
      if (fileType.toLowerCase().indexOf("pdf") !== -1) {
        link.download = `${name}.pdf`;
      } else if (fileType.toLowerCase().indexOf("png") !== -1) {
        link.download = `${name}.png`;
      } else if (fileType.toLowerCase().indexOf("jpeg") !== -1) {
        link.download = `${name}.jpeg`;
      }
      else if (fileType.toLowerCase().indexOf("jpg") !== -1) {
        link.download = `${name}.jpg`;
      }

      link.click();
    }
  }
  CheckFile(fileInput: any, types: any = "all"): string[] {
    {
      var isValidFile = 'true';
      var fileBase = '';
      const max_size = 1024880;
      var allowed_types = ["image/png", "image/jpeg", "application/pdf"];
      if (types == "image")
        allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        isValidFile = 'false';
      }
      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        isValidFile = 'false';
      }
      if (isValidFile == 'true') {
        var reader = new FileReader();
        reader.onload = (e: any) => {

          isValidFile = 'true';
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
      else {
        isValidFile = 'false';
        fileInput.target.value = null;
      }
      return new Array(isValidFile);
    }
  }
  SaveFile(fileInput: any, dataModel: any, field: any, types: any = "all"): string[] {
    {
      var isValidFile = 'true';
      var fileBase = '';
      const max_size = 1024880;
      var allowed_types = ["image/png", "image/jpeg", "application/pdf"];
      if (types == "image")
        allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        isValidFile = 'false';
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        isValidFile = 'false';
      }
      if (isValidFile == 'true') {
        var reader = new FileReader();
        reader.onload = (e: any) => {

          isValidFile = 'true';
          dataModel[field] = e.target.result;
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
      else {
        isValidFile = 'false';
      }
      return new Array(isValidFile);

    }
  }

  onlyDecimalNumberKey(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  onlyNumberKey(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  GetTranslation(translateKey: any) {
    var translateTXT = ''
    this.translate.get(translateKey).subscribe((translatedString: any) => {
      translateTXT = translatedString
    });
    return translateTXT
  }

}
