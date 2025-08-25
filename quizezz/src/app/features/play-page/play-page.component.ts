// *************** Angular Imports ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { Subscription } from 'rxjs';

// *************** Application Services Imports ***************
import { GameService } from '../../core/game.service';

// *************** Application Models and Settings Imports ***************
import { Question } from '../../core/models';

// *************** Application Modules & Component Imports ***************
import { ScoreStripComponent } from '../../shared/score-strip/score-strip.component';
import { FeedbackBarComponent } from '../../shared/feedback-bar/feedback-bar.component';
import { QuestionCardComponent } from '../question-card/question-card/question-card.component';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [
    CommonModule,
    ScoreStripComponent,
    FeedbackBarComponent,
    QuestionCardComponent,
  ],
  styleUrls: ['./play-page.component.scss'],
  templateUrl: './play-page.component.html',
})
export class PlayPageComponent implements OnInit, OnDestroy {
  // *************** PRIVATE VARIABLES ***************
  private sub?: Subscription;

  // *************** PUBLIC STATE VARIABLES ***************
  playerName: string = '';
  score: number = 0;
  question: Question | null = null;    
  selectedIdentifier: string | null = null;
  feedback: 'correct' | 'wrong' | null = null;
  isLocked: boolean = false;
  scoreChange: number = 0;

  constructor(private game: GameService, private router: Router) {}

  // *************** LIFECYCLE HOOKS ***************
  /**
   * Subscribes to the game state stream and reflects changes in the view.
   * Redirects to home when idle, and to the done page when finished.
   */
  ngOnInit(): void {
    this.sub = this.game.state$.subscribe((state) => {
      if (state.status === 'idle') {
        this.router.navigateByUrl('/');
        return;
      }
      if (state.status === 'done') {
        this.router.navigateByUrl('/done');
        return;
      }
      this.playerName = state.name;
      this.score = state.score;
      this.selectedIdentifier = state.selectedId; 
      this.feedback = state.feedback;
      this.scoreChange = state.scoreDelta;
      this.isLocked = !!state.feedback;
      this.question = this.game.currentQuestion;
    });
  }

  // *************** ACTION HANDLERS ***************
  /**
   * Handles option selection from the question card.
   * @param optionIdentifier The chosen option identifier.
   */
  onChooseOption(optionIdentifier: string): void {
    this.game.select(optionIdentifier);
  }

  // *************** SETTERS & GETTERS ***************
  /**
   * Returns a user-friendly label for the current progress (e.g., "1/5").
   */
  get progressLabel(): string {
    const snapshot = this.game.snapshot;
    const total = snapshot.quiz?.questions.length ?? 0;
    return total ? `${snapshot.index + 1}/${total}` : '';
  }

  // *************** LIFECYCLE HOOKS ***************
  /** Cleans up subscriptions to prevent memory leaks. */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
