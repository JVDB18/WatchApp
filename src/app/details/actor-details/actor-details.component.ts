import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/tmdb.service';
import { Movie } from 'src/app/movies';
import { Show } from 'src/app/show';
import { Person } from 'src/app/person';
import { Observable } from 'rxjs';
import { PaginaterService } from 'src/app/paginater.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  constructor(private traktService : TraktService, private route : ActivatedRoute, private tmdbService: TmdbService, private pagerService: PaginaterService) { }
actor 
pager: any = {}
pagedShows: any[];
pagedMovies: any[];
slug = this.route.snapshot.params.slug
format= 'person'
showTmdbFormat: string = "tv"
showFormatTrakt : string = "shows"
movieTmdbFormat: string = "movie"
movieFormatTrakt: string = "movies"
taggedImg 
backdropUrl: string
rand: number
allMovies 
allShows 

  ngOnInit() {
    this.getActorById();
    this.getMoviesByActor();
    this.getShowsByActor();
  }
  setPage(page: number, bool: boolean){
    if(bool === false){
      this.pager = this.pagerService.getPager(this.allMovies.cast.length, page, 6);
      this.pagedMovies= this.allMovies.cast.slice(this.pager.startIndex, this.pager.endIndex +1)
      console.log(this.pagedMovies)
    }
    else if(bool = true) {
      this.pager = this.pagerService.getPager(this.allShows.cast.length, page, 6);
      this.pagedShows= this.allShows.cast.slice(this.pager.startIndex, this.pager.endIndex +1)
      console.log(this.pagedShows)

    }
  }
  getActorById(){
    this.traktService.getActorById(`${this.slug}?extended=full`).subscribe(res => {this.actor = res.body
    console.log(this.actor)
    this.tmdbService.getTaggetImg(this.actor.ids.tmdb).subscribe(res => {
      this.taggedImg = res
      console.log(this.taggedImg)
      this.rand =  Math.floor(Math.random() * Math.floor(this.taggedImg.results.length))
      this.backdropUrl = `${this.tmdbService.config.images.base_url}original${this.taggedImg.results[this.rand].file_path}`})
  })
  }
  getMoviesByActor(){
    this.traktService.getActorById(`${this.slug}/movies?extended=full`).subscribe(
      res => {
        this.allMovies = res.body
        console.log(this.allMovies)
        this.setPage(1, false)
        console.log(this.pagedMovies)
      }
    )
  }
  getShowsByActor(){
    this.traktService.getActorById(`${this.slug}/shows?extended=full`).subscribe(
      res => {
        this.allShows = res.body
        console.log(this.allShows)
        this.setPage(1, true)
        console.log(this.pagedShows)
      }
    )
  }

}
