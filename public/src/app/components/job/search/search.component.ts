import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs: any;
  jobData: any;
  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.jobData = {
      _id: ""
    };

    this.getJobs();
  }

  getJobs() {
    let observable = this.http.getJobs()
    observable.subscribe(data => {
      this.jobs = data;
    });
  }

  userApplied(id) {
    this.jobData._id = id;
    let observable = this.http.userApplied(this.jobData);
    observable.subscribe(res => {
      console.log(res)
    });
  }



}
