//  Scrape Script

// Require request and cheerio making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb)  {
    
    request("http://www.nytimes.com", function(err, res, body){
        
        var $ = cheerio.load(body);

        var articles = [];

        $(".css-lgwb6ca").each(function(i, element){
            
            var head = $(this).children(".css-o2lisy es182me0").text().trim();
            var sum = $(this).children(".css-lpfq5u eln8kpyg0").text().trim();

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