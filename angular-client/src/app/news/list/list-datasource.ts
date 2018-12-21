import { MatTableDataSource } from '@angular/material';
import { News } from 'src/app/core';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

export class ListDataSource extends MatTableDataSource<News> {
  public filterBy: Array<Object>;

  constructor() {
    super();
  }
}