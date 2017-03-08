import {HttpClient, json}  from 'aurelia-fetch-client';

export class GithubApi{
  isRequesting = false;

  constructor(){
      this.httpClient = new HttpClient();
      var me = this;
      this.httpClient.configure(config =>config
        .withBaseUrl('https://api.github.com/')
        .withInterceptor({
            response(resp) {
                me.isRequesting = false;
                return resp.json();
            }
        }));
  }

  todayString(){
    var d = new Date();
    d.setDate(d.getDate() - 7);
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }
  
  getIssues(){
    this.isRequesting = true;
    var url = 'repos/angular/angular/issues?since=' + this.todayString();
    return this.httpClient.fetch(url);
  }

  getIssueDetails(id){
    this.isRequesting = true;
    var url = 'repos/angular/angular/issues/' + id;
    return this.httpClient.fetch(url);
  }
}