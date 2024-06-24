import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  successMessage: string | string[] = '';
  errorMessage: string | string[] = '';
  warningMessage: string | string[] = '';
  infoMessage: string | string[] = '';

  showSuccess: boolean = false;
  showError: boolean = false;
  showWarning: boolean = false;
  showInfo: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.successNotification.subscribe(data => {
      this.successMessage = data.message;
      this.showSuccess = data.showPopUp;
    });

    this.sharedService.errorNotification.subscribe(data => {
      this.errorMessage = data.message;
      this.showError = data.showPopUp;
    });

    this.sharedService.warningNotification.subscribe(data => {
      this.warningMessage = data.message;
      this.showWarning = data.showPopUp;
    });

    this.sharedService.infoNotification.subscribe(data => {
      this.infoMessage = data.message;
      this.showInfo = data.showPopUp;
    });
  }

  closeNotification(type: string): void {
    if (type === 'success') {
      this.showSuccess = false;
    } else if (type === 'error') {
      this.showError = false;
    } else if (type === 'warning') {
      this.showWarning = false;
    } else if (type === 'info') {
      this.showInfo = false;
    }
  }
}
