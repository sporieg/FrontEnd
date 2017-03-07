import {GithubApi} from './github-api'

export class IssueList {
    static inject() { return [GithubApi]};

    constructor(api){
        this.api = api;
        this.issues = [];
    }

    created(){
        this.api.getIssues().then(issues => this.issues = issues);
    }

    select(issue){
        this.selectedId = issue.number;
        return true;
    }
}