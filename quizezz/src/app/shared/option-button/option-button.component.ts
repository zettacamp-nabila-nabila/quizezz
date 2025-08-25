// *************** Angular Imports ***************
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./option-button.component.scss'],
  templateUrl: './option-button.component.html',
})
export class OptionButtonComponent {
  // *************** DECORATOR VARIABLES ***************
  @Input({ required: true }) optionIdentifier!: string;
  @Input() state: 'idle' | 'correct' | 'wrong' = 'idle';
  @Input() disabled: boolean = false;
  @Input() scoreDelta: number = 0;
  @Output() choose = new EventEmitter<string>();

  // *************** ACTION HANDLERS ***************
  /** Emits the choose event unless disabled. */
  onChoose(): void {
    if (this.disabled) return;
    this.choose.emit(this.optionIdentifier);
  }
}
