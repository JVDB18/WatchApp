import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ShowsWatchlistComponent } from './shows-watchlist/shows-watchlist.component';
import { MoviesWatchlistComponent } from './movies-watchlist/movies-watchlist.component';
import { SharedModule } from '../shared/shared.module';
import { WatchListRoutingModuleModule } from './watch-list-routing-module/watch-list-routing-module.module';


@NgModule({
  declarations: [WatchlistComponent, ShowsWatchlistComponent, MoviesWatchlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    WatchListRoutingModuleModule
  ],
  exports: [WatchlistComponent, ShowsWatchlistComponent, MoviesWatchlistComponent]
})
export class WatchlistModule { }
