import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-as-user_reg',
  templateUrl: './as-user.component.html',
  styleUrls: ['./as-user.component.css']
})
export class AsUserRegComponent implements OnInit {

  registerUserData: any = {};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.registerUserData = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

}
