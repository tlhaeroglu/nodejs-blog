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

async function checkLogin(username, password) {
  try {
    const res = await db().query("select * from users where username=$1 and password=$2", [username, password]);
    return res.rows;
  } catch (err) {
    return err.stack;
  } finally {
    db().end();
  }
}

module.exports ={
    findById,
    checkLogin
}