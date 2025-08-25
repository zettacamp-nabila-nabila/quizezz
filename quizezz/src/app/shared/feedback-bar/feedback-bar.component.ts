// *************** Angular Imports ***************
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-bar',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./feedback-bar.component.scss'],
  templateUrl: './feedback-bar.component.html',
})
export class FeedbackBarComponent {
  // *************** DECORATOR VARIABLES ***************
  @Input() kind: 'correct' | 'wrong' | null = null;
}
