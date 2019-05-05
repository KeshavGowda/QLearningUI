import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from './Models/Chapter';
import { map } from 'rxjs/operators/';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private totalChapters:string[]=['Chapter 1', 'Chapter 2', 'Chapter 3','Chapter 4','Chapter 5'];
  private currentChapter:Chapter;
  private chapterUrl = '/api/chapters';
  private arrayOfChaps:Observable<Chapter[]> = new Observable<Chapter[]>();
  private nextBest:String = "";

  getTotalChapters():Observable<Chapter[]> {
    return this.arrayOfChaps;
  }

  setCurrentChapter(chapter:Chapter) {
    this.currentChapter = chapter;
  }

  getCurrentChapter():Chapter {
    return this.currentChapter;
  }

  loadChapters() {
    this.arrayOfChaps = this.http.get<Chapter[]>(this.chapterUrl);
  }

  getNextBest() {
    return this.nextBest;
  }

  setNextBest(next:String) {
    this.nextBest = next;
  }

  constructor(private http:HttpClient) {
    this.loadChapters();
  }

  ngOnInit() {}
}
