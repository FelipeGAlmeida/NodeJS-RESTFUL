const express = require('express');
const app = express();

app.use((request, response, next) => {
    console.log(request.method, request.url)
    response.status(200).json({
    message: 'It works baby!'
    });
});

module.exports = app;