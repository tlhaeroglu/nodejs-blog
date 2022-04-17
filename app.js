const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req,res) =>{
    res.render('index')
})

app.get('/admin', (req,res) =>{
    res.render('admin/index')
})


app.listen(process.env.PORT || 5000, () => {
    console.log('server started');
})
