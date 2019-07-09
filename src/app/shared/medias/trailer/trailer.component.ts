import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TmdbService } from 'src/app/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit, OnDestroy {
  trailer: any
  isTrailer: boolean
  path: string
  safePath: any
  isData: Subject<boolean> = new Subject();
  public safeURL: SafeResourceUrl
  @Input() id: number
  @Input() format: string
  private subscription: Subscription = new Subscription();


  constructor(private tmdbService: TmdbService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getTrailer();
    this.isData.subscribe(res => this.isTrailer = res)
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getTrailer();
  }
  ngOnDestroy(){
this.subscription.unsubscribe()
  }
  getTrailer(){
this.subscription.add(
  this.tmdbService.getTrailer(this.format,this.id).subscribe(res =>{
    this.trailer = res;
    console.log(this.trailer.results[0].key)
    if(this.trailer.results.length !==0){
      this.isData.next(true)
      this.path = `https://www.youtube.com/embed/${this.trailer.results[0].key}`
      this.safeURL= this._sanitizer.bypassSecurityTrustResourceUrl(this.path)
      console.log(this.safeURL)
    }
    else{
      this.isData.next(false)
      console.log(this.isData)
    }}))
  
  }

}
