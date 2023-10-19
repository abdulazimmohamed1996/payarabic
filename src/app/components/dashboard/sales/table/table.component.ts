import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import { table } from './tableType';
import {TableService} from './table.service';
import {TableDirective, SortEvent} from './table.directive';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService, DecimalPipe]})
export class TableComponent {

  products$: Observable<table[]>;
  total$: Observable<number>;

  @ViewChildren(TableDirective) headers!: QueryList<TableDirective>;


  constructor(public service: TableService) {
    this.products$ = service.products$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  onSort(element:any) {
    console.log(typeof element);

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== element.column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = element.column;
    this.service.sortDirection = element.direction;
  }

}
