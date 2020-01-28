import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResolveService implements Resolve<any> {

  constructor(private _apiService: HttpService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
     
    /* will come into play while editing otherwise no effect */
    let requestData: any = route.data.requestcondition;
    requestData.condition = Object.assign(requestData.condition, route.params);

    return new Promise((resolve) => {
      this._apiService.CustomRequest(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
        if (api_object) {
          return resolve(api_object);
        } else { // id not found
          return true;
        }
      });
    });
  }
}
