import { Component, OnInit, OnDestroy } from '@angular/core';
import { TraktService } from '../trakt.service';
import { TmdbService } from '../tmdb.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Show } from '../show';
import { Movie } from '../movies';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private traktService: TraktService, private authService: AuthService, private router: Router) { }

private subscription : Subscription = new Subscription();

response = []
isLoggedIn: boolean

  ngOnInit() {
    this.authService.isLog$.subscribe(res => this.isLoggedIn = res)
    this.getTrend('shows');
    this.getTrend('movies')
  }
  ngOnDestroy(){

  }
getAuth(){
  if(this.isLoggedIn === false){
    this.authService.getAuthentication();
  }
  else{
    this.router.navigate(["/list/movies"])
  }
}
getTrend(format){
  this.traktService.getList(1, 2, format, 'trending').subscribe(res => {
    for (let i = 0; i < res.body.length; i++){
      this.response.push(res.body[i])}
    console.log(this.response)
  })
}

}
