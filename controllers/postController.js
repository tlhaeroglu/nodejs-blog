const express = require('express')
const db = require('../data/DBConnection.js');



function getPosts(req, res) {
    db().query('SELECT * FROM post', (err, results) => {
        if (err) {
            res.status(404).json({ error: err.stack });
        } else {
            res.render("index", { posts: results.rows });
        }
        db().end();
    });
  
}

module.exports = {
    getPosts
}

