var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from tbl_book', function(err, result) {
        cb(err, result);
      });
};

// UPDATE
exports.updateBook = function(book, cb){
  db.beginTransaction(function(err){
    if(err) cb(err, null);

    db.query('update tbl_book set title = ?, authorId = ?, publisherId = ? WHERE bookId = ?', [ book.title, book.authorId, book.publisherId, book.bookId], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      }

      db.commit(function(err, res){
        cb(err, res);
      });
    })
  })
};

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into tbl_book(title, authorId, publisherId) values(?,?,?)', [book.title, book.authorId, book.publisherId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          }
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from tbl_book where bookId = ?', [bookId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
    });
}