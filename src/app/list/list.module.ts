import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsListComponent } from './shows-list/shows-list.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing/list-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ ShowsListComponent, MoviesListComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ],
  exports: [
    ShowsListComponent, MoviesListComponent, ListComponent
  ] 
})
export class ListModule { }
