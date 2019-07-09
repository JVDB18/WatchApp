import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isLog$: Observable<boolean> = this.isLoggedIn.asObservable();
  public isAuth: boolean
  private storeToken: BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem('token'))
  public storedToken$: Observable<any> = this.storeToken.asObservable();

  constructor( private http: HttpClient ) { }

  updateIsLog(boolean){
      this.isLoggedIn.next(boolean)
    }

  getAuthentication = () => {
    const authUri= `${environment.trakt.authUrl}/oauth/authorize?response_type=code&client_id=${environment.trakt.clientId}&redirect_uri=${environment.trakt.redirectUri}/authorize`;
    window.location.href= authUri
  }
  getParsed( ) {
    let parsedUrl= new URL(window.location.href)
    let code = parsedUrl.searchParams.get('code')
    localStorage.setItem('code', code)
  }

    getToken(){
      return this.http.post(`${environment.trakt.tokenUrl}`, {
        'code': localStorage.getItem('code'),
        'client_id': environment.trakt.clientId,
        "client_secret": environment.trakt.client_secret,
        "redirect_uri" : `${environment.trakt.redirectUri}/authorize`,
        "grant_type":"authorization_code"
      }, {headers: this._getContentHeaders()}).pipe(tap(console.log)).subscribe(res => {
        this.storeToken.next(localStorage.setItem("token", res.access_token))
        this.isLoggedIn.next(true);
        })
    }
    permission(): boolean{
      this.isLog$.subscribe(res => this.isAuth = res)
      return this.isAuth
    }
    getUser(): Observable<any> {
      return this.http.get(`${environment.trakt.baseUrl}/users/settings`, {headers: new HttpHeaders({
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
        "trakt-api-version":"2",
        "trakt-api-key":environment.trakt.clientId
      })
      }).pipe(tap())
    }
    revokeToken(){
      return this.http.post(`${environment.trakt.baseUrl}/oauth/revoke`, this._revokeBodyGenerate, {
        headers: this._getContentHeaders()
      })
    }
    private _getContentHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type':'application/json'
       });
    }
    private _revokeBodyGenerate(){
      return {
        'token': localStorage.getItem('token'),
        'client_id': environment.trakt.clientId,
        'client_secret' : environment.trakt.client_secret
      }
    }
}
