import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { CommonService } from '../common.service';
import { Learning } from '../Models/Learning';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from '../Models/Chapter';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
  providers:[ModalServiceService]
})
export class CourseContentComponent implements OnInit {

  private learningUrl = '/api/learning/';
  chapter:Chapter;
  videoUrl:string = "https://www.youtube.com/embed/L7CdHnuR4pE";
  listOfLearning:Learning[] = [];

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  constructor(private modalService: ModalServiceService, private commonService:CommonService, private http:HttpClient) {
    this.chapter = this.commonService.getCurrentChapter();
  }

  ngOnInit() {
    this.http.get<Learning[]>(this.learningUrl+this.chapter.chapter_id)
    .subscribe(learnings => this.listOfLearning = learnings);
  }

}
