import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movies-watchlist',
  templateUrl: './movies-watchlist.component.html',
  styleUrls: ['./movies-watchlist.component.css']
})
export class MoviesWatchlistComponent implements OnInit {
watchlist: Movie[]
format: string = 'movie'
formatTrakt: string= 'movies'
  constructor(private traktService : TraktService) { }

  ngOnInit() {
    this.getWatchList(this.formatTrakt)
  }

  getWatchList(format: string){

    return this.traktService.getWatchList(format).pipe(tap(console.log)).subscribe(

      res => {
              this.watchlist = res;
              this.watchlist.reverse()
            }

    )
  }

}
