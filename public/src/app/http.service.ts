import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getRecruiters() {
    return this.http.get('/admin/recruiters');
  }

  ActivateRec(rec) {
    return this.http.put('/admin/activate', rec);
  }

  sign_out() {
    return this.http.get('/sign_out');
  }

  appliedUsers() {
    return this.http.get('/user/jobs');
  }
}
