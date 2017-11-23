// server.js
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

    url = 'http://www.imdb.com/title/tt1856101/';

    request(url, function(error, response, html){

        //check for errors
        if(!error){
            //cheerio gives psuedo jQuery functionality
            var $ = cheerio.load(html);

        var title, release, rating;
        var json = {title: "", release: "", rating: ""};
            
            $('.title_wrapper').filter(function(){

                var data = $(this);

                title = data.children().first().text();

                json.title= title;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File written');
        })
        
        res.send(title)
    })
})



app.listen('8080')

console.log('scraper up on port 8080')

exports = module.exports = app;