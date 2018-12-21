import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { NewsService } from '../../core/services/news.service';
import { NewsListConfig, News } from 'src/app/core';
import { merge, of, Observable, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ListDataSource } from './list-datasource';
import { cloneDeep, remove } from 'lodash';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddNewsComponent } from '../add/add-news.component';

@Component({
  selector: 'app-list-news',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new ListDataSource();
  datePipe: DatePipe = new DatePipe('en-US');
  news: News[];
  subscriptions: Subscription[] = [];
  newsListConfig: NewsListConfig = {
    filters: {
      archived: false,
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
    this.subscriptions.push(this.newsService.getFromMessageObservable('new-news').subscribe(
      (addedNews: News[]) => {
        this.news = this.news.concat(addedNews);
        this.refresh();
        this.toastService.info(`Other user added ${addedNews.length} news`, 3000);
      }
    ));

    this.subscriptions.push(this.newsService.getFromMessageObservable('edit-news', {
      deleted: false
    }).subscribe(
      (editedNews: News[]) => {
        this.editLoadedNews(editedNews);
        this.refresh();
      }
    ));
  }

  ngOnDestroy(): void {
    this.unsubscribeObservable();
  }

  private editLoadedNews(editedNews) {
    for (let i = 0; i < editedNews.length; i++) {
      const edited = editedNews[i];
      const newsIdx = this.news.findIndex(item => item._id === edited._id);
      if (newsIdx === -1) {
        continue;
      }

      this.news.splice(newsIdx, 1);
      this.toastService.info(`Other user archived news ${edited.title || edited._id}`, 3000);
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

  add() {
    this.addDialog.open(AddNewsComponent, {
      data: { },
    }).afterClosed().subscribe(news => {
      if (news && news.title && news.body) {
        this.create(news);
      }
    });
  }

  create(news: News) {
    this.newsService.save(news).subscribe(
      (res) => {
        this.news.push(res[0]);
        this.refresh();
        this.toastService.success('News created succesfully', 3000);
      },
      (err) => {
        this.toastService.error('Error creating news!', 3000);
      }
    );
  }

  archive(clickedNewsItem: News) {
    const copyNewsItem = cloneDeep(clickedNewsItem);
    copyNewsItem.archived = true;
    this.newsService.save(copyNewsItem).subscribe(
      (res) => {
        clickedNewsItem.archived = true;
        remove(this.news, newsItem => newsItem._id === clickedNewsItem._id);
        this.refresh();
        this.toastService.success('Archived news succesfully', 3000);
      },
      (err) => {
        this.toastService.error('Error archiving news!', 3000);
      }
    );
    
  }
}
