// *************** Angular Imports ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { Subscription, catchError, finalize, of } from 'rxjs';

// *************** Application Services Imports ***************
import { ApiService } from '../../core/api.service';
import { GameService } from '../../core/game.service';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./done.component.scss'],
  templateUrl: './done.component.html',
})
export class DoneComponent implements OnInit, OnDestroy {
  // *************** PRIVATE VARIABLES ***************
    private sub?: Subscription;

  // *************** PUBLIC STATE VARIABLES ***************
    score = 0;
    name = '';

  /**
   * Displays the "All Done" screen.
   * Reads the final state from `GameService`, posts the score to the server,
   * and then redirects to `/scoreboard`. If the game state is invalid, it navigates home.
   */
  constructor(
    private api: ApiService,
    private game: GameService,
    private router: Router
  ) {}

  // *************** LIFECYCLE HOOKS ***************
  /**
   * Initializes the view:
   * - Validates that the game is finished.
   * - Reads `name` and `score` from `GameService`.
   * - Posts the score; after completion (success or error), navigates to `/scoreboard`.
   */
  ngOnInit(): void {
    const s = this.game.snapshot;
    if (s.status !== 'done') {
      this.router.navigateByUrl('/');
      return;
    }

    this.name = s.name || 'Player';
    this.score = s.score;

    this.sub = this.api
      .postScore(this.name, this.score)
      .pipe(
        catchError(() => of(null)),
        finalize(() =>
          setTimeout(() => this.router.navigateByUrl('/scoreboard'), 1200)
        )
      )
      .subscribe();
  }

  /**
   * Cleans up the pending subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
