requirejs.config({
 paths:{
   "baseurl":"app/js",
   "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
   "angularjs":"http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min",
   "angularjsresource":"http://code.angularjs.org/1.1.5/angular-resource",
   "controllers":"controllers",
   "services":"services",
   "directives":"directives",
   "bootstrap":"../bootstrap/js/bootstrap",
   "router":"router",
   "jqueryui":"http://code.jquery.com/ui/1.10.3/jquery-ui"
  },
 "shim": {         
  "router": ["angularjs","jquery","angularjsresource"],
  "controllers":["angularjs","jquery","angularjsresource"],
  "directives":["angularjs","jquery","angularjsresource","jqueryui"],
  "services":["angularjs","jquery","angularjsresource","jqueryui"],
  "bootstrap":["jquery","jqueryui"],
  "angularjsresource":["angularjs"],
  "jqueryui":["jquery"]
 }
});

requirejs(['app/js/mainApp.js']);
