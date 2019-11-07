var routes = require('express').Router(); // get routing object from express module, info from main to be routed here 
var db = require('../dao/db');
var authorDao = require('../dao/authorDao'); // module created by chris

routes.get('/author',function(req,res){ // defines a get mapping and endpoint
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;

      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

// CREATE
routes.post('/author', function(req,res){
  var author = req.body;

  authorDao.addAuthor(author, function(error, result){
    if(error){
      res.status(400);
      res.send('Add Author Failed!');
    }
    res.status(201);
    res.send('Add Author Successful!');
  });
});

// UPDATE
routes.put('/author/:id', function(req,res){
  var author = req.body;
  author.authorId = req.params.id

  authorDao.updateAuthor(author, function(error, result){
    if(error){
      res.status(400);
      res.send('Update Author Failed!');
    }
    res.status(201);
    res.send('Update Author Successful!');
  });
});

// DELETE
routes.delete('/author/:id', function(req, res){
  authorDao.deleteAuthor(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Author Failed!');
    }
    res.send('Delete Author Successful!');
  });
});

module.exports = routes;
