import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionShowResolver implements Resolve<any> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.api.getQuestion(route.paramMap.get('id'));
  }
}
