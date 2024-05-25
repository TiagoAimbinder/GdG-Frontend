import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  createCategories = async (categorys2:any) : Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = environment.const_url_server + endpoints.createCategories; // Agrega el usu_id a la URL
    return this.http.post(urlApi, categorys2, { headers });
  }

  getAllCategories = async (usu_id: any): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.getAllCategories}/${usu_id}`; // Agrega el usu_id a la URL
    return this.http.get(urlApi, { headers });
  };

  updateCategory = async ( categorys: any, cat_id: number,  usu_id: number): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.updateCategories}/${cat_id}/${usu_id}`; // Agrega el usu_id a la URL
    return this.http.put(urlApi, categorys, { headers });
  };

  deleteCategory = async (cat_id: number): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.deleteCategories}/${cat_id}`
    return this.http.delete(urlApi, { headers })
  };

}


