import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css']
})
export class JobPostedComponent implements OnInit {
  jobs: any;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.recJobs();
  }

  recJobs(){
    let observables = this.http.getRecJobs();
    observables.subscribe(data => {
      console.log(data);
      this.jobs = data;
    })
  }
}
