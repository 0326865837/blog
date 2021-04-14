var mysql = require("mysql");
var config = require("../config/default.js");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
});

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

let users = `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL ,
     pass VARCHAR(100) NOT NULL ,
     avator VARCHAR(100) NOT NULL ,
     moment VARCHAR(100) NOT NULL ,
     PRIMARY KEY ( id )
    );`;

let posts = `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL ,
     title TEXT(0) NOT NULL ,
     content TEXT(0) NOT NULL ,
     md TEXT(0) NOT NULL ,
     uid VARCHAR(40) NOT NULL ,
     moment VARCHAR(100) NOT NULL ,
     comments VARCHAR(200) NOT NULL DEFAULT '0' ,
     pv VARCHAR(40) NOT NULL DEFAULT '0' ,
     avator VARCHAR(100) NOT NULL ,
     PRIMARY KEY(id)
    );`;

let comment = `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL ,
     content TEXT(0) NOT NULL ,
     moment VARCHAR(40) NOT NULL ,
     postid VARCHAR(40) NOT NULL ,
     avator VARCHAR(100) NOT NULL ,
     PRIMARY KEY(id) 
    );`;

let createTable = (sql) => {
  return query(sql, []);
};

createTable(users);
createTable(posts);
createTable(comment);

// insert user
exports.insertData = (value) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;";
  return query(_sql, value);
};
// delete User
exports.deleteUserData = (name) => {
  let _sql = `delete from users where name="${name}";`;
  return query(_sql);
};
// find infomation of User
exports.findUserData = (name) => {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
};
//  create Post
exports.insertPost = (value) => {
  let _sql =
    "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;";
  return query(_sql, value);
};
//
exports.addPostCommentCount = (value) => {
  let _sql = "update posts set comments = comments + 1 where id=?";
  return query(_sql, value);
};
//
exports.reducePostCommentCount = (value) => {
  let _sql = "update posts set comments = comments - 1 where id=?";
  return query(_sql, value);
};

//
exports.updatePostPv = (value) => {
  let _sql = "update posts set pv= pv + 1 where id=?";
  return query(_sql, value);
};

//
exports.insertComment = (value) => {
  let _sql =
    "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;";
  return query(_sql, value);
};
//
exports.findDataByName = (name) => {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
};
//
exports.findDataCountByName = (name) => {
  let _sql = `select count(*) as count from users where name="${name}";`;
  return query(_sql);
};
//
exports.findDataByUser = (name) => {
  let _sql = `select * from posts where name="${name}";`;
  return query(_sql);
};
//
exports.findDataById = (id) => {
  let _sql = `select * from posts where id="${id}";`;
  return query(_sql);
};
//
exports.findCommentById = (id) => {
  let _sql = `select * from comment where postid="${id}";`;
  return query(_sql);
};

//
exports.findCommentCountById = (id) => {
  let _sql = `select count(*) as count from comment where postid="${id}";`;
  return query(_sql);
};

//
exports.findComment = (id) => {
  let _sql = `select * from comment where id="${id}";`;
  return query(_sql);
};
//
exports.findAllPost = () => {
  let _sql = `select * from posts;`;
  return query(_sql);
};
//
exports.findAllPostCount = () => {
  let _sql = `select count(*) as count from posts;`;
  return query(_sql);
};
//
exports.findPostByPage = (page) => {
  let _sql = ` select * from posts limit ${(page - 1) * 10},10;`;
  return query(_sql);
};
// Find Cout Post
exports.findPostCountByName = (name) => {
  let _sql = `select count(*) as count from posts where name="${name}";`;
  return query(_sql);
};

//find Post with page
exports.findPostByUserPage = (name, page) => {
  let _sql = ` select * from posts where name="${name}" order by id desc limit ${
    (page - 1) * 10
  },10 ;`;
  return query(_sql);
};
// update Post
exports.updatePost = (values) => {
  let _sql = `update posts set title=?,content=?,md=? where id=?`;
  return query(_sql, values);
};
//delete post
exports.deletePost = (id) => {
  let _sql = `delete from posts where id = ${id}`;
  return query(_sql);
};
// Delete comment
exports.deleteComment = (id) => {
  let _sql = `delete from comment where id=${id}`;
  return query(_sql);
};
// delete all Comment
exports.deleteAllPostComment = (id) => {
  let _sql = `delete from comment where postid=${id}`;
  return query(_sql);
};

//
exports.findPageById = (page) => {
  let _sql = `select * from posts limit ${(page - 1) * 5},5;`;
  return query(_sql);
};
//
exports.findCommentByPage = (page, postId) => {
  let _sql = `select * from comment where postid=${postId} order by id desc limit ${
    (page - 1) * 10
  },10;`;
  return query(_sql);
};
