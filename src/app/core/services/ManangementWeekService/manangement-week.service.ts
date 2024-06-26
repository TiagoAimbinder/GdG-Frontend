import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ManangementWeekService {

  constructor(private http: HttpClient){

  }

  createManangement = async (manangement: any): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = environment.const_url_server + endpoints.manangementWeekCreate; 
    return this.http.post(urlApi, manangement, { headers })
  };

  getAllManangement = async (): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = environment.const_url_server + endpoints.manangementWeekGetAll;
    return this.http.get(urlApi, { headers })
  };

  deleteManangement = async (his_id: number): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.manangementWeekDelete}/${his_id}`
    return this.http.delete(urlApi, { headers })
  };

  updateManangement = async (manangement: any, his_id: number, usu_id: number): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.manangementWeekUpdate}/${his_id}/${usu_id}`
    return this.http.put(urlApi, manangement, { headers })
  };

  goToGeneral = async (): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    const urlApi = `${environment.const_url_server}${endpoints.manangementWeekMigrate}/${localStorage.getItem('usu_id')}`
    return this.http.put(urlApi, { headers })
  };
}
