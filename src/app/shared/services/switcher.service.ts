import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class SwitcherService {

  constructor() { }
  private emitChangeSource = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();
  emitChange(change: any){
    this.emitChangeSource.next(change);
    document.querySelector("body")?.classList.add("sidenav-toggled");
    //console.log('emitChange');
  }

  private emitHoverChangeSource = new Subject<any>();
  changeHoverEmitted = this.emitHoverChangeSource.asObservable();
  emitHoverChange(change: any){
    this.emitHoverChangeSource.next(change);
    //console.log('emitaaaChange');
  }

}
