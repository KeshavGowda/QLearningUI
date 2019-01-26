import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChapterSummaryComponent } from './chapter-summary/chapter-summary.component';
import { SummaryComponent } from './summary/summary.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from './modal/modal.component';
import {HttpClientModule} from "@angular/common/http";
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { LoginService } from './login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard', component: DashboardComponent},
  {path:'course-content', component: CourseContentComponent},
  {path:'quiz', component:QuizComponent},
  { path: 'login', component: LoginComponent}
]

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    ChapterSummaryComponent,
    SummaryComponent,
    HeaderComponent,
    FooterComponent,
    CourseContentComponent,
    DashboardComponent,
    ModalComponent,
    QuizComponent,
    LoginComponent,
    HomeComponent
  ],
  exports: [LayoutComponent, LoginComponent],
  providers: [LoginService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }]
})
export class UiModule { }
