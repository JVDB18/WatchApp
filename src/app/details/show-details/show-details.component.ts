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



  constructor(private pagerService: PaginaterService) { }

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
  }
