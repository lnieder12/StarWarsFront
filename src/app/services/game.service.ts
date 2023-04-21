import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Game } from '../interfaces/game';
import { Round } from '../interfaces/round';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _apiUrl = 'https://localhost:7038/game'

  constructor(private http: HttpClient) { }

  createGame(rebels: number, empires: number, nbRound: number): Observable<Game> {
    const options = { params: new HttpParams().set('nbRound', nbRound) };
    const url = `${this._apiUrl}/${rebels}/${empires}`;
    return this.http.post<Game>(url, {}, options);
  }

  getAll(): Observable<Game[]> {
    const url = `${this._apiUrl}`;
    return this.http.get<Game[]>(url);
  }

  getGame(id: number): Observable<Game> {
    const url = `${this._apiUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  getRounds(id: number): Observable<Round[]> {
    const url = `${this._apiUrl}/${id}/round`
    return this.http.get<Round[]>(url);
  }

  getFight(id: number): Observable<Round> {
    const url = `${this._apiUrl}/${id}/fight`;
    return this.http.get<Round>(url);
  }

  doMultipleFights(id: number, nbFights: number): Observable<boolean> {
    const options = nbFights ? { params: new HttpParams().set('nb', nbFights) } : {};
    const url = `${this._apiUrl}/${id}/multipleFight`;
    return this.http.get<boolean>(url, options);
  }

  getSoldierScore(id: number, idSoldier: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/soldier/${idSoldier}/score`;
    return this.http.get<number>(url);
  }

  getNbRounds(id: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/round/nb`;
    return this.http.get<number>(url);
  }

  getNbValideRebels(id: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/rebel/valide`;
    return this.http.get<number>(url);
  }

  getNbValideEmpires(id: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/empire/valide`;
    return this.http.get<number>(url);
  }

  enoughSoldiers(id: number): Observable<boolean> {
    const url = `${this._apiUrl}/${id}/enoughSoldiers`;
    return this.http.get<boolean>(url);
  }

  getWinnerTeam(id: number) {
    const url = `${this._apiUrl}/${id}/winnerTeam`;
    return this.http.get(url, {responseType: 'text'});
  }

}
