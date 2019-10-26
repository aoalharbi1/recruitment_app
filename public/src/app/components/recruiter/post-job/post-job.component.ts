import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service'


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  jobDetails: any = { }
  constructor(private http: HttpService) { }


  ngOnInit() {

    this.jobDetails = {
      title: "",
      description:"",
      level:"",
      field:"",
      city:"",
      type:"",
      company:""
    }

  }
  postJob(){
    let observable = this.http.postNewJob(this.jobDetails);
    observable.subscribe(res => console.log(res));

  }

}
