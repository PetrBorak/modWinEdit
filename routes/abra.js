var projectabra = require('../data/models/projectabra');
var tasksabra = require('../data/models/task');
var async = require('async');



module.exports = function(app){

app.options('/abra/projects', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});


app.get('/abra/projects', function(req, res){
    projectabra.find(function(err,customers){
      console.log("item saved");
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Content-type"] = "application/JSON";
      res.writeHead(200, headers);
      res.end(JSON.stringify(customers));
      
    });
});


app.options('/abra/tasks', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

app.options('/abra/tasks/:id', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

app.options('/abra/tasks', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

app.post('/abra/tasks', function(req, res){
    
    var toDate = req.body.term.split("/");
    
    console.log('req.body.term');
    console.log(req.body.term);
    
    console.log('toDate');
    console.log(toDate);
    
    var newtodate = [];
    var count = 0;
    
    for(var i=(toDate.length - 1); i>=0; i--){
     newtodate[count] = toDate[i];
     count++;
    }
    
    console.log('new date');
    console.log(newtodate.join(','));
    console.log(newtodate);
    
    var newdate = new Date(newtodate.join(','));
    
    console.log('new date');
    console.log(newdate);
    
    tasksabra.update({_id:req.body._id},{name:req.body.name, term:newdate, state: req.body.state}, function(err){
     console.log("item saved");
     var headers = {};
     headers["Access-Control-Allow-Origin"] = "*";
     headers["Content-type"] = "application/JSON";
     res.writeHead(200, headers);
     res.end(JSON.stringify({updated:"yes"}));    
    })

});

app.delete('/abra/tasks/:id', function(req, res){
    console.log('req.params.id');
    console.log(req.params.id);
    
    tasksabra.findOne({_id:req.params.id}, function(err,task){
    console.log('task found');
    console.log(task);        
     task.remove(function(err){
     console.log("item removed");
     var headers = {};
     headers["Access-Control-Allow-Origin"] = "*";
     headers["Content-type"] = "application/JSON";
     res.writeHead(200, headers);
     res.end(JSON.stringify({removed:"yes"}));
     });    
    })

});

app.post('/abra/tasks/:id', function(req, res){
    projectabra.find({_id:req.params.id},function(err, project){
    var toDate = req.body.term.split("/");
    
    console.log('req.body.term');
    console.log(req.body.term);
    
    console.log('toDate');
    console.log(toDate);
    
    var newtodate = [];
    var count = 0;
    
    for(var i=(toDate.length - 1); i>=0; i--){
     newtodate[count] = toDate[i];
     count++;
    }
    
    console.log('new date');
    console.log(newtodate.join(','));
    console.log(newtodate);
    
    var newdate = new Date(newtodate.join(','));
    
    console.log('new date');
    console.log(newdate);
     
    var tasknew = new tasksabra;
    tasknew.name = req.body.name;
    tasknew.project = req.params.id,
    tasknew.term = newdate;
    tasknew.state = req.body.state.name;
    
    tasknew.save(function(err){
     console.log("item saved");
     var headers = {};
     headers["Access-Control-Allow-Origin"] = "*";
     headers["Content-type"] = "application/JSON";
     res.writeHead(200, headers);
     res.end(JSON.stringify({saved:"yes"}));
    });    
    })

});

app.get('/abra/tasks', function(req, res){
    var xbag = [];
    tasksabra.find(function(err,tasks){
    console.log('before each');
    async.each(tasks,function(item,callback){
      console.log('in the each before findOne');
      projectabra.findOne({_id:item.project},function(err, project){
      if(err){console.log(err);
      callback();
      }else{
        if(project){
        console.log('in the each in the findOne');
        console.log(project.name);
        console.log('item');
        console.log(typeof item);
        console.log(item);
        var tio = item.toObject();
        tio.projectName = project.name;
        xbag.push(tio);
        }
        
        callback();
      }
      
      });
    },function(err){
      console.log('tasks');
      console.log(tasks);
      if(tasks.length !=0){
      console.log("items fetched");
      console.log(tasks[0]);
      console.log(tasks[0].projectName);
      console.log(xbag);
      console.log(xbag[0]);
      }
      
      
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Content-type"] = "application/JSON";
      res.writeHead(200, headers);
      res.end(JSON.stringify(xbag));

});
});
});

}
