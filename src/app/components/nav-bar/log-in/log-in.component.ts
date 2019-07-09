import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: any
  userSlug: string

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.getUser();
    console.log(this.userSlug)

  }
  getUser(){
    this.authService.getUser().subscribe(res => {this.user = res
    console.log(this.user)
    localStorage.setItem('slug', this.user.user.ids.slug)
    console.log(localStorage.getItem('slug'))})
  }

}
