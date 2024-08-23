import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedProcessIdSource = new BehaviorSubject<string | null>(null);
  selectedProcessId$ = this.selectedProcessIdSource.asObservable();

  setSelectedProcessId(id: string) {
    this.selectedProcessIdSource.next(id);
  }
}
