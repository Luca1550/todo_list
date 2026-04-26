import { Component, input, output } from '@angular/core';

export interface Task{
  id : number
  text : string
  completed : boolean
}

@Component({
  selector: 'app-todo-list-component',
  imports: [],
  templateUrl: './todo-list-component.html',
  styleUrl: './todo-list-component.css',
})
export class TodoListComponent {
  // chopper le tablea Task du parent
  tasks = input<Task[]>([])

  // output de l'ID de task vers le parent
  taskDeleted = output<number>()

  // output de l'objet Task vers le parent
  taskUpdated = output<Task>()

  onDelete(taskId : number){
    this.taskDeleted.emit(taskId)
  }

  // cochée ou pas
  onToggleComplete (task : Task, event : Event){
    //recupérer la valeur de la case a cocher
    const isChecked = (event.target as HTMLInputElement).checked

    // créer une copie avec le nouvel état
    const updatedTask = { ...task, completed: isChecked };

    // envoi vers le parent 
    this.taskUpdated.emit(updatedTask)
  }

  
}
