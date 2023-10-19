import { NgModule } from '@angular/core';
import { FooterComponent } from './layout-components/footer/footer.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { LoaderComponent } from './layout-components/loader/loader.component';
import { PageHeaderComponent } from './layout-components/page-header/page-header.component';
import { SidebarComponent } from './layout-components/sidebar/sidebar.component';
import { TabToTopComponent } from './layout-components/tab-to-top/tab-to-top.component';
import { ContentLayoutComponent } from './layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './layout-components/layout/error-layout/error-layout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwitcherLayoutComponent } from './layout-components/layout/switcher-layout/switcher-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { CommonModule } from '@angular/common';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { SwitcherComponent } from './layout-components/switcher/switcher.component';
import { HeaderSwitcherComponent } from './layout-components/header-switcher/header-switcher.component';
import { AuthService } from './services/auth.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'angular-archwizard';
import { QuillModule } from 'ngx-quill'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { NgxEditorModule } from 'ngx-editor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxIntlTelInputModule,SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { LandingpageLayoutComponent } from './layout-components/layout/landingpage-layout/landingpage-layout.component';
import { landingHeaderComponent } from './layout-components/landing-header/landing-header.component';
import { landingFooterComponent } from './layout-components/landing-footer/landing-footer.component';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 5
		},
		vertical: {
			position: 'top',
			distance: 5,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    PageHeaderComponent,
    SidebarComponent,
    SwitcherLayoutComponent,
    LandingpageLayoutComponent,
    TabToTopComponent,
    ContentLayoutComponent,
    ErrorLayoutComponent,
    SwitcherComponent,
    FullscreenDirective,
    ToggleThemeDirective,
    HoverEffectSidebarDirective,
    SidemenuToggleDirective,
    HeaderSwitcherComponent,
    landingHeaderComponent,
    landingFooterComponent,


  ],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    ColorPickerModule,
    NgScrollbarModule,
    AngularMultiSelectModule,
    NgxDropzoneModule,
    AngularEditorModule,
    MaterialModuleModule,
    NgMultiSelectDropDownModule,
    NgxMaterialTimepickerModule,
    NgxDaterangepickerMd.forRoot(),
    QuillModule.forRoot(),
    ColorPickerModule,
    ArchwizardModule,
    NgxEditorModule,
    TableModule,
    NotifierModule.withConfig(customNotifierOptions),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forChild(),


  ],
  exports: [
    TranslateModule,
    PageHeaderComponent,
    FormsModule,
    TabToTopComponent,
    ContentLayoutComponent,
    LandingpageLayoutComponent,
    ErrorLayoutComponent,
    LoaderComponent,
    SidebarComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
    ToggleThemeDirective,
    SidemenuToggleDirective,
    SwitcherComponent,
    NgScrollbarModule,
    AngularMultiSelectModule,
    NgxDropzoneModule,
    AngularEditorModule,
    MaterialModuleModule,
    NgMultiSelectDropDownModule,
    NgxMaterialTimepickerModule,
    NgxDaterangepickerMd,
    QuillModule,
    ColorPickerModule,
    ArchwizardModule,
    NgbModule,
    NgxEditorModule,
    ToastrModule,
    TableModule,
    NotifierModule,
    //landingHeaderComponent,
    //landingFooterComponent
  ],
  providers: [

    AuthService,
  ]


})
export class SharedModule {
  country_phoneISO = [CountryISO.Kuwait, CountryISO.SaudiArabia,CountryISO.Qatar,CountryISO.UnitedArabEmirates,CountryISO.Oman, CountryISO.Bahrain];
  country_phoneCode = ["+965","+966","+974","+971","+968","+973"];
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = this.country_phoneISO;

  public removeCountryPhoneCode(phone: any): SharedModule {
    this.country_phoneCode.forEach(phoneCode=> {
      phone = phone.replace(phoneCode,"");
    });
    return phone

  }
  public getCountryPhoneCountryISO(phone: any): SharedModule {
    this.country_phoneCode.forEach((phoneCode, index)=> {
      if(phone.indexOf(phoneCode)>=0)
        phone = this.country_phoneISO[index];
    });
    return phone;
  }

  public getCountryPhoneCountryCode(phone: any): SharedModule {
    this.country_phoneCode.forEach((phoneCode, index)=> {
      if(phone.indexOf(phoneCode)>=0)
        phone = phoneCode;
    });
    return phone;
  }

}
