import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  updated: any;
  constructor(
    private http: HttpService,
    private _router: Router
    ) {

  }
  ngOnInit() {
    this.user = localStorage;
    this.updated = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      major: "",
      gpa: "",
      gender: "",
      education: "",
      city: "",
      phone: "",
      university: "",
    };
  }

  // getRecruitersById() {
  //   let observable = this.http.recruitersById();
  //   observable.subscribe(data => {
  //     this.recruiter = data;
  //     // console.log(this.recruiter);
  //   });
  // }

  updateUser() {

    console.log(this.user);

    let observable = this.http.updateUsersById(this.user);
    observable.subscribe(res => { 
      console.log("111", res);
      alert("Profile Successfully Changed");
      this._router.navigate(['/displayjobs']);
    });
  }

}