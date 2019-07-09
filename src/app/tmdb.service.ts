import { Injectable, OnDestroy } from '@angular/core';
import { Tmdb } from './poster';
import { Observable, timer, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, delayWhen, retryWhen, mergeMap, finalize, catchError, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  tmdbUrl= "https://api.themoviedb.org/3";
  config
  public isLoading : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  getTaggetImg(id){
    return this.http.get(`${this.tmdbUrl}/person/${id}/tagged_images?api_key=${environment.tmdb.key}`)
  }

  getSeason(id, number){
    return this.http.get(`${this.tmdbUrl}/tv/${id}/season/${number}?api_key=${environment.tmdb.key}`)
    .pipe(
      tap(),
        retryWhen(genericRetryStrategy()),
        catchError( error => of(error))
    );
  }
  
  getMoviePoster(format: string, id: number | string): Observable<Tmdb | {}[]> {
    return this.http.get<Tmdb>(`${this.tmdbUrl}/${format}/${id}?api_key=${environment.tmdb.key}`)
    .pipe(
      tap(),
      retryWhen(genericRetryStrategy()),
      catchError( error => of(error))
    );
  }
  getTmdbMovieData(format: string, id: number | string): Observable<Tmdb | {}[]> {
    return this.http.get<Tmdb>(`${this.tmdbUrl}/${format}/${id}?api_key=${environment.tmdb.key}`)
    .pipe(
      tap(),
      retryWhen(genericRetryStrategy()),
      catchError( error => of(error)), 
      takeUntil(this.isLoading)
    );
  }
  getBackdrop(format: string, id: number): Observable<Tmdb> {
    return this.http.get<Tmdb>(`${this.tmdbUrl}/${format}/${id}/images?api_key=${environment.tmdb.key}`)
    .pipe(
      tap(),
        retryWhen(genericRetryStrategy()),
        catchError( error => of(error)),
    );
}
  getTrailer(format: string, id: number | string):Observable<Tmdb>{
    return this.http.get<Tmdb>(`${this.tmdbUrl}/${format}/${id}/videos?api_key=${environment.tmdb.key}`)
    .pipe(
      tap(),
      retryWhen(genericRetryStrategy()),
    );;
  }
  getConfig(){
    return this.http.get(`https://api.themoviedb.org/3/configuration?api_key=${environment.tmdb.key}`).subscribe(res => this.config = res)
  }
}

//Créer un observable propre à chaque composant qui sera pris en paramètre par takeUntil !!!!!!!

const genericRetryStrategy = ({
  maxRetryAttempts = 4,
  scalingDuration = 2000,
  excludedStatusCodes = [404]
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status) 
      ) {
        throw(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};