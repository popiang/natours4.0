const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!',
        app: 'Natour 4.0',
    });
});

app.post('/', (req, res) => {
    res.status(200).send('You can post to this endpoint...');
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
