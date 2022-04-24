const express = require("express");
const db = require("../data/DBConnection.js");
const fs = require("fs");

async function findAll() {
  try {
    const res = await db().query("select * from post order by id");
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

async function createPost(userid, title, content, img) {
  try {
    
    const res = await db().query(
      "INSERT INTO post (userid,title, content, img) VALUES ($1, $2, $3, $4)",
      [userid, title, content, img]
    );
    return true;
  } catch (err) {
    return false;
  } finally {
    db().end();
  }
}

async function deletePost(id) {
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

module.exports = {
  findAll,
  findById,
  createPost,
  deletePost,
};
