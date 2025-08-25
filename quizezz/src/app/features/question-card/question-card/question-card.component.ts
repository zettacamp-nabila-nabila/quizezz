// *************** Angular Imports ***************
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// *************** Application Models and Settings Imports ***************
import { Option, Question } from '../../../core/models';

// *************** Application Modules & Component Imports ***************
import { OptionButtonComponent } from '../../../shared/option-button/option-button.component';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, OptionButtonComponent],
  styleUrls: ['./question-card.component.scss'],
  templateUrl: './question-card.component.html',
})
export class QuestionCardComponent {
  // *************** DECORATOR VARIABLES ***************
  @Input({ required: true }) question!: Question;
  @Input() selectedIdentifier: string | null = null;
  @Input() feedback: 'correct' | 'wrong' | null = null;
  @Input() isLocked: boolean = false;
  @Input() scoreChange: number = 0;
  @Output() choose = new EventEmitter<string>();

  // *************** UTILITY METHODS ***************
  /**
   * Derives the visual state for a given option based on selection and feedback.
   */
  getOptionState(option: Option): 'idle' | 'correct' | 'wrong' {
    if (!this.isLocked || !this.selectedIdentifier) return 'idle';
    if (this.selectedIdentifier === option.id && this.feedback === 'correct')
      return 'correct';
    if (this.selectedIdentifier === option.id && this.feedback === 'wrong')
      return 'wrong';
    return 'idle';
  }

  /**
   * Returns a BEM modifier class to color the option tile (A/B/C/D pattern).
   */
  optionVariantClass(index: number): string {
    const variants = [
      'question-card__option--a',
      'question-card__option--b',
      'question-card__option--c',
      'question-card__option--d',
    ];
    return variants[index % 4];
  }
}
