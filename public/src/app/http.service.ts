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

  userApplied(job) {
    return this.http.put('/user/applied', job);
  }

  getRecruiter() {
    return this.http.get('/recruiters');
  }

  ActivateRec(rec, id) {
    return this.http.put('/admin/activate', rec, id);
  }

  sign_out() {
    return this.http.get('/sign_out');
  }
}
