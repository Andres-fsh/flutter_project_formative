const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('port', process.env.PORT || 4000);


app.use(cors());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api/v1/roles', require('./api/v1/routes/roles.routes'));
app.use('/api/v1/categoriesNews', require('./api/v1/routes/categoriesNews.routes'));
app.use('/api/v1/users', require('./api/v1/routes/users.routes'));
app.use('/api/v1/consultancies', require('./api/v1/routes/consultancies.routes'));
app.use('/api/v1/lineSennova', require('./api/v1/routes/lineSennova.routes'));
app.use('/api/v1/typeForms', require('./api/v1/routes/typeForm.routes'));
app.use('/api/v1/applicationForms', require('./api/v1/routes/applicationForm.routes'));
app.use('/api/v1/satisfactionSurveys', require('./api/v1/routes/satisfactionSurvey.routes'));
app.use('/api/v1/news', require('./api/v1/routes/news.routes'));
app.use('/api/v1/informationSennova', require('./api/v1/routes/informationSennova.routes'));
app.use('/api/v1/projectSennovas', require('./api/v1/routes/projectSennova.routes'));
app.use('/api/v1/projectsMonitoring', require('./api/v1/routes/projectsMonitoring.routes'));
app.use('/api/v1/auth', require('./api/v1/routes/auth.routes'));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});