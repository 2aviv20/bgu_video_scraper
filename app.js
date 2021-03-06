const express = require('express');
const scraper = require("./scraper");
const queue = require("./queue");

const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/wakeup', async (req, res) => {
    res.status(200).send(`BGU VIDEO SCRAPER app listening on port ${port}!`);
})

app.post('/scrape/course', async (req, res) => {
    const code = req.body.code;
    const urls = await scraper.start(code);
    res.status(200).json(urls);
})

app.listen(port, () => console.log(`BGU VIDEO SCRAPER app listening on port ${port}!`))
//start listen to rabbitmq
queue.queue();