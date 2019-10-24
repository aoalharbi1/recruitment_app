import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs: any
  constructor(private http: HttpService) { }

  ngOnInit() {


    this.getJobs()

    console.log('getting data', this.jobs)
  }

  getJobs() {
    let observable = this.http.getJobs()
    observable.subscribe(data => {
      this.jobs = data
    })
  }



}
