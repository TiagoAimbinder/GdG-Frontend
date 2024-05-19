import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  Login = (user: any): Observable<any> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${'WPpJyE1I1ubPrI9yD6U9lCwp29ymUMgO'}`
    });
    const urlApi = environment.const_url_server + endpoints.loginUser; 
    return this.http.post<any>(urlApi, user, { headers })
  }
}
