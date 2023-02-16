import { Component, OnInit } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent implements OnInit {
  movies: Movie[]
  format: string = 'movie'
  path: string = "history"
  formatTrakt='movies'

  constructor(private traktService : TraktService) { }

  ngOnInit() {
    this.getWatched(this.path, this.formatTrakt);
  }
  getWatched(path, format){
    this.traktService.getSync(path, format).pipe(tap()).subscribe(res => {
      this.movies = res;
    })
  }
}
