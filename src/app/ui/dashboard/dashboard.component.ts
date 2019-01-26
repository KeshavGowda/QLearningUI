import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { Chapter } from '../Models/Chapter';
import { ModalServiceService } from '../modal-service.service';

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

  openSummaryModal(id: string) {
    this.modalService.open(id);
  }

  closeSummaryModal(id: string) {
    this.modalService.close(id);
  }

  constructor(private commonService:CommonService, private modalService: ModalServiceService) {
      this.loadChapters();
  }

  ngOnInit() {
    this.loadChapters();
  }

}
