import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistPage } from './todolist.page';
const routes: Routes = [
  {
    path: '',
    component: TodolistPage,
    children: [
      {
        path: 'todo',
        children: [
          {
            path: '',
            loadChildren: () => import('../todo/todo.module').then( m => m.TodoPageModule)
          }
        ]
      },
      {
        path: 'done',
        children: [
          {
            path: '',
            loadChildren: () => import('../done/done.module').then( m => m.DonePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/todolist/todo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/todolist/todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistPageRoutingModule {}
