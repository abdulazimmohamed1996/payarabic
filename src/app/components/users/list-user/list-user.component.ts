import { Component, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { UserService } from 'src/app/shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})

export class ListUserComponent implements OnInit {

  constructor(
    private notifier: NotifierService, public app: GlobalApp, public UserService: UserService, private modalService: NgbModal, private activatedRoute: ActivatedRoute,
  ) {

  }
  isShown: boolean = false;
  navigateTitle: string = '';
  currentRoute: string = '';
  logo: any = "";
  selectedUser: number = 0;
navigateURL:string = "user"
  pageTitle: string = '';
  requestedUserType: string = '';
  UserFilter: any = {
    name: "",
    mobile: "",
    email: "",
    userType: "",
    inactive: "",
    reviewed: "",
  };
  users: any[] = [];
  UserPermissions: any[] = [];

  ngOnInit(): void {
    this.SearchUsers();


  }

  matcherUserTitle() {
    var url = this.activatedRoute.snapshot.url
    var langKey = ''
    var userType = '';
    if (url.length > 0) {
      const path = url[0].path;
      if (path.startsWith('user')) {
        this.UserFilter.userType = 'User'
      }
      if (path.startsWith('vendor')) {
        this.UserFilter.userType = 'Vendor'
        this.navigateURL = "vendor"
      }
      if (path.startsWith('admin')) {
        this.UserFilter.userType = 'Admin'
      }
      if (path.startsWith('superadmin')) {
        this.UserFilter.userType = 'SuperAdmin'
      }
    }
  }
  ChangeStatus(id: any, status: any) {

    this.UserService.UserActivate(id, status).subscribe((response: any) => {
    });
    const index = this.users.indexOf(id);
    this.users.splice(index, 1);
    this.SearchUsers()
  }

  SearchUsers() {
    this.matcherUserTitle()

    console.log(this.UserFilter);

    this.UserService.UserGetAll(this.UserFilter).subscribe((response: any) => {
      console.log(response);
      console.log(response.isValid);
      console.log(response.response);
      if (response != null && response.errorKey == '' && response.response != null && response.response.length > 0) {
        this.users = response.response;
      }
      else {
        this.users.length = 0;
        this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
      }
    });
  }
  ConfirmDelete(id: any) {
    Swal.fire({
      title: this.app.GetTranslation('AreYouSure'),
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.app.GetTranslation('Yes'),
      cancelButtonText: this.app.GetTranslation('No'),
    }).then((result) => {
      if (result.value) {
        this.UserService.DeleteUser(id).subscribe((response: any) => {
          if (response.isValid) {
            var filteredItems: any = [];

            this.users.forEach(function (row: any) {
              if (row.id != id) {
                filteredItems.push(row)
              }
            });
            this.users = filteredItems;
            this.notifier.notify("success", this.app.GetTranslation('DeletedSuccessfully'));
          }
          else
          {
            this.notifier.notify("error", this.app.GetTranslation(response.errorKey));
          }
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.app.GetTranslation('Cancelled'),
          this.app.GetTranslation('NotDeleted'),
          'error',
        )
      }
    })
  }
  
  ResetSearch() {
    this.UserFilter = {
      userType: "",
      name: "",
      mobile: "",
      inactive: "",
      email: ""
    };
    this.SearchUsers()
  }

  SuccessOpen(successmodal: any) {
    this.modalService.open(successmodal, { centered: true });
  }

  SmallOpen(smallmodal: any) {
    this.modalService.open(smallmodal, { size: 'sm' });
  }

  GetPermissionList(id: any) {
    this.UserService.GetPermissionList(id).subscribe((response: any) => {
      console.log('Permissions', response)
      if (response != null && response.response.length > 0) {
        this.UserPermissions = response.response
        var user_perm = this.UserPermissions;
        var new_perm = this.UserPermissions;
        var length = response.response.length;
        response.response.forEach(function (part: any, index: any) {
          var permission_exists = false;
          user_perm.forEach(function (p: any, i: any) {
            if (p.controller == part.controller)
              permission_exists = true;
          });
          if (!permission_exists) {
            part.inActive = 1;
            new_perm[length] = part;

            length++;
          }
        });
        this.UserPermissions = new_perm;
        // this.UserPermissions.forEach(function (part, index) { part.inActive = true; });

      }
    });
  }

  LargeOpen(largemodal: any, id: any) {

    this.GetPermissionList(id)
    this.modalService.open(largemodal, { size: 'lg' });
  }

  ExtraLargeOpen(extraLargeModal: any) {
    this.modalService.open(extraLargeModal, { size: 'xl' });
  }

  ScrollableContentOpen(largeContent: any, id: any) {
    this.selectedUser = id
    this.GetPermissionList(id)
    this.modalService.open(largeContent, { scrollable: true });
  }

  FullScreenModalOpen(fullscreenmodal: any) {
    this.modalService.open(fullscreenmodal, { fullscreen: true });
  }

  InputModal(inputModal: any) {
    this.modalService.open(inputModal);
  }
  BasicModalOpen(basicmodal: any) {
    this.modalService.open(basicmodal);

  }
  ScrollableOpen(scrollablemodal: any) {
    this.modalService.open(scrollablemodal, { centered: true })
  }

  SavePermission() {
    var inputs = document.querySelectorAll(" input[name='functionIDs[]']");
    var permissionsLst = []
    for (var i = 0; i < inputs.length; i++) {
      let inputElement = inputs[i] as HTMLInputElement;
      let functionObjVal = inputElement.value.split('#');

      //{{permission.moduleId}}#{{permission.module}}#{{permission.permission}}#{{permission.auditable}}#{{function.functionId}}#{{function.function}}#{{function.permission}}#{{function.auditable}}#{{function.inActive}}
      let active_chk = document.getElementById('functionID_' + functionObjVal[4]) as HTMLInputElement;
      if (active_chk.checked === true) {
        permissionsLst.push({
          'userId': this.selectedUser, 'moduleId': functionObjVal[0], 'moduleName': functionObjVal[1],
          'modulePermission': functionObjVal[2], 'moduleAuditable': (functionObjVal[3] == "true"), 'functionId': functionObjVal[4],
          'functionName': functionObjVal[5], 'functionPermission': functionObjVal[6], 'functionAuditable': (functionObjVal[7] == "true"),
          'functionInActive': (functionObjVal[8] == "true")
        })
      }
    }
    console.log("permissionsLst", permissionsLst)
    this.UserService.SaveUserPermission(permissionsLst).subscribe((response: any) => {

    });
    let modalCloseBtn = document.getElementById('modalCloseBtn') as HTMLInputElement;
    modalCloseBtn.click()

  }
}


