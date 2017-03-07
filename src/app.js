export class App {
  configureRouter(config, router){
    config.title = 'Coding Assignment';
    config.map([
      {route: '', moduleId: 'no-selection', title: 'Select'},
      {route: 'issue/:id', moduleId: 'issue-detail', name: 'issues'}
    ]);
    this.router = router;
  }
}
