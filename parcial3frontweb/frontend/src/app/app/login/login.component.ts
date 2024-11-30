import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username : String = "";
  public password : String = "";
  public apiResponse : any = "";

  constructor(private http : HttpClient, private router : Router){}


  public validateUserCredentials(){

    var url = "http://localhost:9898/api/login";

    var headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    )

    var body = {
      username: this.username,
      password: this.password

    };


    this.http.post(url, body, {headers}).subscribe({
      next: resp => {
        this.apiResponse = resp;
        var token = this.apiResponse.token

        sessionStorage.setItem('session_token', token);

        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
