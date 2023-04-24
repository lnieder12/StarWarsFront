import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Soldier } from '../interfaces/soldier';

@Injectable({
  providedIn: 'root'
})
export class SoldiersService {

  private _apiUrl = 'https://localhost:7038/';
  private _soldierUrl = 'soldier';
  private _gameUrl = 'game';

  constructor(private http: HttpClient) { }

  getSoldiers(id: number): Observable<Soldier[]> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/${this._soldierUrl}`;
    return this.http.get<Soldier[]>(url);
  }

  getSoldier(id: number): Observable<Soldier> {
    return this.http.get<Soldier>(`${this._apiUrl + this._soldierUrl}/${id}`);
  }

  getRebels(id: number): Observable<Soldier[]> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/rebel`;
    return this.http.get<Soldier[]>(url);
  }

  getEmpires(id: number): Observable<Soldier[]> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/empire`;
    return this.http.get<Soldier[]>(url);
  }

  getNbValideRebels(id: number): Observable<number> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/rebel/valide`;
    return this.http.get<number>(url);
  }

  getNbValideEmpires(id: number): Observable<number> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/empire/valide`;
    return this.http.get<number>(url);
  }


}
