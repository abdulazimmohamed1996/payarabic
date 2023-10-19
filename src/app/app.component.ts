import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import { GlobalApp } from './shared/helper/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pay Arabic';
  constructor(private translate: TranslateService,private app: GlobalApp) {
    translate.setDefaultLang(this.app.GetLang());
    this.app.SetLang(this.app.GetLang());
    document.querySelector('body')?.classList.remove("sidenav-toggled-open");
    document.querySelector("body")?.classList.add("sidenav-toggled");
  }
  ngOnInit() {
    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));

  }
}
