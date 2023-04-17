import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _apiUrl = 'https://localhost:7038/'
  private _gameUrl = 'game'

  constructor(private http: HttpClient) { }

  createGame(rebels: number, empires: number): boolean {
    const url = `${this._apiUrl + this._gameUrl}?rebels=${rebels}&empires=${empires}`
    return this.http.post<boolean>(url, );
  }

}
