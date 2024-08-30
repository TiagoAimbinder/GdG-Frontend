import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsSoldService {

  constructor(private http: HttpClient) { }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    return headers; 
  }

  unitsSoldCreate = async (categories: any) : Promise<Observable<any>> => {
    const urlApi = environment.const_url_server + endpoints.createCategories; 
    return this.http.post(urlApi, categories, { headers: this.headers() });
  }
}
