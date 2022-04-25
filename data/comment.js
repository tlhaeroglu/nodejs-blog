const db = require("../data/DBConnection.js");

async function findByPostId(id) {
    try {
      const res = await db().query("select * from comments where post=$1", [id]);
      return res.rows;
    } catch (err) {
      return err.stack;
    } finally {
      db().end();
    }
}

async function findByPostIdLength(id) {
    try {
      const res = await db().query("select count(id) from comments where post=$1", [id]);
      return res.rows[0].count;
    } catch (err) {
      return err.stack;
    } finally {
      db().end();
    }
}

async function createComment(userid, post, content) {
  try {
      const res = await db().query(
      "INSERT INTO comments (userid,post,content) VALUES ($1, $2, $3)",
      [userid, post, content]
    );
    return true;
  } catch (err) {
    return false;
  } finally {
    db().end();
  }
}

async function deleteByPostId(id) {
  try {
    const res = await db().query( "DELETE FROM comments WHERE post=$1",[id] );
    return true;
  } catch (err) {
    return false;
  } finally {
    db().end();
  }
}



module.exports = {
    findByPostId,
    findByPostIdLength,
    createComment,
    deleteByPostId
}