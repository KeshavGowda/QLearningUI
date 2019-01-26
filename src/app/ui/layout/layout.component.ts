import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private app: LoginService, private http: HttpClient, private router: Router) {
      this.app.authenticate(undefined, undefined);
    }
    // logout() {
    //   this.http.post('logout', {}).pipe(finalize(() => {
    //       this.app.authenticated = false;
    //       this.router.navigateByUrl('/login');
    //   })).subscribe();
    // }

}
