import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { methodePayload } from '../models/methode.payload';
import { Process } from '../models/process.model';
import { Archive } from '../models/archive.payload';

@Injectable({
  providedIn: 'root'
})
export class MethodeServiceService {
  readonly API_URL = 'http://localhost:8088'
  readonly API_URLLL = 'http://localhost:8088/manajero/processes'

  constructor(private HttpClient: HttpClient ) {
  }
  getTaskCompletionRate(processId: string): Observable<number> {
    return this.HttpClient.get<number>(`${this.API_URLLL}/task-completion-rate/${processId}`);
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
//prcoess
// Get a specific Process by ID
getProcess(id: string): Observable<Process> {
  return this.HttpClient.get<Process>(`${this.API_URLLL}/${id}`);
}

// Get all Processes
getProcesses(): Observable<Process[]> {
  return this.HttpClient.get<Process[]>(this.API_URLLL);
}

// Create a new Process
createProcess(processPayload: Process): Observable<Process> {
  return this.HttpClient.post<Process>(this.API_URLLL, processPayload);
}

// Update an existing Process
updateProcess(id: string, processPayload: Process): Observable<Process> {
  return this.HttpClient.put<Process>(`${this.API_URLLL}/${id}`, processPayload);
}

// Delete a Process by ID
deleteProcess(id: string): Observable<void> {
  return this.HttpClient.delete<void>(`${this.API_URLLL}/${id}`);
}
 // Archive a Process
 addProcessToArchive(processId: string): Observable<any> {
  return this.HttpClient.post(`${this.API_URL}/manajero/archive/addProcessToArchive/${processId}`, null);
}

// Archive a Methode
addMethodeToArchive(methodeId: string): Observable<any> {
  return this.HttpClient.post(`${this.API_URL}/manajero/archive/addMethodeToArchive/${methodeId}`, null);
}

// Delete an Archive by ID
deleteFromArchive(idArchive: string): Observable<void> {
  return this.HttpClient.delete<void>(`${this.API_URL}/manajero/archive/deleteFromArchive/${idArchive}`);
}
// New method for getting all archives
getAllArchives(): Observable<Archive[]> {
  return this.HttpClient.get<Archive[]>(`${this.API_URL}/manajero/archive/getAllArchives`);
}

// Restore a Process from Archive
restoreProcessFromArchive(idArchive: string): Observable<void> {
  return this.HttpClient.post<void>(`${this.API_URL}/manajero/archive/restoreProcessFromArchive/${idArchive}`, null);
}

// Restore a Methode from Archive
restoreMethodeFromArchive(idArchive: string): Observable<void> {
  return this.HttpClient.post<void>(`${this.API_URL}/manajero/archive/restoreMethodeFromArchive/${idArchive}`, null);
}


}
