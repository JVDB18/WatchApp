import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MoviePosterComponent } from './medias/movie-poster/movie-poster.component';
import { BackDropComponent } from './medias/back-drop/back-drop.component';
import { TrailerComponent } from './medias/trailer/trailer.component';
import { ActorPosterComponent } from './medias/actor-poster/actor-poster.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ActorCardComponent } from './card/actor-card/actor-card.component';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  declarations: [CardComponent, MoviePosterComponent, BackDropComponent, TrailerComponent, ActorPosterComponent, ActorCardComponent, AddButtonComponent, ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
  ],
  exports: [CardComponent, MoviePosterComponent, BackDropComponent, TrailerComponent, ActorPosterComponent, ActorCardComponent, AddButtonComponent]
})
export class SharedModule { }
