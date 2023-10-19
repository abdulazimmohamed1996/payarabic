import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { content } from './shared/routes/layoutchild';
import { LandingpageLayoutComponent } from './shared/layout-components/layout/landingpage-layout/landingpage-layout.component';
import { landingpagelayoutchild } from './shared/routes/landingpagelayoutchild';

const routes: Routes = [

  // { path: '', redirectTo:'home', pathMatch: 'full'},
  //  {
  //   path:'', loadChildren: ()=> import('./components/landingpage/landingpage-routing.module').then(m => m.LandingPageRoutingModule),
  // }
  {
    path: '', 
    component: LandingpageLayoutComponent,
    children: landingpagelayoutchild
  }
  ,
  // { path: '', redirectTo:'auth/login', pathMatch: 'full'},
  // {
  //   path:'', loadChildren: ()=> import('./components/account/authentication/authentication.module').then(m => m.AuthenticationModule),
  // },
 
  {
    path: '',
    redirectTo: '/dashboard/sales',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: '',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
