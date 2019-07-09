import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Show } from 'src/app/show';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shows-watchlist',
  templateUrl: './shows-watchlist.component.html',
  styleUrls: ['./shows-watchlist.component.css']
})
export class ShowsWatchlistComponent implements OnInit {
watchlist: Show[]
format: string = 'tv'
formatTrakt: string = 'shows'

  constructor(private traktService: TraktService) { }

  ngOnInit() {
    this.getWatchList(this.formatTrakt)
  }

  getWatchList(format: string){
    return this.traktService.getWatchList(format).pipe(tap(console.log)).subscribe(
      res => this.watchlist = res 
    )
  }
}
