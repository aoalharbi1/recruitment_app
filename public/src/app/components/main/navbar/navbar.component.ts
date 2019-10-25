import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_login: boolean
  userData: any;
  constructor(
    private _interactionService: InteractionService,
    private _http: HttpService,
    private _router: Router
    ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.is_login = false;
    } else {
      this.is_login = true;
      this.userData = localStorage;
    }
    this._interactionService.login$
      .subscribe(
        data => {
          this.is_login = true;
          this.userData = data;

          localStorage.setItem('first_name', data.first_name);
          localStorage.setItem('last_name', data.last_name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('_id', data._id);
          localStorage.setItem('website', data.website);
          localStorage.setItem('companyName', data.companyName);
        }
      );
  }

  sign_out() {
    localStorage.clear();
    this.is_login = false;
    this.userData = {};
    this._router.navigate(['/']);

    this._http.sign_out()
      .subscribe(res => console.log(res));
  }
}
