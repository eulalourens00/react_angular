import { Injectable } from '@angular/core';

export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

@Injectable({
    providedIn: 'root' 
})
export class TaskService {
    
    private tasks: Task[] = [
        { id: 1, title: "Выучить Angular", isCompleted: false },
        { id: 2, title: "Сделать домашку", isCompleted: true }
    ];

    public getTasks(): Task[] {
        return this.tasks;
    }

    public addTask(newTaskTitle: string): void {
        const newTask: Task = {
        id: Date.now(), 
        title: newTaskTitle,
        isCompleted: false
        };
        this.tasks = [...this.tasks, newTask];
    }
}