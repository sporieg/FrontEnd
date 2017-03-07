import {HttpClient, json}  from 'aurelia-fetch-client';

export class GithubApi{
  isRequesting = false;

  constructor(){
      this.httpClient = new HttpClient();
      this.httpClient.configure(config =>config
        .withBaseUrl('https://api.github.com/')
        .withInterceptor({
            response(resp) {
                this.isRequesting = false;
                return resp.json();
            }
        }));
  }

  todayString(){
      return '2017-2-28';
  }
  
  getIssues(){
    this.isRequesting = true;
    var url = 'repos/angular/angular/issues?since' + this.todayString();
    return this.httpClient.fetch(url);
  }

  getIssueDetails(id){
    this.isRequesting = true;
    var url = 'repos/angular/angular/issues/' + id;
    return this.httpClient.fetch(url);
  }
}