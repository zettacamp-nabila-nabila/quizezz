// *************** Angular Imports ***************
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// *************** Third-Party Library Imports ***************
import { catchError, of } from 'rxjs';

// *************** Application Services Imports ***************
import { ApiService } from '../../../core/api.service';
import { GameService } from '../../../core/game.service';

// *************** Application Modules & Component Imports ***************
import { ScoreboardListComponent } from '../scoreboard-list/scoreboard-list.component';

// *************** Application Models and Settings Imports ***************
import { ScoreEntry } from '../../../core/models';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, ScoreboardListComponent],
  styleUrls: ['./scoreboard.component.scss'],
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {
  // *************** PUBLIC STATE VARIABLES ***************
  topEntries: ScoreEntry[] = [];

  constructor(
    private apiService: ApiService,
    private gameService: GameService
  ) {}

  // *************** LIFECYCLE HOOKS ***************
  /**
   * Initializes the view by loading the scoreboard entries.
   */
  ngOnInit(): void {
    this.loadScoreboardEntries();
  }

  // *************** INIT / LOAD DATA ***************
  /**
   * Loads top scoreboard entries from the server.
   * If the request fails, it falls back to a single local entry
   * built from the last game snapshot.
   */
  private loadScoreboardEntries(): void {
    this.apiService
      .getScoreboard()
      .pipe(
        catchError(() => {
          const snapshot = this.gameService.snapshot;
          const fallback = snapshot.score
            ? [
                {
                  name: snapshot.name || 'Player',
                  score: snapshot.score,
                  when: Date.now(),
                },
              ]
            : [];
          return of({ top: fallback });
        })
      )
      .subscribe((response) => {
        this.topEntries = response.top || [];
      });
  }
}
