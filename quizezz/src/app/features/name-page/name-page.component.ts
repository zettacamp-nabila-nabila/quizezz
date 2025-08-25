// *************** Angular Imports ***************
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { catchError, of, timeout } from 'rxjs';

// *************** Application Services Imports ***************
import { ApiService } from '../../core/api.service';
import { GameService } from '../../core/game.service';

// *************** Application Modules & Component Imports ***************
import { NameFormComponent } from '../name-form/name-form.component';

// *************** Application Models and Settings Imports ***************
import { Quiz } from '../../core/models';

// *************** Local static fallback data
const FALLBACK_QUIZ: Quiz = {
  id: 'edh-mini',
  title: 'EDH Mini Quiz',
  settings: { timePerQuestion: 15 },
  questions: [
    {
      id: 'q1',
      text: 'Among the following propositions, which one best describes the objective of EDH?',
      options: [
        { id: 'o1', text: 'A marketing platform for promoting schools.', correct: false },
        { id: 'o2', text: 'A school management tool for schools in the EDH group.', correct: true },
        { id: 'o3', text: 'A website for finding work after studies.', correct: false },
        { id: 'o4', text: 'A virtual library for students.', correct: false },
      ],
    },
    {
      id: 'q2',
      text: 'Who primarily uses the EDH Staging version?',
      options: [
        { id: 'o1', text: 'The QA testing team', correct: true },
        { id: 'o2', text: 'Parents only', correct: false },
        { id: 'o3', text: 'Alumni only', correct: false },
        { id: 'o4', text: 'Vendors', correct: false },
      ],
    },
    {
      id: 'q3',
      text: '2 + 2 = ?',
      options: [
        { id: 'o1', text: '3', correct: false },
        { id: 'o2', text: '4', correct: true },
        { id: 'o3', text: '5', correct: false },
        { id: 'o4', text: '22', correct: false },
      ],
    },
  ],
};

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [CommonModule, NameFormComponent],
  styleUrls: ['./name-page.component.scss'],
  templateUrl: './name-page.component.html',
})
export class NamePageComponent {
  constructor(private api: ApiService, private game: GameService, private router: Router) {}

  // *************** ACTION HANDLERS ***************
  /**
   * Handles the Join action:
   * - stores the player name,
   * - fetches quiz data from the server (with a small timeout),
   * - falls back to local data in development if the API is unreachable,
   * - starts the game and navigates to `/play`.
   * @param playerName The name entered by the player.
   */
  onJoin(name: string): void {
    this.game.setName(name);

    this.api
      .getQuiz()
      .pipe(
        timeout(1500),                     
        catchError(() => of(FALLBACK_QUIZ))
      )
      .subscribe((quiz) => {
        this.game.start(quiz);
        this.router.navigateByUrl('/play');
      });
  }
}
