import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, Subject, asapScheduler, pipe, of, from } from 'rxjs';

import { catchError, map, tap, filter, scan } from 'rxjs/operators';
import { User } from './user.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly baseURL = 'http://localhost:3000/api/';

user:any;
  constructor(private http: HttpClient,private router: Router ) {}
///////////////////////////// LOGIN ///////////////////////////////

  loginUser(body: any) {
     return this.http.post(this.baseURL + 'login', body, { observe: 'body'});
    }

/////////////////////////// SEND EMAIL//////////////////////////////
  sendEmail(info:any) {
  return this.http.post(this.baseURL + 'sendmail', info);
}
////////////////////////// RESET PASSWORD //////////////////////////
resetUser(id:any,info:any){
return this.http.put(this.baseURL + 'update/'+id,info)
}
////////////////////////// dashboard ///////////
getNews(): Observable<User[]>{
 return this.http.get<User[]>(this.baseURL + 'select',{
    observe: 'body',
    params: new HttpParams().append('token', localStorage.getItem('token'))
  })
}
/////////////////////////////////Home PAge //////////////////
getHomenews(): Observable<User[]>{
 return this.http.get<User[]>(this.baseURL + 'selectnews')
}
////////////////////////// add vale //////////////
addUser(data){
  return this.http.post(this.baseURL + 'add',data);
}
///////////////////////////EDIT ///////////////////////////////////////

  getCurrentData(id){
    return this.http.get(this.baseURL + 'selectone' +'/'+id)

  }


  updateUser(id,data){
  return this.http.put(this.baseURL + 'updateuser/'+id,data)
    // .pipe(map(()=>""));
}
//////////////// SEARCH DATA //////////////////////
searchData(data): Observable<any> {
    return this.http.get(this.baseURL + 'searchData?search=' + data)
  }
// ///////////////////  PAGINATION //////////////////////////////////////
//
getUserspage(offset: number, limit: number) {
return this.http.get(this.baseURL + 'paging'+ `/${offset}/${limit}`)
}
////////////////////




}//end
