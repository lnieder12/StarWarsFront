import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private _apiUrl = 'https://localhost:7038/';
  private _roundUrl = 'round';

  constructor(private http: HttpClient) { }

  getRound(id: number): Observable<Round> {
    const url = `${this._apiUrl + this._roundUrl}/${id}`;
    return this.http.get<Round>(url);
  }

}
