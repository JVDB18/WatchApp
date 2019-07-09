import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/show';
import { TraktService } from 'src/app/trakt.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent implements OnInit {
  popularShows
  trendingShows
  currentPage: number = 1
  formatTrakt: string = 'shows'
  format: string = 'tv'
  totalPage: number 

  constructor(private traktService : TraktService) { }

  ngOnInit() {
    this.getPopularShows();
    this.getTrendingShows();
  }
  fetchOnClickPopular(boolean: boolean){
    if (boolean === true && this.currentPage < this.totalPage)
    {
      this.currentPage += 1
      this.getPopularShows();
      console.log(this.currentPage)
      console.log(this.totalPage)
    }
      else {
           if(boolean === false && this.totalPage > 0){
          this.currentPage -=1   
          this.getPopularShows();
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
      this.getTrendingShows();
      console.log(this.currentPage)
      console.log(this.totalPage)
    }
      else {
           if(boolean === false && this.totalPage > 0){
          this.currentPage -=1   
          this.getTrendingShows();
      console.log(this.currentPage)
      console.log(this.totalPage)
        }
        else {
          console.log('désactiver bouton')
          console.log(this.totalPage)
        }
      }
  }
  getPopularShows(){
    this.traktService.getList(this.currentPage, 10, this.formatTrakt, 'popular').subscribe(res => {
      console.log(res.headers.get('x-pagination-page'));
      this.popularShows = res.body
      this.currentPage= parseInt(res.headers.get('x-pagination-page'))
      this.totalPage = parseInt(res.headers.get('x-pagination-page-count'))
      console.log(this.popularShows)})
  }
  getTrendingShows(){
    this.traktService.getList(this.currentPage, 10,this.formatTrakt, 'trending').subscribe(res => {
      this.trendingShows = res.body
      this.currentPage= parseInt(res.headers.get('x-pagination-page'))
      this.totalPage = parseInt(res.headers.get('x-pagination-page-count'))
      console.log(this.trendingShows)})
  }
}
