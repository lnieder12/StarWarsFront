import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Game } from '../interfaces/game';
import { Round } from '../interfaces/round';
import { Score } from '../interfaces/scores';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public roundSubject = new Subject<Round[]>();
  private _apiUrl = 'https://localhost:7038/game'
  constructor(private http: HttpClient) { }

  createGame(rebels: number, empires: number, nbRound: number): Observable<Game> {
    const options = nbRound ? { params: new HttpParams().set('nbRound', nbRound) } : {};
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

  doFight(id: number): Observable<Round> {
    const url = `${this._apiUrl}/${id}/fight`;
    return this.http.get<Round>(url);
  }

  doMultipleFights(id: number, nbFights: number): Observable<Round[]> {
    const options = Number(nbFights) ? { params: new HttpParams().set('nb', nbFights) } : {};
    const url = `${this._apiUrl}/${id}/multipleFight`;
    return this.http.get<Round[]>(url, options);
  }

  getSoldierScore(id: number, idSoldier: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/soldier/${idSoldier}/score`;
    return this.http.get<number>(url);
  }

  getNbRounds(id: number): Observable<number> {
    const url = `${this._apiUrl}/${id}/round/nb`;
    return this.http.get<number>(url);
  }

  getScores(id: number): Observable<Score[]> {
    const url = `${this._apiUrl}/${id}/score`;
    return this.http.get<Score[]>(url);
  }

  enoughSoldiers(id: number): Observable<boolean> {
    const url = `${this._apiUrl}/${id}/enoughSoldiers`;
    return this.http.get<boolean>(url);
  }

  getWinningTeam(id: number) {
    const url = `${this._apiUrl}/${id}/winnerTeam`;
    return this.http.get(url, {responseType: 'text'});
  }

}
