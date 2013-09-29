var routermod = angular.module("routermod",["ngResource"]);

routermod.config(function($routeProvider){
    $routeProvider.when('/projects',{controller:'projectsMain',
    templateUrl:'app/templates/projects.html'}).when('/',
    {controller:'TaskListController',
    resolve:{tasks: function(tasksLoader){return tasksLoader();}
    }
    ,templateUrl:'app/templates/tasks.html'})
 });


