import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Show } from 'src/app/show';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-watched-shows',
  templateUrl: './watched-shows.component.html',
  styleUrls: ['./watched-shows.component.css']
})
export class WatchedShowsComponent implements OnInit {
shows: Show[]
format: string = 'tv';
formatTrakt: string = 'shows';
path: string = "history"

  constructor(private traktService : TraktService) { }

  ngOnInit() {
    this.getWatchedShows(this.formatTrakt);
    console.log(this.format);
    

  }
  getWatchedShows(path){
    this.traktService.getWatched(path).pipe(tap()).subscribe(res => {
      this.shows = res; 
      console.log(this.shows)})
  }
}
