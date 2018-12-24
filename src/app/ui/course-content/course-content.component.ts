import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { CommonService } from '../common.service';
import { Learning } from '../Models/Learning';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from '../Models/Chapter';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
  providers:[ModalServiceService]
})
export class CourseContentComponent implements OnInit {

  private learningUrl = '/api/learning/';
  chapter:Chapter;
  currentLearningUrl:string = "https://www.youtube.com/embed/L7CdHnuR4pE";
  listOfLearning:Learning[] = [];

  getLearningUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentLearningUrl);
  }

  openModal(id: string, learningUrl:string) {
    this.currentLearningUrl = learningUrl;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openQuiz(){
    this.router.navigateByUrl('/quiz');
  }

  constructor(private modalService: ModalServiceService, private commonService:CommonService, private http:HttpClient,
              public sanitizer: DomSanitizer, private router: Router) {
    this.chapter = this.commonService.getCurrentChapter();
  }

  ngOnInit() {
    this.http.get<Learning[]>(this.learningUrl+this.chapter.chapter_id)
    .subscribe(learnings => this.listOfLearning = learnings);
  }

}
