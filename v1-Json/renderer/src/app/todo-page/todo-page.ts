import { Component, OnInit, signal } from '@angular/core';
import { TodoInputComponent } from '../todo-input-component/todo-input-component';
import { TodoListComponent, Task } from '../todo-list-component/todo-list-component';

declare global {
  interface Window {
    todoService: {
      getAll: () => Promise<Task[]>;
      add: (text: string) => Promise<Task>;
      update: (id: number, completed: boolean) => Promise<boolean>;
      delete: (id: number) => Promise<boolean>;
    };
  }
}

@Component({
  selector: 'app-todo-page',
  imports: [TodoInputComponent, TodoListComponent],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage implements OnInit {
  title = signal('Ma To-Do List');
  tasks = signal<Task[]>([]);

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    try {
      const savedTasks = await window.todoService.getAll();
      this.tasks.set(savedTasks);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
  }

  async onTaskAdded(text: string) {
    try {
      const newTask = await window.todoService.add(text);
      this.tasks.update(currentTasks => [...currentTasks, newTask]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  }

  async onTaskUpdated(updatedTask: Task) {
    try {
      const success = await window.todoService.update(updatedTask.id, updatedTask.completed);
      if (success) {
        this.tasks.update(currentTasks => 
          currentTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  }

  async onTaskDeleted(taskId: number) {
    try {
      const success = await window.todoService.delete(taskId);
      if (success) {
        this.tasks.update(currentTasks => 
          currentTasks.filter(task => task.id !== taskId)
        );
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  }
}