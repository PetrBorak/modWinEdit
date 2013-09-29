var services = angular.module("services",["ngResource"]);

services.factory("project",function($resource){
 return $resource('http://www.borakpetr.cz/abra/projects/:id',{projectId:"@id"}); 
});

services.factory("taskItem",function($resource){
 return $resource('http://www.borakpetr.cz/abra/tasks/:projectId',{projectId:"@id"}); 
});

services.factory("projectLoader",function($resource,$q,project){
 var defered = $q.defer();
 return function(){
  var projects = project.query(function(){
    
    defered.resolve(projects);
  });
  return (defered.promise); 
 } 
});

services.factory("simpleProjectLoader",function($resource,$q,project){
 var defered = $q.defer();
 return function(id){
  var projects = project.get({'_id':id}, function(){
    defered.resolve(project);
  });
  return (defered.promise); 
 } 
});

services.factory("tasksLoader",function($resource,$q,taskItem){
 return function(){
  var defered = $q.defer();
  console.log('tasks loasder');
  var tasks = taskItem.query(function(){
    console.log('tasks query');
    console.log(tasks);
    defered.resolve(tasks);
  });
  return defered.promise; 
 } 
});

services.factory("taskCreator",function(taskItem, $resource,$q){

 console.log('tasCreator id');
 
 return function(id,name,term,state,el){
 var defered = $q.defer();
 console.log(id);
  var task = new taskItem({id:id});
  console.log('id');
  console.log(id);
  task.name = name;
  task.term = term;
  task.state = state;
     
  task.$save(function(){
      $(el).modal('hide');
      console.log('item saved');
  });
}
});

services.factory("taskDeletor",function(taskItem, $resource,$q,$rootScope){

 console.log('tasCreator id');
 
 return function(id,el,scope){
 
 
 var defered = $q.defer();
 console.log(id);
  var task = new taskItem({id:id});
  console.log('scope in the service');
  console.log(scope);
 
  
  task.$delete(function(){
      $(el).modal('hide');
      console.log('item deleted');
      
      console.log(scope);


  });
}
});

services.factory("taskUpdater",function($rootScope, taskItem, $resource,$q){
 
 console.log('task updater');
 
 return function(id,name,term,state,el,scope){
 console.log('task updater name');
 console.log(name);
 var defered = $q.defer();
 console.log(id);
  var task = new taskItem();
  console.log('id');
  console.log(id);
  task.name = name;
  task.term = term;
  task.state = state.name;
  task._id = id;
  
  console.log('task updater');
     
  task.$save(function(){
      $(el).modal('hide');
      console.log('item saved');
      console.log(scope);
      scope.task.state = state.name;
      scope.task.name = name;
  });
}
});

