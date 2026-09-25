import { Component, Input } from '@angular/core';
import { Task } from '../task';
  
@Component({
  selector: 'app-task-card',
  imports: [],
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  isGreen = false;

  toggleColor(): void {
    this.isGreen = !this.isGreen;
  }
}