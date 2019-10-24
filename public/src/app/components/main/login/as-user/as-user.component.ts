import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-as-user',
  templateUrl: './as-user.component.html',
  styleUrls: ['./as-user.component.css']
})
export class AsUserComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
}
