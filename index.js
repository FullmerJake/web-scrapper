const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.theguardian.com/uk'


axios(url)
.then(response => {
    const html = response.data
    //Whenever we use the $ from now on, we're essentially refereing to the whole HTML document
    const $ = cheerio.load(html)
    const articles = []
    //When we find something with this class, do this function
    $('.fc-item__title', html).each(function(){
        //Add the title and url to the articles array
        const title = $(this).text()
        const url = $(this).find('a').attr('href')
        articles.push({
            title,
            url
        })
    })
    console.log(articles)
})
.catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
