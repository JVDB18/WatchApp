import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Tmdb } from 'src/app/poster';
import { TmdbService } from 'src/app/tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actor-poster',
  templateUrl: './actor-poster.component.html',
  styleUrls: ['./actor-poster.component.css']
})
export class ActorPosterComponent implements OnInit, OnDestroy {
  path
  posterImageUrl: string
  backdropUrl: string
  noPath: boolean = false
  subscription: Subscription = new Subscription();
  @Input() id: number
  @Input() format: string
  
    constructor(private tmdbService : TmdbService) { }
  
  ngOnInit() {

   this.getPoster(); 
   
  }
  ngOnChanges(): void {

    this.getPoster();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.tmdbService.isLoading.next(true);
  }

  getPoster(){
    this.tmdbService.getConfig();
    this.subscription = this.tmdbService.getTmdbMovieData(this.format,this.id).subscribe(res =>{
      this.path = res;
      
  if(this.path.profile_path === undefined || this.path.profile_path === null){
    this.noPath = true
  } else {
    this.posterImageUrl = `${this.tmdbService.config.images.base_url}w200${this.path.profile_path}`
    this.noPath = false
  }
  })
  }
  
  }
