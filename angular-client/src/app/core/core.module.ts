import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ToastService,
  ]
})
export class CoreModule { }
