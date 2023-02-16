import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthorizeComponent } from './components/nav-bar/authorize/authorize.component';
import { ListModule } from './list/list.module';
import { WatchedModule } from './watched/watched.module';
import { DetailsModule } from './details/details.module';
import { WatchlistModule } from './watchlist/watchlist.module';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'authorize', component: AuthorizeComponent},
  { path: 'list', loadChildren: ()=> import('./list/list.module').then(m => m.ListModule)},
  { path: 'watched', loadChildren:()=>import('./watched/watched.module').then(m=>m.WatchedModule) },
  { path: 'watchlist', loadChildren: ()=>import('./watchlist/watchlist.module').then(m=>m.WatchlistModule)},
  { path: 'details', loadChildren: ()=> import("./details/details.module").then(m=>m.DetailsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
