import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { WatchlistComponent } from '../watchlist/watchlist.component';
import { MoviesWatchlistComponent } from '../movies-watchlist/movies-watchlist.component';
import { ShowsWatchlistComponent } from '../shows-watchlist/shows-watchlist.component';
import { AuthGuard} from 'src/app/auth.guard';



const routes: Routes = [
{ path: '',
component: WatchlistComponent,
canActivate: [AuthGuard],
children: [
    {
      path: 'movies',
      component: MoviesWatchlistComponent,
   },
   {
     path: 'shows',
     component: ShowsWatchlistComponent
   }
]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ], providers: [
    AuthGuard
  ]
})
export class WatchListRoutingModuleModule { }
