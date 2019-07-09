import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  currentPage: number  = 0
  traktMovies: string = 'movies'
  popularMovies 
  trendingMovies
  formatTrakt: string = 'movies'
  format: string = 'movie'
  totalPage: number 
  constructor(private traktService : TraktService) { }

  ngOnInit() {
    this.getPopularMovies();
    this.getTrendingMovies();
  }

fetchOnClickPopular(boolean: boolean){
  if (boolean === true && this.currentPage < this.totalPage)
  {
    this.currentPage += 1
    this.getPopularMovies();
    console.log(this.currentPage)
    console.log(this.totalPage)
  }
    else {
         if(boolean === false && this.totalPage > 0){
        this.currentPage -=1   
        this.getPopularMovies();
    console.log(this.currentPage)
    console.log(this.totalPage)
      }
      else {
        console.log('désactiver bouton')
        console.log(this.totalPage)
      }
    }
}
fetchOnClickTrending(boolean: boolean){
  if (boolean === true && this.currentPage < this.totalPage)
  {
    this.currentPage += 1
    this.getTrendingMovies();
    console.log(this.currentPage)
    console.log(this.totalPage)
  }
    else {
         if(boolean === false && this.totalPage > 0){
        this.currentPage -=1   
        this.getTrendingMovies();
    console.log(this.currentPage)
    console.log(this.totalPage)
      }
      else {
        console.log('désactiver bouton')
        console.log(this.totalPage)
      }
    }
}
  getPopularMovies(){
    this.traktService.getList(this.currentPage, 10, this.traktMovies, 'popular').subscribe(res => {
      this.popularMovies = res.body;
      this.currentPage= parseInt(res.headers.get('x-pagination-page'))
      this.totalPage = parseInt(res.headers.get('x-pagination-page-count'))
     
      })
  }
  getTrendingMovies(){
    this.traktService.getList(this.currentPage, 10, this.traktMovies, 'trending').subscribe(res => {
      this.trendingMovies = res.body;
      this.currentPage= parseInt(res.headers.get('x-pagination-page'))
      this.totalPage = parseInt(res.headers.get('x-pagination-page-count'))
      })
    }
}
