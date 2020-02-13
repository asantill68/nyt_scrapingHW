//  Scrape Script

// Require request and cheerio making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb)  {
    
    request("http://www.nytimes.com", function(err, res, body){
        
        var $ = cheerio.load(body);

        var articles = [];

        $(".classnamehere").each(function(i, element){
            
            var head = $(this).children(".classNameHere").text().trim();
            var sum = $(this).children(".classNameHere").text().trim();

            if(head && sum){
                //  Rejex method
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                
                var dataToAdd = {
                    headline:  headNeat,
                    summary:  sumNeat
                };

                articles.push(dataToadd)
            }
        })
        cb(articles)
    })
}

module.exports = scrape;