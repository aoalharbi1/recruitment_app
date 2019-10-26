import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status:string //applied  // inter //cont

  CheckerValue:number

  constructor() { 
    this.status='cont'
  }

  ngOnInit() {
  }

  statusChecker(){
    if (this.status=='applied'){
      
    }
  }

}
