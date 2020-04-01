import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResolveService implements Resolve<any> {
public allCookiesData:any;
public cookiesData:any;
public userType:any;
public userId:any;

  constructor(private _apiService: HttpService, private router: Router,public cookiesService:CookieService ) { 
    this.allCookiesData = cookiesService.getAll();
      this.cookiesData = JSON.parse(this.allCookiesData.user_details);
      this.userType=this.cookiesData.type;

      this.userId = this.cookiesData._id;
      this.userType=this.cookiesData.type;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {     
    /* will come into play while editing otherwise no effect */
    let requestData: any = route.data.requestcondition;
    requestData.condition = Object.assign(requestData.condition, route.params);
    if(route.url[0].path == "training-center") {
          requestData.condition['user_id'] = this.userId;
          requestData.condition['type'] = this.userType;
    }
    if(route.url[0].path == "training-report") {
      if(this.userType == "admin"){

      }
      if(this.userType == "salesrep"){
        requestData.condition['user_id'] = this.userId;
      }
      if(this.userType == "user"){
        requestData.condition['user_id'] = this.userId;
      }
}
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
