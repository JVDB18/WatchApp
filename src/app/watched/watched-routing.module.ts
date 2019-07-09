import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { WatchedComponent } from './watched/watched.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';
import { WatchedShowsComponent } from './watched-shows/watched-shows.component';
import { AuthGuard } from '../auth.guard'



const routes: Routes = [
{ path: '',
component: WatchedComponent,
canActivate: [AuthGuard],
children: [
    {
      path: 'movies',
      component: WatchedMoviesComponent,
   },
   {
     path: 'shows',
     component: WatchedShowsComponent
   }
]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class WatchedRoutingModule { }
