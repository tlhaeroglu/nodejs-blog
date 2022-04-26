const user = require('../data/user.js');

async function login(req, res){
    if(await user.isValidUser(req.body.username, req.body.password)){
        req.session.user = true;
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
}

function index(req, res){
    res.render('login')
}



module.exports = {
    login,
    index
}