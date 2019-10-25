import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-as-user',
  templateUrl: './as-user.component.html',
  styleUrls: ['./as-user.component.css']
})
export class AsUserComponent implements OnInit {

  jobSeekerData: any = {};
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.jobSeekerData = {
      email: "",
      password: "",
    };
  }

  loginJobSeeker() {

    this._auth.loginJobSeeker(this.jobSeekerData)
      .subscribe(
        res => {

          if (!res.token) {
            console.log(res);
            return;
          }

          this.jobSeekerData.password = "";
          localStorage.setItem('token', res.token);
          this._router.navigate(['/findjob']);
        },
        err => console.log(err)

      );
  }
}
