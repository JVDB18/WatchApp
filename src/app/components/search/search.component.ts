import { Component, OnInit, Input, Output } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { Observable, Subject, empty } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
datas$: Observable<Movie[]>
toggle: boolean = false
formatMovie: string= "movies"
formatShow: string= "shows"
showTmdb: string = "tv"
movieTmdb: string ="movie"
private searchTerms = new Subject<string>();

  constructor(private traktService: TraktService, router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.reset();
      }
    })
   }
search(term: string) : void {
  this.searchTerms.next(term)
}
reset(): void{
  this.searchTerms.next('')
}
  ngOnInit(): void {
    this.observedSearch();
    console.log(this.datas$)
  }
observedSearch(){
  this.datas$ = this.searchTerms.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    switchMap((term: string) =>
        this.traktService.search(term)
    )
  )

  this.searchTerms.subscribe( res => {
    if(res !== '') {
      this.toggle = true
    }
    else {
      this.toggle = false
    }

  console.log(this.toggle)
  })
}
}
