import { Injectable } from '@angular/core';
import { TraktService } from '../trakt.service';
import { Resolve, Router } from '@angular/router';
import { Movie } from '../movies';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolveService implements Resolve<Movie[]> {
  constructor(private traktService: TraktService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot): Movie[] | import("rxjs").Observable<Movie[]> | Promise<Movie[]> {

    let slug = route.paramMap.get('slug')
    let formatTrakt = route.paramMap.get('formattrakt')
    return this.traktService.getDetailsById(formatTrakt, slug).pipe(
      take(1),
      mergeMap(details => {
        if (details) {
          return of(details)
        }
        else {
          console.log('error')
        }
      })
    )
    }
  }
