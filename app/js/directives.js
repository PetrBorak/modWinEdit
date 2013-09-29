var directives = angular.module("directives",[]);

directives.directive('datataskmodal',function factory(){
 var ddo = {            
   priority: 10,
   replace: false,
   restrict: 'A',
   scope: false,
   controller: function($scope,$element){    
     this.passScope = function(){
     return $scope;
    }
   },
   link: function(scope,el,attr){
    
    scope.taskFormData = {
    taskName: "",
    taskTerm: "",
    state: ""
    };
    
    
    scope.$watch('projectId',function(val){
     scope.taskFormData.projectId = scope.projectId;
    });
   }
 };
 return ddo;
});

directives.directive('addTaskModal',function(simpleProjectLoader,taskCreator){
 var ddo = {
   priority: 10,
   templateUrl: 'app/templates/modalTask.html',
   replace: true,
   restrict: 'E',
   scope: false,
   link: function(scope,el,attr){

     scope.$on('showTaskModal',function(){
         scope.$apply();
         $(el).modal();
     });
     

 }}
 return ddo;
});

directives.directive('taskDone',function(taskUpdater){
 var ddo = {
   priority: 10,
   replace: true,
   restrict: 'A',
   scope: false,
   link: function(scope,el,attr){  
   $(el).bind('click',function(event){
    taskUpdater(scope.task._id,scope.task.name,scope.task.term,{name:'done'},el,scope);
   });
   
   
 }}
 return ddo;
});

directives.directive('taskModalUnique',function(taskCreator,taskUpdater,taskDeletor){
 var ddo = {
   
   priority: 0,
   restrict: 'A',
   scope: true,
   require:'^datataskmodal',
   link: function(scope,el,attr,ctrl){
   var editTask = $(el).attr('edit-task');
   var passedScope = ctrl.passScope();
     
    passedScope.taskFormData.states = [
     {name: 'in process'},
     {name: 'waiting'},
     {name: 'done'}
     ];
           
   if(editTask == 'false'){
         
    $(el).bind('click',function(event){ 
     var passedScope = ctrl.passScope();
    
     var state = {
     name: 'waiting' 
     }
     
     passedScope.taskFormData.state = state;
     
     passedScope.taskFormData.taskTerm = "";
     passedScope.taskFormData.taskName = "";
     
     passedScope.addToProject = true;
     passedScope.projectId = attr.projectId;
     passedScope.projectName = attr.projectName;
     passedScope.addToProject = true;
     scope.$emit('showTaskModal',editTask);  
    });
    
     passedScope.addProject = function(){
     taskCreator(scope.taskFormData.projectId,scope.taskFormData.taskName,scope.taskFormData.taskTerm,scope.taskFormData.state,el); 
    }
    
   } else {  
     $(el).bind('click',function(event){
     
     var passedScope = ctrl.passScope();
     passedScope.addToProject = false;
     passedScope.taskId = editTask;
     passedScope.taskFormData.taskName = scope.task.name;
     
     var term = scope.task.term.slice(0,10);
     term = term.split('-');
     var newterm = [];
     var counter = 0;
     
     for(var i = (term.length-1) ;i >= 0; i--){
      newterm[counter] = term[i];
      counter++; 
     }
     
     newterm = newterm.join('/'); 
      
     passedScope.taskFormData.taskTerm = newterm;
    
     var state = {
     name: scope.task.state 
     }
     
     passedScope.taskFormData.state = state;
     
     passedScope.taskFormData.taskProjectName = scope.task.projectName;
     
     passedScope.removeTask = function(){
      var idtor = attr.editTask;
      console.log(idtor);
 
       for(var i = 0; i < passedScope.$$childHead.tasks.length; i++){
       if(passedScope.$$childHead.tasks[i]._id == scope.task._id){
          console.log('iteration pass');
          spb = i - 1;
          passedScope.$$childHead.tasks.splice(i,1);
          scope.$destroy();
       } 
      }
 
        
      taskDeletor(idtor,el,scope);
    }
    
     scope.$emit('showTaskModal',editTask);  
    });
    
     passedScope.addProject = function(){
     taskUpdater(scope.task._id,scope.taskFormData.taskName,scope.taskFormData.taskTerm,scope.taskFormData.state,el,scope); 
    };

    
   }
  }
  }
   
   return ddo;
   
 }
);

directives.directive('datepicker',function(){
 var ddo = {
   priority: 10,
   replace: true,
   restrict: 'A',
   require: 'ngModel',
   link: function(scope,el,attr,ctrl){
     console.log(el);
     $(el).datepicker({
     dateFormat: 'dd/mm/yy',
     onSelect: function(date){
     ctrl.$setViewValue(date);
     scope.$apply();
     }
     });
   }
 };
 return ddo;
});