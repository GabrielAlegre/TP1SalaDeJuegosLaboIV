import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  toasCorrecto(message: string, title: string, posicion?: any, duracion?:any) {
    this.toastr.success(message, title, {
      timeOut: duracion?duracion:2000,
      positionClass : posicion?posicion:'toast-top-right',
      // positionClass: posicion,
    });
  } // end of showSuccess

  toasError(message: string, title: string, duracion?:any) {
    
    this.toastr.error(message, title, {
      timeOut: duracion?duracion:2000,
      positionClass: 'toast-top-right',
    });
  
  } // end of showError

  toasInfo(message: string, title: string, posicion?: any, duracion?:any) {
      this.toastr.info(message, title, {
        timeOut: duracion?duracion:2000,
        positionClass : posicion?posicion:'toast-bottom-right',
        // positionClass: posicion,
      });

  } // end of showInfo

  toasAlerta(message: string, title: string, config?: any, duracion?:any) {
    if (!config) {
      this.toastr.warning(message, title, {
        timeOut: duracion?duracion:2000,
        positionClass: 'toast-bottom-left',
      });
    } else {
      this.toastr.warning(message, title, config);
    }
  } // end of showWarning
  
}