import { Component, OnInit, Input } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { Movie } from 'src/app/movies';
import { Observable, Subject, empty } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
datas$: Observable<Movie[]>
show: boolean = false
formatMovie: string= "movies"
formatShow: string= "shows"
showTmdb: string = "tv"
movieTmdb: string ="movie"
private searchTerms = new Subject<string>();

  constructor(private traktService: TraktService) { }
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
      this.show = true
    }
    else {
      this.show = false
    }
    
  console.log(this.show)
  })
}
}
