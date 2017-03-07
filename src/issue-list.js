import {GithubApi} from './github-api'
import {EventAggregator} from 'aurelia-event-aggregator';
import {IssueViewed} from './messages';

export class IssueList {
    static inject() { return [GithubApi, EventAggregator]};

    constructor(api, ea){
        this.api = api;
        this.ea = ea;
        this.issues = [];

        ea.subscribe(IssueViewed, msg => {
            this.select(msg.issue);
        })
    }

    created(){
        this.api.getIssues().then(issues => this.issues = issues);
    }

    select(issue){
        this.selectedId = issue.number;
        return true;
    }
}