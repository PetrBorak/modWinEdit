var controllers = angular.module("controllers",[]);

controllers.controller('projectsMain',['$scope','projectLoader',function(scope, projectLoader){
 projectLoader().then(function(data){
  scope.projectData = data;
 }) 
}]);

controllers.controller('TaskListController',['$scope','tasksLoader','$route','tasks', function(scope, taskLoader, route,tasks){
 scope.tasks = route.current.locals.tasks;
}])
