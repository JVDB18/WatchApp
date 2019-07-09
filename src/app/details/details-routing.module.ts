import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DetailsResolveService } from './details-resolve.service';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { SeasonsComponent } from './show-details/seasons/seasons.component';
import { EpisodesComponent } from './show-details/seasons/episodes/episodes.component';

const routes: Routes = [
  { path: ':formattrakt/:slug', component: DetailsComponent,
  resolve: {
    details: DetailsResolveService
  },
children: [
  { 
    path: 'season/:number/:id/:trakt', component: SeasonsComponent,
    children: [
      {
        path: 'episode/:episodenumber', component: EpisodesComponent,
      }
    ]
  }
]},
  {
    path: 'actor/:formattrakt/:slug', component: ActorDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
