import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { ServerResponse } from 'src/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private base: BaseService) { }

  sendHelpForm(body: any): Observable<ServerResponse<any>> {
    return this.base.post(`user_module/help_form/`, body);
  }
}
