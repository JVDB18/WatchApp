import { Component, OnInit, Input } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { AuthService } from 'src/app/auth.service';
import { Show } from 'src/app/show';
import { Movie } from 'src/app/movies';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  constructor(private traktService: TraktService, private authService : AuthService) { }

isLoggedIn: boolean
@Input() data
@Input() format

  ngOnInit() {
    this.authService.isLog$.subscribe(res => this.isLoggedIn = res)
      console.log(this.isLoggedIn)
  }
  addWatchlist(format){
    if (format === 'shows'){

    let body: Show[] | {} ={
      "shows": [
        {"title" : `${this.data.title}`,
          "year": `${this.data.year}`,
          "ids": {
          "trakt": `${this.data.ids.trakt}`,
          "slug": `${this.data.ids.slug}`,
          "imdb": `${this.data.ids.imdb}`,
          "tmdb": `${this.data.ids}`
          }}
      ]
    }
    this.traktService.addToList('watchlist', body).subscribe(res => console.log(res))
    }
    if (format === 'movies'){

    let body: Movie[] | {} ={
      "movies": [
        {"title" : `${this.data.title}`,
          "year": `${this.data.year}`,
          "ids": {
          "trakt": `${this.data.ids.trakt}`,
          "slug": `${this.data.ids.slug}`,
          "imdb": `${this.data.ids.imdb}`,
          "tmdb": `${this.data.ids}`
          }}
      ]
    }
    this.traktService.addToList('watchlist', body).subscribe(res => console.log(res))
    alert("Succesfully Ad")
    }
    // this.notification.blank(
    //   'Succesfully added',
    //   'You have added 1 item to your Watchlist',{
    //     nzStyle: {
    //       width: '600px',
    //       marginLeft: '-265px',
    //       backgroundColor: '#000000ad'
    //     },
    //     nzClass: 'test-class'
    //   })
  }
  addHistoryList(format){
    if(format === 'shows'){
      let body: Show[] | {} ={
        "shows": [
          {"title" : `${this.data.title}`,
            "year": `${this.data.year}`,
            "ids": {
            "trakt": `${this.data.ids.trakt}`,
            "slug": `${this.data.ids.slug}`,
            "imdb": `${this.data.ids.imdb}`,
            "tmdb": `${this.data.ids}`
            }}
        ]
      }

      this.traktService.addToList('history', body).subscribe(res => console.log(res))

    }
    if(format === 'movies'){
      let body: Movie[] | {} ={
        "movies": [
          {"title" : `${this.data.title}`,
            "year": `${this.data.year}`,
            "ids": {
            "trakt": `${this.data.ids.trakt}`,
            "slug": `${this.data.ids.slug}`,
            "imdb": `${this.data.ids.imdb}`,
            "tmdb": `${this.data.ids}`
            }}
        ]
      }

      this.traktService.addToList('history', body).subscribe(res => console.log(res))

    }
    // this.notification.blank(
    //   'Succesfully added',
    //   'You have added 1 item to your Watched List',{
    //     nzStyle: {
    //       width: '600px',
    //       marginLeft: '-265px',
    //       backgroundColor: '#000000ad'
    //     },
    //     nzClass: 'test-class'
    //   })
  }
}
