import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { NewsService } from '../../core/services/news.service';
import { NewsListConfig, News } from 'src/app/core';
import { merge, of, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ListDataSource } from '../list/list-datasource';
import { cloneDeep, remove } from 'lodash';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddNewsComponent } from '../add/add-news.component';

@Component({
  selector: 'app-list-archived',
  templateUrl: './archived.component.pug',
  styleUrls: ['./archived.component.scss'],
})
export class ArchivedComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new ListDataSource();
  datePipe: DatePipe = new DatePipe('en-US');
  news: News[];
  subscriptions: Subscription[] = [];
  newsListConfig: NewsListConfig = {
    filters: {
      archived: true,
    }
  }
  newsLength: number;
  loading: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_id', 'title', 'date', 'action'];
  filterBy = [
    {
      key: '_id'
    },
    {
      key: 'title',
    },
    {
      key: 'date',
      format: (date: Date, format: string = 'short') => this.datePipe.transform(date, format),
    }
  ];

  constructor(private newsService: NewsService, private toastService: ToastService, private addDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource.filterBy = this.filterBy;
    this.dataSource.filterPredicate = this.filterPreficate;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.newsService.loading$.subscribe((loading) => this.loading = loading));
    this.subscriptions.push(this.newsService.getFromMessageObservable('edit-news', {
      archived: true
    }).subscribe(
      (editedNews: News[]) => {
        this.editNews(editedNews);
        this.refresh();
      }
    ));
  }

  ngOnDestroy(): void {
    this.unsubscribeObservable();
  }

  private editNews(editedNews) {
    for (let i = 0; i < editedNews.length; i++) {
      const edited = editedNews[i];
      const newsIdx = this.news.findIndex(item => item._id === edited._id);
      if (newsIdx === -1) {
        this.news.push(edited);
        this.toastService.info(`Other user archived news ${edited.title || edited._id}`, 3000);
        continue;
      }

      if (edited.deleted) {
        this.news.splice(newsIdx, 1);
        this.toastService.info(`Other user deleted news ${edited.title || edited._id}`, 3000);
        continue;
      }
    }
  }

  private unsubscribeObservable() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      const subscription: Subscription = this.subscriptions[i];
      subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Reset pagination on sort
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.newsService!.query(
            this.newsListConfig);
        }),
        map(data => {
          this.newsLength = data.length;
          return data;
        }),
        catchError(() => {
          return of([]);
        })
    ).subscribe(data => {
      this.news = data;
      this.dataSource.data = this.news;
    });
  }

  filterPreficate(data: News, filterStr: string) {
    for (let filter of this.filterBy) {
      let parsedData = data[filter.key];
      if (filter.format) {
        parsedData = filter.format(parsedData);
      }

      if (parsedData.trim().toLowerCase().indexOf(filterStr) !== -1) {
        return true;
      }
    }

    return false;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  refresh() {
    this.dataSource.data = this.news;
    this.changeDetectorRefs.detectChanges();
  }

  delete(clickedNewsItem: News) {
    const copyNewsItem = cloneDeep(clickedNewsItem);
    copyNewsItem.deleted = true;
    this.newsService.delete(copyNewsItem).subscribe(
      (res) => {
        clickedNewsItem.deleted = true;
        remove(this.news, newsItem => newsItem._id === clickedNewsItem._id);
        this.refresh();
        this.toastService.success('News deleted succesfully', 3000);
      },
      (err) => {
        this.toastService.error('Error deleting news!', 3000);
      }
    );
    
  }
}
