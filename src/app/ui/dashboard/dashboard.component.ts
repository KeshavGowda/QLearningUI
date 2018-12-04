import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { Chapter } from '../Models/Chapter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalChapters:Chapter[];

  loadChapters() {
    this.commonService.getTotalChapters().subscribe(totalChapters => this.totalChapters = totalChapters);
  }

  openPopUp(id:string) {

  }

  constructor(private commonService:CommonService) {
      this.loadChapters();
  }

  ngOnInit() {
  }

}
