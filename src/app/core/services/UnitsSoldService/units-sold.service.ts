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

  unitsSoldCreate = async (unitsSold: any) : Promise<Observable<any>> => {
    const urlApi = environment.const_url_server + endpoints.createsaleHistory; 
    return this.http.post(urlApi, unitsSold, { headers: this.headers() });
  }

  unitsSoldGetAll = async (usu_id: number) : Promise<Observable<any>> => {
    const urlApi = environment.const_url_server + endpoints.getAllsaleHistory + '?usu_id=' + usu_id ;  
    return this.http.get(urlApi, { headers: this.headers() });
  }

  unitsSoldGetTotals = async (usu_id: number, sal_local: number | null): Promise<Observable<any>> => {
    let urlApi = `${environment.const_url_server}${endpoints.getsaleHistoryTotal}?usu_id=${usu_id}`;

    // Si sal_local es null o undefined, lo enviamos como un valor explícito como 'null'
    if (sal_local !== null && sal_local !== undefined) {
        urlApi += `&sal_local=${sal_local}`;
    } else {
        urlApi += `&sal_local=null`;  // Aquí agregas 'null' explícitamente si sal_local es null o undefined
    }

    
    return this.http.get(urlApi, { headers: this.headers() });
};



};


