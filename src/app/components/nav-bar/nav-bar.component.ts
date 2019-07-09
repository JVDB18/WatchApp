import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import {environment} from 'src/environments/environment'
import { AuthService } from 'src/app/auth.service';
import { getToken } from '@angular/router/src/utils/preactivation';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any
  isSigned: boolean= false
  isLoggedIn: boolean 
  code: number | string
  token: number | string 

  constructor(private authService: AuthService) { }

  ngOnInit() {   

      this.authService.isLog$.subscribe(res => this.isLoggedIn = res)
      console.log(this.isLoggedIn)
      console.log(localStorage.getItem('token'))
      if(localStorage.getItem('token') !== null){
        this.isLog()
      }

  }
  
  isLog(){
    this.authService.updateIsLog(true);
    
  }
getAuth(){
  this.authService.getAuthentication();
}
  
loggedOut(){
  this.authService.revokeToken().subscribe(res => console.log(res)); 
  localStorage.clear();
  window.location.href="http://localhost:4200/"
}

}
