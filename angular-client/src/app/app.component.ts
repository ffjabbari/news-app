import { Component, ViewChild } from '@angular/core';
import { ToastService } from './core/services/toast.service';
import { IToast } from './core/models/toast.interface';
import { ComponentType } from '@angular/cdk/portal';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ToastComponent) toastComponent: ToastComponent;
  title = 'angular-client';

  constructor(private toastService: ToastService) {
    this.toastService.getToast().subscribe((toast: IToast) => {
      this.toastComponent.open(toast);
    });
  }
}
