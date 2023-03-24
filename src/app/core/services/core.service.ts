import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageHandlerService } from 'src/app/shared/services/local-storage-handler.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { ServerResponse } from 'src/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(
    private base: BaseService,
    private authService: AuthService,
    private localStorageHandler: LocalStorageHandlerService,
  ) { }

  cartAlert$: Subject<{ qty: number, hidden: boolean }> = new Subject();
  notificationsAlert$: Subject<{ qty: number, hidden: boolean }> = new Subject();

  getCartNumber(): void {
    if (this.authService.isLoggedIn()) {
     this.getCart().subscribe(
        (res: any) => {
          const qty = (res.data.count)?.toString() || '0';
          const hidden = (qty === '0');
          this.cartAlert$.next({qty, hidden});
      });
    } else {
      let qty: any = this.localStorageHandler.productsLength();
      const hidden = (qty === '0');
      qty = Number(qty);
      this.cartAlert$.next({qty, hidden});
    }
  }

  getNotificationsNumber(): void {
    if (this.authService.isLoggedIn()) {
      this.getNotifications().subscribe(
      (res: any) => {
        const qty = (res.data.count)?.toString() || '0';
        const hidden = (qty === '0');
        this.notificationsAlert$.next({ qty, hidden });
      });
    }
    // else { // Not Logged in

    // }
  }

  private getNotifications(): Observable<ServerResponse<any>> {
    return this.base.get(`notifications_module/notifications/count/`);
  }

  private getCart(): Observable<ServerResponse<any>> {
    return this.base.get(`order_module/cart/count/`);
  }
}
