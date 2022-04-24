const db = require("../data/DBConnection.js");
const post = require("../data/post.js");
const user = require("../data/user.js");



async function getPost(req, res) {
  var obj = await post.findById(req.params.id);
  obj.userid = await user.findById(obj.userid);
  console.log(obj);
  res.render("post/index", { posts: await mergePostUser(obj) });
}

async function getPosts(req, res) {
  var obj = await post.findAll();
  /*  NOT WORKED SO INTERESTING
  await obj.map(async u =>{
        u.userid = await data.getByIdUser(u.userid);
  })*/

  //res.json(await mergePostUser(obj)); api mode
  res.render("index", { posts: await mergePostUser(obj) });
}

async function mergePostUser(obj) {
  var len = obj.length;
  for (let i = 0; i < len; i++) {
    obj[i].userid = await user.findById(obj[i].userid);
  }
  return obj;
}

async function createPost(req, res) {
  if (
    await post.createPost(req.body.userid, req.body.title, req.body.content, req.file.filename)
  ) {
    // console.log("body :",req.body)
    // console.log("file :",req.file)

    res.redirect("/");
  } else {
    res.send("SERVER ERROR");
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

module.exports = {
  getPost,
  getPosts,
  createPost,
  deletePost,
};
