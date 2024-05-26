import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    return headers; 
  }

  createCategories = async (categories: any) : Promise<Observable<any>> => {
    const urlApi = environment.const_url_server + endpoints.createCategories; 
    return this.http.post(urlApi, categories, { headers: this.headers() });
  }

  getAllCategories = async(): Promise<Observable<any>> =>  { 
    const urlApi = `${environment.const_url_server}${endpoints.getAllCategories}/${localStorage.getItem('usu_id')}`
    return this.http.get(urlApi, {headers: this.headers() })
  }
  
  updateCategory = async ( categories: any, cat_id: number,  usu_id: number): Promise<Observable<any>> => {
    const urlApi = `${environment.const_url_server}${endpoints.updateCategories}/${cat_id}/${usu_id}`; 
    return this.http.put(urlApi, categories, { headers: this.headers() });
  };

  deleteCategory = async (cat_id: number): Promise<Observable<any>> => {
    const urlApi = `${environment.const_url_server}${endpoints.deleteCategories}/${cat_id}/${localStorage.getItem('usu_id')}`
    return this.http.delete(urlApi, { headers: this.headers() })
  };

}


