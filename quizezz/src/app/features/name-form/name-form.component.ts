// *************** Angular Imports ***************
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./name-form.component.scss'],
  templateUrl: './name-form.component.html',
})
export class NameFormComponent {
  // *************** PUBLIC STATE VARIABLES ***************
  playerName: string = '';

  // *************** DECORATOR VARIABLES ***************
  @Output() join = new EventEmitter<string>();

  // *************** ACTION HANDLERS ***************
  /**
   * Trims the input and emits `join` only when the name is not empty.
   */
  onSubmit(): void {
    const trimmedName = this.playerName.trim();
    if (trimmedName) {
      this.join.emit(trimmedName);
    }
  }
}
