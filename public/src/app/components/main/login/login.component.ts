import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_type: boolean = true
  constructor() { }

  ngOnInit() {
    this.login_type = false
  }

  change_to_user_login() {
    if (this.login_type == true) {
      this.login_type = false
      console.log("Change to user")
    }
    else {
      console.log("No Change")
    }
  }
  change_to_rec_login() {
    if (this.login_type == false) {
      this.login_type = true
      console.log("Change to Rec")
    }
    else {
      console.log("No Change")
    }

  }

}
