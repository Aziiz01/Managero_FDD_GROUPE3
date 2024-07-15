import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { methodePayload } from './pages/methode-dashboard/methode.payload';

@Injectable({
  providedIn: 'root'
})
export class MethodeServiceService {
  readonly API_URL = 'http://localhost:8088'

  constructor(private HttpClient: HttpClient ) {
  }

  getMethode(id: string) {
    return this.HttpClient.get(`${this.API_URL}/manajero/get/${id}`)
   }
   getMethodes() {
    return this.HttpClient.get(`${this.API_URL}/manajero/getAll`)
   }
createMethode(methodePayload : methodePayload) {
    return this.HttpClient.post(this.API_URL+'/manajero/add', methodePayload)
   }

   updateMethod (id :string,methodePayload : methodePayload) {
    return this.HttpClient.put(`${this.API_URL}/manajero/update/${id}`, methodePayload)
   }
  
   deleteMethod(id : string) {
    return this.HttpClient.delete(`${this.API_URL}/manajero/delete/${id}`)
   }
}
