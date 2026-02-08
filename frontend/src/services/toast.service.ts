import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
    private readonly alerts = inject(TuiAlertService);

    public showInfo(message: string): void {
      this.alerts.open(`${message}`, {label: 'Info'}).subscribe();
    }

    public showWarning(message: string): void {
      this.alerts.open(`${message}`, {label: 'Warning', appearance: 'accent'}).subscribe();
    }

    public showError(message: string): void {
      this.alerts.open(`${message}`, {label: 'Error', appearance: 'negative'}).subscribe();
    }

    public showSuccess(message: string): void {
      this.alerts.open(`${message}`, {label: 'Success', appearance: 'positive'}).subscribe();
    }
}
