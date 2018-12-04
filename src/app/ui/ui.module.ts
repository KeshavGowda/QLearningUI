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

const ROUTES: Routes = [
  {path:'', component: DashboardComponent},
  {path:'course-content', component: CourseContentComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  declarations: [
    LayoutComponent,
    ChapterSummaryComponent,
    SummaryComponent,
    HeaderComponent,
    FooterComponent,
    CourseContentComponent,
    DashboardComponent,
    ModalComponent
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
