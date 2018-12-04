import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Chapter } from '../Models/Chapter';

@Component({
  selector: 'app-chapter-summary',
  templateUrl: './chapter-summary.component.html',
  styleUrls: ['./chapter-summary.component.css']
})
export class ChapterSummaryComponent implements OnInit {

  @Input() chapter:Chapter;

  newWin() {
    this.commonService.setCurrentChapter(this.chapter);
    this.router.navigateByUrl('/course-content');
  }

  constructor(private router: Router, private commonService:CommonService) { }

  ngOnInit() {
  }

}
