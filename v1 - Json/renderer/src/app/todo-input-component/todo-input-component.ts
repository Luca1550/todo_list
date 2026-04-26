import { Component, output, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input-component',
  imports: [FormsModule],
  templateUrl: './todo-input-component.html',
  styleUrl: './todo-input-component.css',
})
export class TodoInputComponent {
  newTaskText : string = ""

  taskAdded = output<string>()

  // Récupérer la référence à l'élément input du DOM
  taskInputRef = viewChild<ElementRef<HTMLInputElement>>('taskInputRef');

  onAddTask(){
    const text = this.newTaskText.trim()

    if(text){
      this.taskAdded.emit(text)
      this.newTaskText = ""
      // Remettre le focus sur l'input pour taper rapidement la suite
      this.taskInputRef()?.nativeElement.focus();
    }
  }
}
