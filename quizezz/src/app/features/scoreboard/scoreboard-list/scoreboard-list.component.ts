// *************** Angular Imports ***************
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// *************** Application Models and Settings Imports ***************
import { ScoreEntry } from '../../../core/models';

@Component({
  selector: 'app-scoreboard-list',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./scoreboard-list.component.scss'],
  templateUrl: './scoreboard-list.component.html',
})
export class ScoreboardListComponent {
  // *************** DECORATOR VARIABLES ***************
  @Input({ required: true }) items!: ScoreEntry[];
}
