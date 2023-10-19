import { Routes } from '@angular/router';
export const landingpagelayoutchild: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/landingpage/landingpage.module').then(m => m.LandingPageModule)
  },
  {
    path: '',
    loadChildren: () => import('../../components/account/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  
]
