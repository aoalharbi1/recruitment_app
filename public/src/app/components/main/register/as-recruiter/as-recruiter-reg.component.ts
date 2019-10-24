import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-as-recruiter_reg',
  templateUrl: './as-recruiter.component.html',
  styleUrls: ['./as-recruiter.component.css']
})
export class AsRecruiterRegComponent implements OnInit {

  registerRecruiterData: any = {};
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.registerRecruiterData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      companyName: "",
      website: ""
    };
  }

  registerRecruiter() {
    this._auth.registerRecruiter(this.registerRecruiterData)
      .subscribe(
        res => {
          if (!res.token) {
            return;
          }

          this.registerRecruiterData.password = "";
          localStorage.setItem('token', res.token);
          this._router.navigate(['/findjob']);
        },
        err => console.log(err)
      );
  }
}
