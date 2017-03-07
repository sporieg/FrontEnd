import {GithubApi} from './github-api'

export class IssueDetail {
    static inject() { return [GithubApi]};

    constructor(api){
        this.api = api;
    }

    activate(params, routeConfig){
        this.routeConfig = routeConfig;

        return this.api.getIssueDetails(params.id).then(issue => {
            this.issue = issue;
            this.routeConfig.navModel.setTitle(issue.title);
        })
    }
}