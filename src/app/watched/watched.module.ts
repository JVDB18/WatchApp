import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchedRoutingModule } from './watched-routing.module';
import { WatchedComponent } from './watched/watched.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';
import { WatchedShowsComponent } from './watched-shows/watched-shows.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WatchedComponent, WatchedMoviesComponent, WatchedShowsComponent],
  imports: [
    CommonModule,
    WatchedRoutingModule,
    SharedModule
  ],
  exports: [WatchedComponent, WatchedMoviesComponent, WatchedShowsComponent],
})
export class WatchedModule { }
