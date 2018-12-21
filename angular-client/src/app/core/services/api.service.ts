import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, finalize, map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { find } from 'lodash';
import { Socket } from 'socket.io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private socket: Socket = io(environment.ws_url);
  private socketId;

  constructor(
    private http: HttpClient,
  ) {
    this.onSocketConnect();
  }

  private setSocketId(id) {
    this.socketId = id;
  }

  private onSocketConnect() {
    const me = this;
    this.socket.on('message', id => {
      me.setSocketId(id);
    });

    this.socket.on('disconnect', function () {
      me.setSocketId(null);
    });
  }

  private setNextLoading(subject: BehaviorSubject<boolean>, loading: boolean) {
    subject.next(loading);
  }

  private formatErrors(error: any, subject: BehaviorSubject<boolean>) {
    this.setNextLoading(subject, false);
    return throwError(error.error);
  }

  getFromMessageObservable(message: string, filter): Observable<any> {
    const me = this;
    let observable = new Observable(observer => {
      this.socket.on(message, (data) => {
        observer.next(data);
      });
    }).pipe(
      map((data: any) => me.filterWsData(JSON.parse(data.data), filter))
    );

    return observable;
  }

  private filterWsData(data: any, filterObject: Object) {
    const filterKeys = Object.keys(filterObject);
    return data.filter(item => {
      let filterStatus = true;
      for (let i = 0; i < filterKeys.length; i++) {
        const filterKey = filterKeys[i];
        filterStatus = filterStatus && (item[filterKey] === filterObject[filterKey]);
        if (!filterStatus) {
          return false;
        }
      }

      return true;
    })
  }

  get(path: string, params: HttpParams = new HttpParams(), subject: BehaviorSubject<boolean>): Observable<any> {
    this.setNextLoading(subject, true);
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError((err) => this.formatErrors(err, subject)), finalize(() => this.setNextLoading(subject, false)));
  }

  put(path: string, body: Object = {}, subject: BehaviorSubject<boolean>): Observable<any> {
    this.setNextLoading(subject, true);
    return this.http.put(
      `${environment.api_url}${path}`,
      { data: body, socketId: this.socketId }
    ).pipe(catchError(this.formatErrors), finalize(() => this.setNextLoading(subject, false)));
  }

  post(path: string, body: Object = {}, subject: BehaviorSubject<boolean>): Observable<any> {
    this.setNextLoading(subject, true);
    return this.http.post(
      `${environment.api_url}${path}`,
      { data: body, socketId: this.socketId }
    ).pipe(catchError(this.formatErrors), finalize(() => this.setNextLoading(subject, false)));
  }

  delete(path, subject: BehaviorSubject<boolean>): Observable<any> {
    this.setNextLoading(subject, true);
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors), finalize(() => this.setNextLoading(subject, false)));
  }
}
