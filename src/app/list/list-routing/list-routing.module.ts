import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { ShowsListComponent } from '../shows-list/shows-list.component';

const routes: Routes = [
  { 
    path: '', component: ListComponent ,
  children: [
    {
   path: 'movies', component: MoviesListComponent
      },
    {
      path: 'shows', component: ShowsListComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
