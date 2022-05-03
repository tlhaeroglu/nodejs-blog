const express = require("express");
const db = require("../data/DBConnection.js");
const fs = require("fs");
const comments = require("./comment.js");

async function findAll(page, query) {
  try {
    page = page ? page : 1;
    query = query ? `where title ilike '%${query}%' or content ilike '%${query}%'` : '';
    const res = await db().query(`select count(*) OVER(), p.* from post p ${query}  order by p.id offset ${(page-1)*3} limit 3`);
    return res.rows;
  } catch (err) {
    return err.stack;
  } finally {
    db().end();
  }
}

async function findById(id) {
  try {
    const res = await db().query("select * from post where id=$1", [id]);
    return res.rows[0];
  } catch (err) {
    return err.stack;
  } finally {
    db().end();
  }
}

async function findByUrl(url) {
  try {
    const res = await db().query("select * from post where post_url=$1", [url]);
    return res.rows[0];
  } catch (err) {
    return err.stack;
  } finally {
    db().end();
  }
}

async function createPost(userid, title, content, img, url, d) {
  try {
    
    const res = await db().query(
      "INSERT INTO post (userid,title, content, img, post_url, createdat) VALUES ($1, $2, $3, $4, $5, $6)",
      [userid, title, content, img, url, d]
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    db().end();
  }
}

async function deletePost(id) {
  if(await comments.deleteByPostId(id)){
    try {
      const res = await db().query("DELETE FROM post WHERE id=$1 RETURNING img", [id]);
      console.log();
  
      if(res.rows[0].img != ''){
        fs.unlink('./public/img/'+res.rows[0].img , (err) =>{
          if(err){
            console.log(err);
          }
          console.log('File deleted!');
        })
      }
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      db().end();
    }
  }
}

module.exports = {
  findAll,
  findById,
  findByUrl,
  createPost,
  deletePost,
};
