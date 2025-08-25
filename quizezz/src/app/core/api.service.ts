// *************** Angular Imports ***************
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// *************** Application Models and Settings Imports ***************
import { Quiz, ScoreEntry } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getQuiz() {
    return this.http.get<Quiz>('/api/quiz');
  }
  postScore(name: string, score: number) {
    return this.http.post<{ ok: boolean; top: ScoreEntry[] }>('/api/score', {
      name,
      score,
    });
  }
  getScoreboard() {
    return this.http.get<{ top: ScoreEntry[] }>('/api/scoreboard');
  }
}
