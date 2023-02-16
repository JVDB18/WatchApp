import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { SeasonsComponent } from './show-details/seasons/seasons.component';
import { EpisodesComponent } from './show-details/seasons/episodes/episodes.component';

@NgModule({
  declarations: [MovieDetailsComponent, ShowDetailsComponent, DetailsComponent, ActorDetailsComponent, SeasonsComponent, EpisodesComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailsRoutingModule,
    NgxPaginationModule
  ],
  exports: [ShowDetailsComponent, MovieDetailsComponent, DetailsRoutingModule, ActorDetailsComponent]
})
export class DetailsModule { }
