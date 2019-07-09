import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
code : string | number
token: string | number
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.getParsed(); 
    this.getToken()
  }
  getParsed(){
    this.authService.getParsed()
    this.code = localStorage.getItem('code')
  }
  
  getToken = () => {
    console.log(localStorage.getItem('code'))
    this.authService.getToken()
    this.authService.storedToken$.subscribe(res => 
      {this.token = res 
        if(localStorage.getItem('token') !== null){
          window.location.href= `${environment.trakt.baseUrl}/list/movies`
        console.log(localStorage)
      }}
      )
   
    }
    
  }


