import { Component, OnInit, Input } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { Person } from 'src/app/person';
import { PaginaterService } from 'src/app/paginater.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() details : Movie
  @Input() related : Movie[]
  @Input() cast : Person[]
  @Input() isLoggedIn: boolean
  format: string = 'movie'
  rand: number
  formatTrakt: string = 'movies'
  pager: any = {}
  pagedCast: any[];

  constructor(private pagerService: PaginaterService) { 
      }
      
  ngOnInit() {
    this.getRandom(5)
    console.log(this.related)
    this.setPage(1)
  }
  ngOnChanges(): void {
    this.setPage(1)
  }
  getRandom(max){
    return this.rand =  Math.floor(Math.random() * Math.floor(max))
  }
  setPage(page: number){
      this.pager = this.pagerService.getPager(this.cast.length, page, 4);
      this.pagedCast= this.cast.slice(this.pager.startIndex, this.pager.endIndex +1)
      console.log(this.pagedCast)
   
  }
  
}
