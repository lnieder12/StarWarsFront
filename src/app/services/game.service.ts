import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Game } from '../interfaces/game';
import { Round } from '../interfaces/round';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _apiUrl = 'https://localhost:7038/'
  private _gameUrl = 'game'

  constructor(private http: HttpClient) { }

  createGame(rebels: number, empires: number): Observable<Game> {
    const url = `${this._apiUrl + this._gameUrl}/${rebels}/${empires}`
    return this.http.post<Game>(url, {});
  }

  getGame(id: number): Observable<Game> {
    const url = `${this._apiUrl + this._gameUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  getRounds(id: number): Observable<Round[]> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/round`
    return this.http.get<Round[]>(url);
      
  }

  getFight(id: number, idSoldier: number): Observable<Round> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/soldier/${idSoldier}/attack`;
    return this.http.post<Round>(url, []);
  }

  getSoldierDamage(id: number, idSoldier: number): Observable<number> {
    const url = `${this._apiUrl + this._gameUrl}/${id}/soldier/${idSoldier}/damage`;
    return this.http.get<number>(url);
  }

}
