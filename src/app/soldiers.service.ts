import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Soldier } from './soldier';

@Injectable({
  providedIn: 'root'
})
export class SoldiersService {

  private _apiUrl = 'https://localhost:7038/'
  private _soldierUrl = 'soldier'

  constructor(private http: HttpClient) { }

  getSoldiers(): Observable<Soldier[]> {
    return this.http.get<Soldier[]>(`${this._apiUrl + this._soldierUrl}`);
  }

  getSoldier(id: number): Observable<Soldier> {
    return this.http.get<Soldier>(`${this._apiUrl + this._soldierUrl}/${id}`);
  }

}
