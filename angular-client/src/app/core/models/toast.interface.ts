import { ComponentType } from '@angular/cdk/portal';

export class IToast {
  id: string
  message: string;
  duration: number;
  closeString: string;
  style: ToastStyles;
}

export enum ToastStyles {
  SUCCESS = 'toast-success',
  INFO = 'toast-info',
  WARNING = 'toast-warning',
  ERROR = 'toast-error'
}