import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IToast, ToastStyles } from '../models/toast.interface';
import { Guid } from '../helpers/guid';
import { ComponentType } from '@angular/cdk/portal';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private DEF_CLOSE_STR = 'Close';
  private DEF_DURATION = 500;
  private subject = new Subject<IToast>();

  constructor() {}

  getToast(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, duration: number = this.DEF_DURATION, closeString: string = this.DEF_CLOSE_STR): void {
    this.toast(message, duration, closeString, ToastStyles.SUCCESS);
  }

  error(message: string, duration: number = this.DEF_DURATION, closeString: string = this.DEF_CLOSE_STR): void {
    this.toast(message, duration, closeString, ToastStyles.ERROR);
  }

  info(message: string, duration: number = this.DEF_DURATION, closeString: string = this.DEF_CLOSE_STR): void {
    this.toast(message, duration, closeString, ToastStyles.INFO);
  }

  warn(message: string, duration: number = this.DEF_DURATION, closeString: string = this.DEF_CLOSE_STR): void {
    this.toast(message, duration, closeString, ToastStyles.WARNING);
  }

  toast(message: string, duration: number, closeString: string, style: ToastStyles): void {
    this.subject.next(<IToast>{ id: Guid.newGuid(), message, duration, closeString, style });
  }

  clear() {
    this.subject.next();
  }
}