import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getAllUsers(): Promise<Observable<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = environment.const_url_server + endpoints.getAllUsers;
    return this.http.get(urlApi, {headers});
  }

  validateToken(usu_id: number, usu_token: string | null) {
    console.log(usu_token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${usu_token}`
    });

    const params = {
      usu_id: usu_id
    }

    const urlApi = environment.const_url_server + endpoints.validateToken;
    return this.http.post(urlApi, params, { headers });
  }; 
}
