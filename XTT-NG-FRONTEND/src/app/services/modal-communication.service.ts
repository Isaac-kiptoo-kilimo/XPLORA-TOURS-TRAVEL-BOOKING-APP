import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalCommunicationService {
  

  private tourAddedSubject = new Subject<void>();
  constructor(){}

  tourAdded$ = this.tourAddedSubject.asObservable();

  notifyTourAdded() {
    this.tourAddedSubject.next();
}
}
