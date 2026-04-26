import { Routes } from '@angular/router';
import { TodoPage } from './todo-page/todo-page';

export const routes: Routes = [
  { path: 'todo', component: TodoPage },
  { path: '', redirectTo: '/todo', pathMatch: 'full' }
];