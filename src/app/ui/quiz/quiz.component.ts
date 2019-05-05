import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mcq } from '../Models/Mcq';
import { Observable } from 'rxjs';
import { QuestionsAttempted } from '../Models/QuestionsAttempted';
import { ModalServiceService } from '../modal-service.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Chapter } from '../Models/Chapter';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  chapter: Chapter;
	qNum : number = 0;
	successMsg: string = "Successfully completed";
	private quizUrl = '/api/question/';
	private submitQuizUrl = '/api/submitquiz/';
	question : Mcq ;
  correctAnswers: number = 0;
  totalPercentage: number = 0;

	getNextQuestion() {
		console.log("getNextQuestion()");
	if(this.qNum>0){
		this.onNext();
	}
	this.qNum++;
    this.http.get<Mcq>(this.quizUrl+"chapter="+this.chapter.chapter_id+"/question="+this.qNum)
    .subscribe(question => this.question = question);
  	}

  answerSelected:string;
	selectedOptNo:number;
	isRight:boolean;
	questions_attempted_list : QuestionsAttempted[] = [];

	onNext(){
		console.log("onNext()");
		this.isRight = this.checkIfCorrect(this.answerSelected,this.question.answer);
    if(this.isRight) {
      this.correctAnswers++;
    }
		this.questions_attempted_list.push( new QuestionsAttempted(this.question.question_id,this.isRight));
		console.log(this.questions_attempted_list);
	}

	submitQuiz(){
		console.log("submitQuiz()");
		this.onNext();
		 this.http.post(this.submitQuizUrl, this.questions_attempted_list).subscribe(
            data => {
                console.log("POST Request is successful ", data);
                if(data == 'OK') {
                  let reward = (this.correctAnswers*5)+((2-this.correctAnswers)*-5);
                  sessionStorage.setItem("reward", String(reward));
                  //update q-table
                  this.http.get("http://localhost:9090/qtable2?curs="+sessionStorage.getItem("currentState")
                                +"&news="+sessionStorage.getItem("nextState")+"&reward="+sessionStorage.getItem("reward"));
                  //call max reward
                  let maxreward = this.http.get<string>("http://localhost:9090/maxreward?state="+sessionStorage.getItem("nextState"));
                  //update max reward
                  maxreward.subscribe(r => sessionStorage.setItem("maxReward", r));
                  sessionStorage.setItem("currentState", "Quiz"+this.chapter.chapter_id);
                  this.openResultModal('quizresult-modal');
                  this.totalPercentage = (this.correctAnswers/this.questions_attempted_list.length)*100;
                  //this.questions_attempted_list.length
                } else {
                  this.openResultModal('quizresult-modal');
                }
            },
            error => {
                console.log("Error", error);
            }
        );  ; 
	}

	selectedOption(opt:string,i:number) {
		console.log("selectedOption()");
		this.answerSelected = opt;
		this.selectedOptNo = i;
		console.log(this.answerSelected);
	}

	checkIfCorrect(answerSelected:string,answer:string) : boolean{
		console.log("checkIfCorrect()");
		if(answerSelected==answer){
			return true;
		}
		return false;
	}

  openResultModal(id: string) {
    this.modalService.open(id);
  }

  closeResultModal(id: string) {
    this.modalService.close(id);
    this.router.navigateByUrl('/');
  }

  // retakeQuiz() {
  //   console.log("retake called");
  //   this.modalService.close('quizresult-modal');
  //   this.router.navigateByUrl('/quiz', {skipLocationChange: true});
  //
  // }

  getProgressBarStyle(): any {
    let style = {'width':this.totalPercentage+'%'};
    return style;
  }

  constructor(private http:HttpClient, private modalService: ModalServiceService, private router: Router,
              private commonService:CommonService) {
      this.chapter = commonService.getCurrentChapter();
      sessionStorage.setItem("nextState", "Quiz"+this.chapter.chapter_id);
  }

  ngOnInit() {
  	this.getNextQuestion();
  }

}
