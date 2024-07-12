import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { methodePayload } from './pages/methode-dashboard/methode.payload';

@Injectable({
  providedIn: 'root'
})
export class MethodeServiceService {
  readonly API_URL = 'http://localhost:8080'

  constructor(private HttpClient: HttpClient ) {
  }

  getMethode(id: number) {
    return this.HttpClient.get(`${this.API_URL}/methode/${id}`)
   }
   getMethodes() {
    return this.HttpClient.get(`${this.API_URL}/getAllmethodes`)
   }
createMethode(methodePayload : methodePayload) {
    return this.HttpClient.post(this.API_URL+'/methode/saveMethode', methodePayload)
   }

   updateMethod (id :string,methodePayload : methodePayload) {
    return this.HttpClient.put(`${this.API_URL}/methode/update/${id}`, methodePayload)
   }
  
   deleteMethod(id :string) {
    return this.HttpClient.delete(`${this.API_URL}/method/delete/${id}`)
   }
}
