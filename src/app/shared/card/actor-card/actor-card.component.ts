import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {

  @Input() data
  @Input() format: string;
  formatPeople: string = "person"
  path
  posterImageUrl
  @Input() formatTrakt
 

  constructor(private router: Router) { }

  ngOnInit() {
  }
public navigateTo(){
  this.router.navigate([`details/actor/${this.formatTrakt}/${this.data.person.ids.slug}`]);
}
}