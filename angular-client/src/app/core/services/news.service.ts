import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { News, NewsListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;
  
  constructor (
    private apiService: ApiService
  ) {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
  }

  getFromMessageObservable(message: string, filter: Object = {}): Observable<News[]> {
    return this.apiService.getFromMessageObservable(message, filter);
  }

  query(config: NewsListConfig): Observable<News[]> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/news',
      new HttpParams({ fromObject: params }),
      this.loadingSubject,
    );
  }

  // get(id): Observable<News> {
  //   return this.apiService.get('/news/' + id)
  //     .pipe(map(data => data.news));
  // }

  destroy(id) {
    return this.apiService.delete('/news/' + id, this.loadingSubject);
  }

  save(news): Observable<News> {
    // If we're updating an existing news
    if (news._id) {
      return this.apiService.put('/news/' + news._id, news, this.loadingSubject);

    // Otherwise, create a new news
    } else {
      return this.apiService.put('/news/', news, this.loadingSubject);
    }
  }

  delete(news): Observable<News> {
    return this.apiService.put(`/news/${news._id}?deleted=true`, news, this.loadingSubject);
  }

}
