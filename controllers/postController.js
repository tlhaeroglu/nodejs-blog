const db = require("../data/DBConnection.js");
const post = require("../data/post.js");
const user = require("../data/user.js");
const comment = require("../data/comment.js");



async function getPost(req, res) {
  var obj = await post.findById(req.params.id);
  obj.userid = await user.findById(obj.userid);
  obj.comments = await comment.findByPostId(obj.id);
  for(let j = 0; j < obj.comments.length; j++){
    obj.comments[j].userid = await user.findById(obj.comments[j].userid);
  }
  res.render("post/index", { post: obj });
}

async function getPosts(req, res) {
  if(req.session.user){
    var obj = await post.findAll();
    res.render("index", { posts: await buildManyPost(obj) });
  } else{
    res.redirect('/login');
  }
  
}

async function buildManyPost(obj) {
  var len = obj.length;
  for (let i = 0; i < len; i++) {

    //relation users for post 
    obj[i].userid = await user.findById(obj[i].userid);
    //add comments for post
    obj[i].comments = await comment.findByPostIdLength(obj[i].id);

  }
  return obj;
}

async function createPost(req, res) {
  if(req.file){
    if ( await post.createPost(req.body.userid, req.body.title, req.body.content, req.file.filename) ) {
      res.redirect("/");
    } else {
      res.send("SERVER ERROR");
    }
  } else{
    if ( await post.createPost(req.body.userid, req.body.title, req.body.content, '') ) {
      res.redirect("/");
    } else {
      res.send("SERVER ERROR");
    }
  }
  
}

async function deletePost(req, res, next) {
  if (await post.deletePost(req.params.id)) {
    res.status(200).send("OK");
    //next();
  } else {
    res.status(404).send("SERVER ERROR");
  }

  /*var img = await post.deletePost(req.params.id);
  
  res.status(200).send("OK");*/
}

function makeComment(req, res) {
  if( comment.createComment(3, req.body.id, req.body.content) ){
    res.redirect('/post/'+req.body.id);
  } else {
    res.send("SERVER ERROR");
  }
}

module.exports = {
  getPost,
  getPosts,
  createPost,
  deletePost,
  makeComment
};
