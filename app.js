const express = require('express')
const morgan = require('morgan')

const app = express();
app.use(morgan('dev'));
app.use(express.json())

// app.use((request, response, next) => {
//     console.log(request.method, request.url)
//     response.status(200).json({
//     message: 'It works baby!'
//     });
// });

app.use('/api/tasks', require('./api/routes/tasks'))
app.use(require('./api/middleware/not-found'))

module.exports = app;