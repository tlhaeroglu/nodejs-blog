const user = require('../data/user.js');

async function login(req, res){
    var obj = await user.checkLogin(req.body.username, req.body.password);
    if(obj[0]){
        req.session.user = obj[0];
        res.redirect('/')
    } else {
        res.redirect('/login');
    }
    /*if(await user.login(req.body.username, req.body.password)){
        
    } else {
        res.redirect('/login')
    }*/
}

function logout(req, res){
    req.session.destroy();
    res.redirect('/');
}

function index(req, res){
    res.render('login')
}

function checkAuth(req, res, next){
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = {
    login,
    logout,
    index,
    checkAuth
}