import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('myModel') myModal;

  private learningUrl = '/api/learning/';
  chapter:Chapter;
  currentLearning:Learning;
  listOfLearning:Learning[] = [];
  private nextBestLearning:String="";

  getLearningUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentLearning.resource_link);
  }

  toggleCompleted(learning_id:string) {
    console.log(learning_id);
    this.http.get("/api/toggleCompleted/"+learning_id).subscribe();
  }

  openModal(id: string, learning:Learning) {
    this.currentLearning = learning;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.toggleCompleted(this.currentLearning._id);
    this.modalService.close(id);
  }

  openQuiz(){
    sessionStorage.setItem("reward", String(30));
    //update q-table
    this.http.get("http://localhost:9090/qtable2?curs="+sessionStorage.getItem("currentState")
                  +"&news="+sessionStorage.getItem("nextState")+"&reward="+sessionStorage.getItem("reward"));
    //call max reward
    let maxreward = this.http.get<string>("http://localhost:9090/maxreward?state="+sessionStorage.getItem("nextState"));
    //update max reward
    maxreward.subscribe(r => {
      sessionStorage.setItem("maxReward", r);
      this.commonService.setNextBest(r);
    });

    sessionStorage.setItem("currentState", "Learning"+this.chapter.chapter_id);
    this.router.navigateByUrl('/quiz');
  }

  constructor(private modalService: ModalServiceService, private commonService:CommonService, private http:HttpClient,
              public sanitizer: DomSanitizer, private router: Router) {
    this.chapter = this.commonService.getCurrentChapter();
    sessionStorage.setItem("nextState", "Learning"+this.chapter.chapter_id);
  }

  ngOnInit() {
    this.http.get<Learning[]>(this.learningUrl+this.chapter.chapter_id)
    .subscribe(learnings => this.listOfLearning = learnings);

    let maxreward = this.http.get<string>("http://localhost:9090/maxreward?state="+sessionStorage.getItem("nextState"));
    //update max reward
    maxreward.subscribe(r => {
      sessionStorage.setItem("maxReward", r);
      this.nextBestLearning = r;
    });
  }

}
