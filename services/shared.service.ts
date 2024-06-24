import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public successNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>({ message: '', showPopUp: false });
  public errorNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>({ message: '', showPopUp: false });
  public warningNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>({ message: '', showPopUp: false });
  public infoNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>({ message: '', showPopUp: false });

  constructor() { }


  showLoader(valor: boolean) {
    return this.loader.next(valor);
  }


  success(message: string | string[], showPopUp: boolean) {
     this.successNotification.next({ message, showPopUp });
  }

  error(message: string | string[], showPopUp: boolean) {
     this.errorNotification.next({ message, showPopUp });
  }

  warning(message: string | string[], showPopUp: boolean) {
     this.warningNotification.next({ message, showPopUp });
  }

  info(message: string | string[], showPopUp: boolean) {
     this.infoNotification.next({ message, showPopUp });
  }

  popupHeight() {
    return 400; // Math.round(window.innerHeight / 1.3);
  }

  formHeight() {
    return 350; // Math.round(window.innerHeight / 1.3);
  }

  IsNumber(s: string) {
    const x = +s;
    return x.toString() === s;
  }
}
