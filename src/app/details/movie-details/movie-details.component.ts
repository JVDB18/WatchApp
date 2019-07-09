import { Component, OnInit, Input } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { Person } from 'src/app/person';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() details : Movie
  @Input() related : Movie[]
  @Input() cast : Person
  @Input() isLoggedIn: boolean
  format: string = 'movie'
  rand: number
  allpeople
  formatTrakt: string = 'movies'

  constructor(private traktService : TraktService, private notification: NzNotificationService) { 
      }
      
  ngOnInit() {
    this.getRandom(5)
    console.log(this.related)
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getRelated();
    this.getCast();
  }
  getRandom(max){
    return this.rand =  Math.floor(Math.random() * Math.floor(max))
  }
  addWatchlist(){
    let body: Movie[] | {} = {
      "movies": [
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
      }
    );
    console.log("done")
    console.log(this.details)
    console.log(body)
  }
  addHistoryList(){
    let body: Movie[] | {} = {
      "movies": [
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
      }
    );
  }
  
  getRelated(){
    this.traktService.getRelatedById(this.formatTrakt, this.details.ids.slug).pipe().subscribe(res => {
      this.related = res;
      console.log(this.related)
    })}
    getCast(){
      this.traktService.getActors(this.formatTrakt, this.details.ids.slug, 1).pipe().subscribe(res => {
        this.allpeople = res;
        console.log(this.allpeople)
        this.cast = this.allpeople.body.cast
        console.log(this.cast)
      })
    }
}
