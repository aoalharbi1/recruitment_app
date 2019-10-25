import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  recruiters: any
  is_active: boolean = false
  selectedRec: any

  id_value: any


  constructor(private http: HttpService) { }

  ngOnInit() {
    this.selectedRec = { _id: "", active: "" };
    this.getRec()

  }


  //Getting All Recruiters
  getRec() {
    let observable = this.http.getRecruiter()
    observable.subscribe(data => {
      this.recruiters = data
      /* console.log("This is stuts of the rec",this.recruiters={active:""}) */
    })
  }


  //HTML Activating
  /* activate(){
    if (this.is_active==false){
      this.is_active=true
      console.log("this Recruiter is activated")
    }else if(this.is_active==true){
      this.is_active=false
      console.log("this Recruiter is activated")
    }
  } */
  //Not Working logic for activating the recruiters

  /*   updateRecStatus(rec){
      const observable = this.http.ActivateRec(rec);
      observable.subscribe(data => {
        this.getRec();
        this.recruiters = data;
        this.selectedRec = { _id: data._id, active: "true" };
        console.log("HI",this.selectedRec)
      });
    } */

  updateRecStatus() {
    console.log("edit", this.selectedRec)
    let observable = this.http.ActivateRec(this.id_value, this.selectedRec)
    observable.subscribe((data: any) => {
      this.selectedRec = { _id: '5db0ca4d37ac2c44846f605d'  /* data._id */, active: true /* data.active */ }
      console.log('after', this.selectedRec)
    })
    this.getRec()
    this.id_value = ""
  }



}
