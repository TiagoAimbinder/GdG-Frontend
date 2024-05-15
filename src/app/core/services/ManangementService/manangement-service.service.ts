import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ManangementServiceService {

  constructor(private http: HttpClient) { }


  createManangement = async (manangement: any): Promise<Observable<any>> => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRpYWdvIiwiaWF0IjoxNzE1NzQwMDI0LCJleHAiOjE3MTU3NDM2MjR9.mCJesj2m4xU3hkeDMNixGNFmZWRBqcImmVtPs_61N8k'}`
    });
    const urlApi = environment.const_url_server + endpoints.manangementCreate; 
    return this.http.post(urlApi, manangement, { headers })
  };
}
