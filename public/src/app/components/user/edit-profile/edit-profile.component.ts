import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  recruiter: any;
  updated: any;
  constructor(private http: HttpService) {

  }
  ngOnInit() {
    this.recruiter = localStorage;
    this.updated = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      companyName: "",
      website: ""
    };
  }

  // getRecruitersById() {
  //   let observable = this.http.recruitersById();
  //   observable.subscribe(data => {
  //     this.recruiter = data;
  //     // console.log(this.recruiter);
  //   });
  // }

  updateRecruiter() {

    console.log(this.recruiter);

    let observable = this.http.updateRecruitersById(this.recruiter);
    observable.subscribe(res => { console.log("111", res) });
  }

}
