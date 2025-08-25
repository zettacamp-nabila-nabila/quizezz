// *************** Angular Imports ***************
import { Injectable } from '@angular/core';

// *************** Third-Party Library Imports ***************
import { BehaviorSubject } from 'rxjs';

// *************** Application Models and Settings Imports ***************
import { FeedbackKind, Question, Quiz, Status } from './models';

export interface GameState {
  name: string;
  quiz: Quiz | null;
  index: number;
  score: number;
  status: Status;
  selectedId: string | null;
  feedback: FeedbackKind;
  scoreDelta: number;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private _state = new BehaviorSubject<GameState>({
    name: '',
    quiz: null,
    index: 0,
    score: 0,
    status: 'idle',
    selectedId: null,
    feedback: null,
    scoreDelta: 0,
  });

  readonly state$ = this._state.asObservable();
  get snapshot(): GameState {
    return this._state.getValue();
  }

  setName(name: string): void {
    this._state.next({ ...this.snapshot, name });
  }

  start(quiz: Quiz): void {
    this._state.next({
      name: this.snapshot.name,
      quiz,
      index: 0,
      score: 0,
      status: 'playing',
      selectedId: null,
      feedback: null,
      scoreDelta: 0,
    });
  }

  select(optionId: string): void {
    const q = this.currentQuestion;
    if (!q || this.snapshot.status !== 'playing' || this.snapshot.feedback)
      return;
    const opt = q.options.find((o) => o.id === optionId);
    const correct = !!opt?.correct;
    const delta = correct ? 1000 : 0;

    this._state.next({
      ...this.snapshot,
      selectedId: optionId,
      feedback: correct ? 'correct' : 'wrong',
      scoreDelta: delta,
      score: this.snapshot.score + delta,
    });

    setTimeout(() => this.next(), 1100);
  }

  get currentQuestion(): Question | null {
    return this.snapshot.quiz?.questions[this.snapshot.index] ?? null;
  }

  private next(): void {
    const s = this.snapshot;
    const last = !!s.quiz && s.index >= s.quiz!.questions.length - 1;
    if (last) this._state.next({ ...s, status: 'done' });
    else
      this._state.next({
        ...s,
        index: s.index + 1,
        selectedId: null,
        feedback: null,
        scoreDelta: 0,
      });
  }
}
