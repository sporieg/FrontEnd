import {GithubApi} from './github-api'
import {EventAggregator} from 'aurelia-event-aggregator';
import {IssueViewed} from './messages';

export class IssueDetail {
    static inject() { return [GithubApi, EventAggregator]};

    constructor(api, ea){
        this.api = api;
        this.ea = ea;
    }

    activate(params, routeConfig){
        this.routeConfig = routeConfig;

        return this.api.getIssueDetails(params.id).then(issue => {
            this.issue = issue;
            this.routeConfig.navModel.setTitle(issue.title);
            this.ea.publish(new IssueViewed(issue));
        })
    }
}