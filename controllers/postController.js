const post = require("../data/post.js");
const user = require("../data/user.js");
const comment = require("../data/comment.js");
const dateFormatter = require("../helpers/dateFormatter.js");



async function getPost(URL) {
  var obj = await post.findByUrl(URL);
  obj.userid = await user.findById(obj.userid);
  obj.comments = await comment.findByPostId(obj.id);
  for(let j = 0; j < obj.comments.length; j++){
    obj.comments[j].userid = await user.findById(obj.comments[j].userid);
  }
  obj.createdat = dateFormatter(obj.createdat);
  return obj;
}

async function renderPost(req, res){
  res.render("post/post", { post: await getPost(req.params.url) });
}

async function getPosts(query) {
  return await buildManyPost(await post.findAll(query.page, query.search));  
}

async function renderPosts(req, res){
  res.render("index", {posts: await getPosts(req.query), search: req.query.search}); 
}

async function buildManyPost(obj) {
  var len = obj.length;
  var i=0
  for (i; i < len; i++) {
    obj[i].userid = await user.findById(obj[i].userid); //relation users for post 
    obj[i].comments = await comment.findByPostIdLength(obj[i].id); //add comments for post
    obj[i].createdat = dateFormatter(obj[i].createdat); //add createdat for post
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

async function deletePost(req, res) {
  if (await post.deletePost(req.params.id)) {
    res.status(200).send("OK");
  } else {
    res.status(404).send("SERVER ERROR");
  }
}

function makeComment(req, res) {
  if( comment.createComment(1, req.body.id, req.body.content) ){
    res.redirect(req.get('referer'));
  } else {
    res.send("SERVER ERROR");
  }
}

module.exports = {
  renderPost,
  renderPosts,
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