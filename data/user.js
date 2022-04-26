const express = require("express");
const db = require("../data/DBConnection.js");

async function findById(id) {
    try {
      const res = await db().query("select * from users where id=$1", [id]);
      return res.rows[0];
    } catch (err) {
      return err.stack;
    } finally {
      db().end();
    }
}

async function isValidUser(username, password) {
  try {
    const res = await db().query("select id from users where username=$1 and password=$2", [username, password]);
    return res.rows.length > 0;
  } catch (err) {
    return false;
  } finally {
    db().end();
  }
}


module.exports ={
    findById,
    isValidUser
}