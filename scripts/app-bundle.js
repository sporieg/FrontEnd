define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Coding Assignment';
      config.map([{ route: '', moduleId: 'no-selection', title: 'Select' }, { route: 'issue/:id', moduleId: 'issue-detail', name: 'issues' }]);
      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('github-api',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GithubApi = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GithubApi = exports.GithubApi = function () {
    function GithubApi() {
      _classCallCheck(this, GithubApi);

      this.isRequesting = false;

      this.httpClient = new _aureliaFetchClient.HttpClient();
      this.httpClient.configure(function (config) {
        return config.withBaseUrl('https://api.github.com/').withInterceptor({
          response: function response(resp) {
            this.isRequesting = false;
            return resp.json();
          }
        });
      });
    }

    GithubApi.prototype.todayString = function todayString() {
      return '2017-2-28';
    };

    GithubApi.prototype.getIssues = function getIssues() {
      this.isRequesting = true;
      var url = 'repos/angular/angular/issues?since' + this.todayString();
      return this.httpClient.fetch(url);
    };

    GithubApi.prototype.getIssueDetails = function getIssueDetails(id) {
      this.isRequesting = true;
      var url = 'repos/angular/angular/issues/' + id;
      return this.httpClient.fetch(url);
    };

    return GithubApi;
  }();
});
define('issue-list',['exports', './github-api'], function (exports, _githubApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.IssueList = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var IssueList = exports.IssueList = function () {
        IssueList.inject = function inject() {
            return [_githubApi.GithubApi];
        };

        function IssueList(api) {
            _classCallCheck(this, IssueList);

            this.api = api;
            this.issues = [];
        }

        IssueList.prototype.created = function created() {
            var _this = this;

            this.api.getIssues().then(function (issues) {
                return _this.issues = issues;
            });
        };

        IssueList.prototype.select = function select(issue) {
            this.selectedId = issue.number;
            return true;
        };

        return IssueList;
    }();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('no-selection',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NoSelection = exports.NoSelection = function NoSelection() {
    _classCallCheck(this, NoSelection);

    this.message = "Please Select an issue.";
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('issue-detail',['exports', './github-api'], function (exports, _githubApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.IssueDetail = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var IssueDetail = exports.IssueDetail = function () {
        IssueDetail.inject = function inject() {
            return [_githubApi.GithubApi];
        };

        function IssueDetail(api) {
            _classCallCheck(this, IssueDetail);

            this.api = api;
        }

        IssueDetail.prototype.activate = function activate(params, routeConfig) {
            var _this = this;

            this.routeConfig = routeConfig;

            return this.api.getIssueDetails(params.id).then(function (issue) {
                _this.issue = issue;
                _this.routeConfig.navModel.setTitle(issue.title);
            });
        };

        return IssueDetail;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./issue-list\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Angular Issues</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <issue-list class=\"col-md-4\">Issue List Placeholder</issue-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n  </div>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n  padding-top: 70px; }\n\nsection {\n  margin: 0 20px; }\n\na:focus {\n  outline: none; }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.no-selection {\n  margin: 20px; }\n\n.issue-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px; }\n\n.panel {\n  margin: 20px; }\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white; }\n\n.button-bar > button {\n  float: right;\n  margin: 20px; }\n\nli.list-group-item {\n  list-style: none; }\n\nli.list-group-item > a {\n  text-decoration: none; }\n\nli.list-group-item.active > a {\n  color: white; }\n\n.avatar {\n  height: 32px;\n  width: 32px; }\n\n.avatar-sm {\n  height: 12px;\n  width: 12px; }\n"; });
define('text!issue-list.html', ['module'], function(module) { module.exports = "    \r\n<template>\r\n  <div class=\"issue-list\">\r\n    <ul class=\"list-group\">\r\n      <li repeat.for=\"issue of issues\" class=\"list-group-item ${issue.number === $parent.selectedId ? 'active' : ''}\">\r\n        <a route-href=\"route: issues; params.bind: {id:issue.number}\" click.delegate=\"$parent.select(issue)\">\r\n          <h4 class=\"list-group-item-heading\">${issue.title}</h4>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n  "; });
define('text!no-selection.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"no-selection text-center\">\r\n    <h2>${message}</h2>\r\n  </div>\r\n</template>"; });
define('text!issue-detail.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-heading\">\r\n            <h3 class=\"panel-title\">${issue.title}</h3>            \r\n            <div class=\"media\">\r\n                <div class=\"media-left\">\r\n                    <img class=\"media-object avatar\" src=\"${issue.user.avatar_url}\">\r\n                </div>\r\n                <div class=\"media-body\">\r\n                    Submitted by <a href=\"\">${issue.user.login}</a> on ${issue.created_at}\r\n                </div>\r\n            </div>\r\n            <span repeat.for=\"lbl of issue.labels\" class=\"label\" style=\"background-color: #${lbl.color}\">\r\n                ${lbl.name}\r\n            </span>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <p class=\"col-md-10 col-xs-12\">${issue.body}</p>\r\n                <ul class=\"list-group col-md-2 col-xs-12\">\r\n                    <li class=\"list-group-item\">\r\n                        <h5>Assignees:<h5>\r\n                        <div if.bind=\"issue.assignee.login\">\r\n                            <div class=\"media\">\r\n                                <div class=\"media-left\">\r\n                                    <img class=\"media-object avatar-sm\" src=\"${issue.assignee.avatar_url}\">\r\n                                </div>\r\n                                <div class=\"media-body\">\r\n                                     ${issue.assignee.login}\r\n                                </div>\r\n                            </div>                           \r\n                        </div>\r\n                        <div if.bind=\"!issue.assignee.login\">\r\n                            No One Assigned\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map