const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

// set up of router  can use ./router also because by default its /index
app.use('/', require('./routers/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`server running on port: ${port}`);
});