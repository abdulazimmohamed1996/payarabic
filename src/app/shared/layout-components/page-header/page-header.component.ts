import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() items!: any[];
  @Input() active_item!: string;
  @Input() link!: string;
  @Input() showlist: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

}
