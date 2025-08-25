// *************** Angular Imports ***************
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-strip',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./score-strip.component.scss'],
  templateUrl: './score-strip.component.html',
})
export class ScoreStripComponent {
  // *************** DECORATOR VARIABLES ***************
  @Input({ required: true }) name!: string;
  @Input({ required: true }) score!: number;
}
