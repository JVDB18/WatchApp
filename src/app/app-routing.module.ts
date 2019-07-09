import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthorizeComponent } from './components/nav-bar/authorize/authorize.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'authorize', component: AuthorizeComponent},
  { path: 'list', loadChildren:'./list/list.module#ListModule'},
  { path: 'watched', loadChildren: './watched/watched.module#WatchedModule'},
  { path: 'details', loadChildren: './details/details.module#DetailsModule'},
  { path: 'watchlist', loadChildren: './watchlist/watchlist.module#WatchlistModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
