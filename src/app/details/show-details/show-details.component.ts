import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Router } from '@angular/router';
import { Show } from 'src/app/show';
import { Person } from 'src/app/person';
import { NzNotificationService } from 'ng-zorro-antd';
import { PaginaterService } from 'src/app/paginater.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit, OnChanges {
isOneSeason: boolean
format: string = 'tv'
formatTrakt: string = "shows"
traktPeople: string = 'people'
rand: number
allpeople : Person
@Input() details: Show
@Input() related: Show
@Input() cast 
selectedCast = [];
person: string = 'person'
currentPage: number = 1
current: number = 1
@Input() seasons
@Input() isLoggedIn: boolean
pager: any = {}
pagedCast: any[];



  constructor(private traktService: TraktService, private notification: NzNotificationService, private pagerService: PaginaterService) { }

  ngOnInit() {
    this.getRandom(5)  
    console.log(this.details)
    console.log(this.seasons)
    console.log(this.cast)
    if(this.seasons[0].number === 1 && this.seasons.length === 1){
      this.isOneSeason = true
      console.log(this.isOneSeason)
      this.setPage(1)
    }
    else{
      this.isOneSeason = false
      this.setPage(1)
    }
  }  
  ngOnChanges(){
    this.setPage(1)
  }
  setPage(page: number){
      this.pager = this.pagerService.getPager(this.cast.length, page, 4);
      this.pagedCast= this.cast.slice(this.pager.startIndex, this.pager.endIndex +1)
      console.log(this.pagedCast)
   
  }

  getRandom(max){
    return this.rand =  Math.floor(Math.random() * Math.floor(max))
  }
  
  addWatchlist(){
    let body: Show[] | {} ={
      "shows": [
        {"title" : `${this.details.title}`,
          "year": `${this.details.year}`,
          "ids": {
          "trakt": `${this.details.ids.trakt}`,
          "slug": `${this.details.ids.slug}`,
          "imdb": `${this.details.ids.imdb}`,
          "tmdb": `${this.details.ids}`  
          }}
      ]
    }
    this.traktService.addToList('watchlist', body).subscribe(res => console.log(res))
    this.notification.blank(
      'Succesfully added',
      'You have added 1 item to your Watchlist',{
        nzStyle: {
          width: '600px',
          marginLeft: '-265px',
          backgroundColor: '#000000ad'
        },
        nzClass: 'test-class'
      })
    console.log(body)
  }
  addHistoryList(){
    let body: Show[] | {} ={
      "shows": [
        {"title" : `${this.details.title}`,
          "year": `${this.details.year}`,
          "ids": {
          "trakt": `${this.details.ids.trakt}`,
          "slug": `${this.details.ids.slug}`,
          "imdb": `${this.details.ids.imdb}`,
          "tmdb": `${this.details.ids}`  
          }}
      ]
    }
  
    this.traktService.addToList('history', body).subscribe(res => console.log(res))
    this.notification.blank(
      'Succesfully added',
      'You have added 1 item to your Watched List',{
        nzStyle: {
          width: '600px',
          marginLeft: '-265px',
          backgroundColor: '#000000ad'
        },
        nzClass: 'test-class'
      })
  }
  }
