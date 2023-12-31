import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Game } from '../interfaces/game';
import { Round } from '../interfaces/round';
import { Score } from '../interfaces/scores';
import { Soldier, sameSoldier } from '../interfaces/soldier';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public roundSubject = new Subject<Round[]>();

  public rebelsSubject = new BehaviorSubject<Soldier[]>([]);

  public empiresSubject = new BehaviorSubject<Soldier[]>([]);

  private _apiUrl = 'https://localhost:7038/game';
  constructor(private http: HttpClient) { }

  contains(soldier: Soldier): boolean {
    var bool: boolean = false;
    var list;
    if (soldier.soldierType === "Rebel") {
      list = this.rebelsSubject.getValue();
    }
    else {
      list = this.empiresSubject.getValue();
    }

    list.forEach(sld => {
      if (!bool)
        bool = sameSoldier(sld, soldier);
    });
    return bool;
  }

  modify(soldier: Soldier): void {
    var list;
    if (soldier.soldierType === "Rebel") {
      list = this.rebelsSubject.getValue();
    }
    else {
      list = this.empiresSubject.getValue();
    }

    list.map(sld => {
      if(sameSoldier(sld, soldier)) {
        sld.name = soldier.name;
        sld.attack = soldier.attack;
        sld.maxHealth = soldier.maxHealth;
      }
    });
  }

  addToRebels(rebel: Soldier): void {
    var list = this.rebelsSubject.getValue();
    list.push(rebel);
    this.rebelsSubject.next(list);
  }

  removeFromRebels(rebel: Soldier): void {
    var list = this.rebelsSubject.getValue();
    const index = list.indexOf(rebel);
    if (index > -1) {
      list.splice(index, 1);
      this.rebelsSubject.next(list);
    }
  }

  addToEmpires(empire: Soldier): void {
    var list = this.empiresSubject.getValue();
    list.push(empire);
    this.empiresSubject.next(list);
  }

  removeFromEmpires(empire: Soldier): void {
    var list = this.empiresSubject.getValue();
    const index = list.indexOf(empire);
    if (index > -1) {
      list.splice(index, 1);
      this.empiresSubject.next(list);
    }
  }

  createSelectedSoldiersGame(rebels: Soldier[], empires: Soldier[], nbRound: number): Observable<Game> {
    const options = nbRound ? { params: new HttpParams().set('nbRound', nbRound) } : {};
    const url = `${this._apiUrl}/selectedSoldiers`;
    const body = { rebels: rebels, empires: empires }
    return this.http.post<Game>(url, body, options);
  }

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

  getScoresPage(id: number, params: HttpParams): Observable<Score[]> {
    const options = params ? { params: params } : {};
    const url = `${this._apiUrl}/${id}/score/page`;
    return this.http.get<Score[]>(url, options);
  }

  getScoreCount(id: number, params: HttpParams): Observable<number> {
    const options = params ? { params: params } : {};
    const url = `${this._apiUrl}/${id}/score/page/count`;
    return this.http.get<number>(url, options);
  }

  getRoundsPage(id: number, params: HttpParams): Observable<Round[]> {
    const options = params ? { params: params } : {};
    const url = `${this._apiUrl}/${id}/round/page`;
    return this.http.get<Round[]>(url, options);
  }

  getRoundsCount(id: number, params: HttpParams): Observable<number> {
    const options = params ? { params: params } : {};
    const url = `${this._apiUrl}/${id}/round/page/count`;
    return this.http.get<number>(url, options);
  }

  enoughSoldiers(id: number): Observable<boolean> {
    const url = `${this._apiUrl}/${id}/enoughSoldiers`;
    return this.http.get<boolean>(url);
  }

  getWinningTeam(id: number) {
    const url = `${this._apiUrl}/${id}/winnerTeam`;
    return this.http.get(url, { responseType: 'text' });
  }

}
