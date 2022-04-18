const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const homeRouter = require('./routes/homeRouter.js');
const adminHomeRouter = require('./routes/admin/homeRouter.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRouter);
app.use('/admin' ,adminHomeRouter);



app.listen(process.env.PORT || 5000, () => {
    console.log('------ http://localhost:5000/ ------');
});
