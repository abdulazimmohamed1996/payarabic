import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListUserComponent } from './list-user/list-user.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'users/edit',title:"Edit User",component: EditUserComponent},
    { path:'profile',title:"Edit Profile",component: EditProfileComponent},
    { path:'User/create',title:"Create User",component: EditProfileComponent},
    { path:'Admin/create',title:"Create Admin",component: EditProfileComponent},
    { path:'SuperAdmin/create',title:"Create Super Admin",component: EditProfileComponent},
    { path:'Vendor/create',title:"Create Vendor",component: EditProfileComponent},
    { path:'User/details/:id',title:"User Details",component: EditProfileComponent},
    { path:'Admin/details/:id',title:"Admin Details",component: EditProfileComponent},
    { path:'SuperAdmin/details/:id',title:"Super Admin Details",component: EditProfileComponent},
    { path:'Vendor/details/:id',title:"Vendor Details",component: EditProfileComponent},
    { path:'superadmin/list',title:"Super Admin",component: ListUserComponent},
    { path:'admin/list',title:"Administrators",component: ListUserComponent},
    { path:'vendor/list',title:"Vendors",component: ListUserComponent},
    { path:'user/list',title:"Users",component: ListUserComponent},
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
