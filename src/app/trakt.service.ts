import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from './movies';
import { environment } from 'src/environments/environment';
import { Show } from './show';
import { tap } from 'rxjs/operators';
import { AllPeople } from './cast-crew';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class TraktService {


  constructor(private http: HttpClient) {}

    getList(page, limit, format, type): Observable<HttpResponse<Movie[]>> {
      return this.http.get<Movie[]>(`${environment.trakt.baseUrl}/${format}/${type}?page=${page}&limit=${limit}`, {
        observe: 'response',
        headers: this._getDefaultHeaders()
      })
    }
    // retrieves seasons and episodes
    //options is determined by the URL parameters needed by Trackt Api (ex: /seasons/:seasonNumber/episodes/:episodeNumber)
    getSeason(id, options): Observable<HttpResponse<Show[]>>{
      return this.http.get<Show[]>(`${environment.trakt.baseUrl}/shows/${id}/${options}`, {
        observe: 'response',
        headers: this._getDefaultHeaders()
      })
    }
    getWatched(path): Observable<any>{
      return this.http.get<any[]>(`${environment.trakt.baseUrl}/users/${localStorage.getItem('slug')}/watched/${path}`, {headers: this._getDefaultHeaders()})
    }
    getSync(path, type): Observable<Movie[]>{
      return this.http.get<Movie[]>(this._generateSyncUrl(path, type), 
      {headers: this._getUserHeaders()})
    }
    getActors(format: string, slug: string, page: number): Observable<HttpResponse<AllPeople[]>>{
      return this.http.get<AllPeople[]>(`${environment.trakt.baseUrl}/${format}/${slug}/people?page=${page}&limit=5`, {
        observe: 'response',
        headers: this._getDefaultHeaders()
      })
    }
    getActorById( id: number | string): Observable<HttpResponse<Movie[]|{}|Show[] |{}>>{
      return this.http.get<Movie[]|{}|Show[]|{}>(`https://api.trakt.tv/people/${id}`, {
      observe: 'response', 
      headers: this._getDefaultHeaders()})
    }
    addToList(path, body){
      return this.http.post(`https://api.trakt.tv/sync/${path}`, body, {headers: this._getUserHeaders()}, )
    }

    getWatchList(format): Observable<Movie[]> {
      return this.http.get<Movie[]>(this._generateUserUrl(`/${localStorage.getItem('slug')}/watchlist/${format}`), {
        headers: this._getDefaultHeaders()
      })
    }
    getDetailsById(format: string, slug: string): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${environment.trakt.baseUrl}/${format}/${slug}?extended=full`, {
        headers: this._getDefaultHeaders()
      })
    }
    getRelatedById(format: string, slug: string): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${environment.trakt.baseUrl}/${format}/${slug}/related`, {
        headers: this._getDefaultHeaders()
      })
    }
    search(term: string): Observable<Movie[]> {
      if (!term.trim()) {
        // if not search term, return empty array.
        return of([]);
      }
      return this.http.get<Movie[]>(`${environment.trakt.baseUrl}/search/movie,show,people?query=${term}`, {headers: this._getDefaultHeaders()}).pipe(
        tap(console.log)
      );
    }
    private _getUserHeaders(): HttpHeaders {
      return new HttpHeaders({
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
        "trakt-api-version":"2",
        "trakt-api-key": "9bb50356fffe4192bf8b65138baf1928dbd0291a7cdf05e4cfb1e225b78807ad"
      })
    }


    private _getDefaultHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type':'application/json',
        'trakt-api-version':environment.trakt.version,
        'trakt-api-key':environment.trakt.clientId
       });
    }
    private _generateSyncUrl(path: string, type: string) : string {
      return `${environment.trakt.baseUrl}/sync/${path}/${type}?page=1&limit=50`
    }
    private _generateUserUrl(path: string): string {
      return `${environment.trakt.baseUrl}/users${path}`
    }
  }
