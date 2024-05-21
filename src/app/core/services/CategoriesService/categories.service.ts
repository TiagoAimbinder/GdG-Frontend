import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    return headers; 
  }

  getAllCategories = async(): Promise<Observable<any>> =>  { 
    const urlApi = `${environment.const_url_server}${endpoints.getAllCategories}/${localStorage.getItem('usu_id')}`
    return this.http.get(urlApi, {headers: this.headers()})
  }
}
