import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { Menu, NavService } from 'src/app/shared/services/nav.service';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  lang: string;

  public menuItems!: Menu[];

  constructor(
    public SwitcherService: SwitcherService,
    public navServices: NavService,
    private app: GlobalApp,
    private router: Router, 
  ) {
    this.lang = this.app.GetLang();

    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
    });
  }
  ngOnInit() {
    document.querySelector(".slide-leftRTL")?.classList.add("d-none")
    document.querySelector(".slide-rightRTL")?.classList.add("d-none")
    //console.log(localStorage.getItem("userInfo"))
    if (!localStorage.getItem("userInfo")) {
      var lng: any = localStorage.getItem("lang");
      localStorage.clear();
      localStorage.setItem('lang', lng);
      //this.router.navigate(['/auth/login'])
      this.router.navigate(['/home'])
      let html: any = document.querySelector('html');
      if(lng == 'ar')
        html?.setAttribute('dir', 'rtl');
      else
        html?.setAttribute('dir', 'ltr');
      //window.location.href = '/login'
    }
  }

  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);

  }
  ngOnDestroy() {
    location.reload()
  }
  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }
}
