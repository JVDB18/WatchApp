import { Component, OnInit, OnDestroy } from '@angular/core';
import { TraktService } from 'src/app/trakt.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TmdbService } from 'src/app/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  constructor(private traktService : TraktService, private tmdbService : TmdbService, private route : ActivatedRoute,  private _sanitizer: DomSanitizer) { }
  private subscription : Subscription = new Subscription();
  seasonSummary
  /* mettre un subject sur le display boolean pour éviter le bug du poster */
  display : Subject<boolean> = new Subject();
  noTrailer: Subject<boolean>= new Subject();
  isDisplay: boolean
  isTrailer: boolean
  formattrakt: string = "shows"
  format: string = "tv"
  posterUrl: string
  id : number | string
  slug : number | string
  trailer
  path : string
  number : number | string
  public safeURL: SafeResourceUrl
  posterBaseUrl: string


  ngOnInit() {
    this.getSeason();
    this.display.subscribe(res => this.isDisplay = res)
    this.noTrailer.subscribe(res=> this.isTrailer = res)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
getSeason(){
    this.subscription.add(this.route.paramMap.subscribe((params: ParamMap) => 
    {
    this.number= params.get('number');
    this.id = params.get('id')
    console.log(this.number)
    console.log(this.id) 
    this.tmdbService.getSeason(this.id, this.number).subscribe(res => {
      this.seasonSummary = res
    console.log(this.seasonSummary)
      if(this.seasonSummary.poster_path === undefined || this.seasonSummary.poster_path === null){
        this.display.next(false);
      }
    else{   
      this.posterUrl = `${this.tmdbService.config.images.base_url}w200${this.seasonSummary.poster_path}`
      this.display.next(true);
  
      }
    });
    let options = `${this.format}/${this.id}`;
    let options2=`season/${this.number}`;
    this.tmdbService.getTrailer(options, options2).subscribe(res =>{
      this.trailer = res;
      if (this.trailer.results.length !== 0) {
        this.path = `https://www.youtube.com/embed/${this.trailer.results[0].key}`
        this.safeURL= this._sanitizer.bypassSecurityTrustResourceUrl(this.path)
      this.noTrailer.next(true)
      }
      else {
        this.noTrailer.next(false)
      }
  })
  }))

 //ATTENTION DANS LES EPISODES L'ID RENVOYER A TMDB N EST PAS LE BON! FAIRE PASSER L'ID DE TRAKT DANS LES PARAMS D URL APRES L ID DE TMDB DANS LE ROUTING ENFANT DES SAISONS

}

}
