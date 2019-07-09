import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, ParamMap } from '@angular/router';
import { Movie } from 'src/app/movies';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/show';
import { Person } from 'src/app/person';
import { AllPeople, Cast } from 'src/app/cast-crew';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription= new Subscription();
  id : string | number
  detailed: any
  related: Movie[] | Show[]
  cast : Cast
  allpeople
  people: string = 'people'
  peopleById : Person
  seasons 
  isLoggedIn: boolean

  constructor(private traktService: TraktService,
    private route: ActivatedRoute, private authService : AuthService) { 
      }

  ngOnInit() {
    this.route.data.subscribe((data: {details: Movie[] | Show[]}) => {this.detailed = data.details})
    this.getDetails();
    this.authService.isLog$.subscribe(res => this.isLoggedIn = res)
      console.log(this.isLoggedIn)
  
  }  
  @HostListener('window:beforeunload')
  ngOnDestroy(){
    this.subscription.unsubscribe()
    if(!this.subscription.closed){
      return console.log('still subscribe')
    }
    else{
      return console.log('unsub')
    }
  }  
  getDetails(){
   this.subscription.add(this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('slug');
      console.log(id)
      
    this.subscription.add(this.traktService.getSeason(id, 'seasons').subscribe(res => {
      this.seasons = res.body
      console.log(this.seasons)
    }))
    let format= params.get('formattrakt');
      console.log(format)
      
    this.subscription.add(this.traktService.getRelatedById(format, id).pipe().subscribe(res => {
        this.related = res;
      }))
    this.subscription.add(this.traktService.getActors(format, id, 1).pipe().subscribe(res => {
        this.allpeople = res;
        this.cast = this.allpeople.body.cast
      }))
  })
   )}
    
}