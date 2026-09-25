import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from './task-card/task-card';
import {TaskService, Task} from './task';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, TaskCard, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit{
  protected readonly title = signal('тупая ошибка');
  public tasks: Task[]=[];
  public showPicture = false;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  public createNewTask(title: string):void{
    if(title.trim()){
      this.taskService.addTask(title);
      this.tasks = this.taskService.getTasks();
      this.showPicture = true;
    }
  }

  public trackById(index: number, task: Task): number {
    return task.id;
  }
}