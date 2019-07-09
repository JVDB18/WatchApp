import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/movies';
import { Show } from 'src/app/show';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        line-height: 60px;
        background: transparent;
        color: #fff;
        overflow: hidden;
        max-height: fit-content;
      }

      h3 {
        color: #fff;
      }
      button {
        margin-left: -40px;
      }
    `
  ]
})
export class CarouselComponent implements OnInit {
  @Input() carousel : boolean = true
  @Input() response
  formatShow: string = "tv";
  formatMovie: string = "movie";

  constructor() { }
 
  ngOnInit() {
    
    console.log(this.response.length)
        for(let i = 0; i< this.response.length; i++){
          console.log(this.response[i])
        }
    
  }

}
