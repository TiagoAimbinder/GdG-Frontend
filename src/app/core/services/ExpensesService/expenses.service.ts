import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) {  }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('usu_token')}`
    });
    return headers; 
  }
  
  getAllExpenses = async (): Promise<Observable<any>> => {
    const urlApi = `${environment.const_url_server}${endpoints.getAllExpenses}/${localStorage.getItem('usu_id')}`
    return this.http.get(urlApi, { headers: this.headers() })
  };

  deleteExpense = async (exp_id: number): Promise<Observable<any>> => {
    const urlApi = `${environment.const_url_server}${endpoints.deleteExpense}/${exp_id}/${localStorage.getItem('usu_id')}`
    return this.http.delete(urlApi, { headers: this.headers() })
  };
}
