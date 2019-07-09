import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data
  @Input() format: string;
  @Input() formatTrakt: string;
  @Input() seasonData: any
  formatPeople: string = "person"
  isVisible = false;
  isConfirmLoading = false;
  nzStyle: {
    "display": "flex";
    "align-items": "center";
    "justify-content": "center";
    "margin": "0 auto";
  }

  constructor(private router: Router ) { }

  ngOnInit() {
    console.log(this.data)
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
public navigateTo(){
  if (this.formatTrakt === 'movies'){
    this.router.navigate([`details/${this.formatTrakt}/${this.data.ids.slug}`]);
  }
else{
  this.router.navigate([`details/${this.formatTrakt}/${this.data.ids.slug}/season/1/${this.data.ids.tmdb}/${this.data.ids.trakt}`]);
}
}
}
