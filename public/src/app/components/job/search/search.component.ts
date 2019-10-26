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
  constructor(
    private http: HttpService,
    private _router: Router,
  ) {

  }

  ngOnInit() {
    this.jobData = {
      _id: ""
    };

    this.getJobs();
  }

  getJobs() {
    let observable = this.http.getJobs();
    observable.subscribe(data => {
      this.jobs = data;
    });
  }

  userApplied(job) {
    if (!localStorage.getItem('token')) {
      return this._router.navigate(['/login']);
    }

    let observable = this.http.userApplied(job);
    observable.subscribe(res => {
      console.log(res);

      if (res === 1) {
        job.applied = true;
      } else if (res === 0) {
        job.applied = false;
      }
    });
  }
}
