const db = require("../data/DBConnection.js");
const post = require("../data/post.js");
const user = require("../data/user.js");
const comment = require("../data/comment.js");
const dateFormatter = require("../helpers/dateFormatter.js");



async function getPost(req, res) {
  var obj = await post.findByUrl(req.params.url);
  obj.userid = await user.findById(obj.userid);
  obj.comments = await comment.findByPostId(obj.id);
  for(let j = 0; j < obj.comments.length; j++){
    obj.comments[j].userid = await user.findById(obj.comments[j].userid);
  }
  obj.createdat = dateFormatter(obj.createdat);
  res.render("post/index", { post: obj });
}

async function getPosts(req, res) {
    var query = req.query.search ? `where title ilike '%${req.query.search}%' or content ilike '%${req.query.search}%'` : '';
    var page = req.query.page ? req.query.page : 1;
    var obj = await post.findAll(page, query);
    res.render("index", { posts: await buildManyPost(obj) });
   
}

async function buildManyPost(obj) {
  var len = obj.length;
  for (let i = 0; i < len; i++) {

    //relation users for post 
    obj[i].userid = await user.findById(obj[i].userid);
    //add comments for post
    obj[i].comments = await comment.findByPostIdLength(obj[i].id);
    //add createdat for post
    obj[i].createdat = dateFormatter(obj[i].createdat);

  }
  return obj;
}

async function createPost(req, res) {
  if(req.file){
    if ( await post.createPost(req.body.userid, req.body.title, req.body.content, req.file.filename, slugify(req.body.title), new Date() ) ) {
      res.redirect("/");
    } else {
      res.send("SERVER ERROR");
    }
  } else{
    if ( await post.createPost(req.body.userid, req.body.title, req.body.content, '', slugify(req.body.title), new Date() ) ) {
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
}

function makeComment(req, res) {
  if( comment.createComment(req.session.user.id, req.body.id, req.body.content) ){
    res.redirect(req.get('referer'));
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

function slugify(text) {
  var trMap = {
      'çÇ':'c',
      'ğĞ':'g',
      'şŞ':'s',
      'üÜ':'u',
      'ıİ':'i',
      'öÖ':'o'
  };
  for(var key in trMap) {
      text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
  }
  return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
              .replace(/\s/gi, "-") // convert spaces to dashes
              .replace(/[-]+/gi, "-") // trim repeated dashes
              .toLowerCase();

}