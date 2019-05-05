import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private app: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  authenticated() { return this.app.authenticated; }

  logout() {
    this.http.post('/api/logout', {}).pipe(finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    })).subscribe();
  }

  trainerHome() {
    this.router.navigateByUrl('/trainer');
  }

}
