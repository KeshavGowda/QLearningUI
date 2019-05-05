import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  newUser = {username: '', password: '', confpassword: ''};

  passwordsMatch = true;
  returnMessage = '';

  constructor(private app: LoginService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/maindashboard');
    });
    return false;
  }

  create() {
    if(this.newUser.password !== this.newUser.confpassword) {
        this.passwordsMatch = false;
    }
    else {
      //this.returnMessage = this.app.createUser({username:this.newUser.username, password:btoa(this.newUser.password)});
      this.http.post('/api/registerUser', {username:this.newUser.username, password:btoa(this.newUser.password)}).subscribe(response => {
          if(response === 'OK') {
            this.passwordsMatch = true;
            this.returnMessage = 'User created successfully. Please login again.';
            setTimeout(() => {
              this.returnMessage = '';
            },5000);
          }
          else {
            this.passwordsMatch = true;
            this.returnMessage = 'Something went wrong. Please try again.';
            setTimeout(() => {
              this.returnMessage = '';
            },5000);
          }
      });
      this.newUser.username = '';
      this.newUser.password = '';
      this.newUser.confpassword = '';
      this.passwordsMatch = true;
    }
  }

  authenticated() { return this.app.authenticated; }

}
