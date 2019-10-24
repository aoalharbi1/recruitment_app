import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    this.getJobs();
  }

  getJobs() {
    return this.http.get('/jobs');
  }

  userApplied(job){
    return  this.http.put('/user/applied' , job);
  }
}
