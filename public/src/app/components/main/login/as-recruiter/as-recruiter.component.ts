import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-as-recruiter',
  templateUrl: './as-recruiter.component.html',
  styleUrls: ['./as-recruiter.component.css']
})
export class AsRecruiterComponent implements OnInit {

  recruiterData: any = {};
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.recruiterData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      companyName: "",
      website: ""
    };
  }

  loginRecruiter() {
    this._auth.loginRecruiter(this.recruiterData)
      .subscribe(
        res => {

          if (!res.token) {
            return;
          }

          this.recruiterData.password = "";
          localStorage.setItem('token', res.token);
          this._router.navigate(['/findjob']);
        },
        err => console.log(err)

      );
  }

}
