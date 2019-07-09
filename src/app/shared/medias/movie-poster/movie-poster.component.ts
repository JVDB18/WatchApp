import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Tmdb } from 'src/app/poster';
import { TmdbService } from 'src/app/tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.css']
})
export class MoviePosterComponent implements OnInit, OnDestroy {
path
noPath: boolean = false
posterImageUrl: string
subscription: Subscription = new Subscription();

@Input() id: number
@Input() format: string

  constructor(private tmdbService : TmdbService) { }

  ngOnInit() {
    this.getPoster();

}
ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.getPoster();
}
ngOnDestroy(){
  this.subscription.unsubscribe();
  this.tmdbService.isLoading.next(true);
}
getPoster(){
  this.subscription = this.tmdbService.getConfig();
  this.tmdbService.getMoviePoster(this.format,this.id).subscribe(res =>{
    this.path = res;
    
    if(this.path.poster_path === undefined || this.path.poster_path === null){
      this.noPath = true
    } else {
      this.posterImageUrl = `${this.tmdbService.config.images.base_url}w200${this.path.poster_path}`
      this.noPath = false
    }

})
}

}
