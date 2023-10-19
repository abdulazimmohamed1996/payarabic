import { Routes } from '@angular/router';
export const content: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('../../components/invoice/invoice-module').then(m => m.FormModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/users/users-module').then(m => m.UsersModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/deposit/deposits-module').then(m => m.DepositsModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/product/products-module').then(m => m.ProductsModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/paymentlink/paymentlink-module').then(m => m.PaymentLinkModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/setting/setting-module').then(m => m.SettingModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('../../components/productlink/productlink-module').then(m => m.ProductLinkModule)
  }
]
