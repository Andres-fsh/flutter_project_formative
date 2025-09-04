// Including Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'producion') {
    require('dotenv').config();
    
}

// settings
app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api/v1/roles', require('./api/v1/routes/roles.routes'));
app.use('/api/v1/categoriesNews', require('./api/v1/routes/categoriesNews.routes'));
app.use('/api/v1/users', require('./api/v1/routes/users.routes'));


app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});