import { Component, OnInit } from '@angular/core';
import { GlobalApp } from '../../helper/global';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
})
export class landingHeaderComponent implements OnInit {
  constructor(
    public translate: TranslateService

  ){
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  
  switchLang(lang: string) {
    this.translate.use(lang);
  }



  ngOnInit(): void {
  this.callAssets();
  
  }
  
 

  callAssets() {
    
    for (var j = 0; j < document.getElementsByTagName('footer')[1].childNodes.length; j++) {
      let node1 = document.getElementsByTagName('footer')[1].children[j];
      if(node1.id.startsWith("component-script-") || node1.id.startsWith("component-css-"))
      {
        document.getElementsByTagName('footer')[1].childNodes[j].remove()
      }
    }

    var assetsFiles: string[][] = [
      ['https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', 'css'],
      ['assets/landingpage/vendor/font-awesome/css/all.min.css', 'css'],
      //['assets/landingpage/vendor/owl.carousel/assets/owl.carousel.min.css', 'css'],
      ['assets/landingpage/css/stylesheet.css', 'css'],
      ['assets/landingpage/css/custom.css', 'css'],
      ['assets/landingpage/vendor/jquery/jquery.min.js','script'],
      ['assets/landingpage/vendor/bootstrap/js/bootstrap.bundle.min.js','script'],
      //['assets/landingpage/vendor/owl.carousel/owl.carousel.min.js', 'script'],
      ['assets/landingpage/js/theme.js', 'script']
    ]

    for (let i = 0; i < assetsFiles.length; i++) {
      let url = assetsFiles[i][0];
      if (assetsFiles[i][1] == "script") {
        let node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = url;
        node.id = "inner-script-" + i;
        if (document.getElementById(node.id) == null)
          document.getElementsByTagName('footer')[1].appendChild(node);
      }
      else if (assetsFiles[i][1] == "css") {
        let node = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = url;
        node.id = "inner-css-" + i;
        if (document.getElementById(node.id) == null)
          document.getElementsByTagName('footer')[1].appendChild(node);
      }
    }
    let divslider = document.querySelector('#divslider');// as HTMLDivElement | null;
    divslider?.setAttribute('display', 'block');
  }
}
