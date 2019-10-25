import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private http: HttpService) {

  }
  ngOnInit() {
    
  }

}
