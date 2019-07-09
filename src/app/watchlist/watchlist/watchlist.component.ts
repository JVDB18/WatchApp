import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/movies';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlist: Movie[]

  constructor(private traktService : TraktService ) { }

  ngOnInit() {
  }


}
