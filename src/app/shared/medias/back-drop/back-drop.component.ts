import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TmdbService } from 'src/app/tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-back-drop',
  templateUrl: './back-drop.component.html',
  styleUrls: ['./back-drop.component.css']
})
export class BackDropComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  path: any
  backDropUrl: string
  @Input() id: number
  @Input() format: string
  @Input() carousel : boolean
  sized: number | string = innerHeight + 'px'
  css = {
    'height': innerHeight + 'px',
    'padding-top': '20px'
  }
  rand: number

  constructor(private tmdbService : TmdbService) { }

  ngOnInit() {
      this.getBackDrop()
}
ngOnDestroy(){
this.subscription.unsubscribe();
}
ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.getBackDrop();
}
getBackDrop(){
  this.subscription.add(this.tmdbService.getConfig());
  this.subscription.add(this.tmdbService.getBackdrop(this.format,this.id).subscribe(res =>{
    this.path = res;
    this.rand =  Math.floor(Math.random() * Math.floor(this.path.backdrops.length))
    if(this.carousel === true){
      this.backDropUrl = `${this.tmdbService.config.images.base_url}original${this.path.backdrops[0].file_path}`
    }
    else {
      this.backDropUrl = `${this.tmdbService.config.images.base_url}original${this.path.backdrops[this.rand].file_path}`
    }
}))

}
}
