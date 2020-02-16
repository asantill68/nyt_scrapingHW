//  Global bootbox
$(document).ready(function(){
    //  Setting a reference to the article-container div where all the dynamic content will go
    //  Adding event listener to any dynamically generated "save article"
    //  and "scrape new article" bottons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    //  Once the page is ready, run the initPage function to kick things off
    initPage();

    function initPage(){
        //  Empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/healine?saved=false")
            .then(function(data){
                //  If we have headlines, render them to the page
                if(data && data.length){
                    renderArticles(data);
                }
                else{
                    renderEmpty();
                }
            })
    }

    function renderArticles(articles){
        //  This function handles apending HTML containing our article data to the page
        //  We are passed an array of JSON containing all available articles in our database
        var articlePanels = [];
        //  We pass each article JSON object to the createPanel function which returns to bootstrap
        //  Panel with our article data inside
        for(var i=0; i<articles.length; i++){
            articlePanels.push(createPanel(articles[i]));
        }
        //  Once we have all of the HTML for the articles stored in our articlePanels array
        //  Append them to the articlePanels container
        articleContainer.append(articlePanels);
    }

    function createPanel(article){
        //  This funtion takes in a single JSON object for an article/headline
        //  If constructs a JQuery element containing all of the formatted HTML for the article panel
        var panel = 
        $(["<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",            
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"
            ].join(""));
            //  We attach the article's id to the JQuery element
            //  We will use this when trying to figure out which article the user wants to save
        panel.data("_id", article._id);
        //  We return the constructed panel JQuery element
        return panel;
    }

    function renderEmpty(){
        //  This function renders some HTML to the pate explaining we do not have any articles to view
        //  Using a joined array of HTML string data because it's easier to read/change than a concatenated string
        var emptyAlert =
        $(["<div class='alert alert-warning text-center'>",
            "<h4>Uh Oh.  Looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>What would you like to do?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a href='/scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        //  Appending this data to the page
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        //  This function is triggered when the user wants to save an article
        //  When we rendered the article initially, we attached a javascript object containing the healine id
        //  to the element using the .data method.  Here we retrive that.
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        //  Using a patch metho to be semantic since this is an update to an existing record in our collection
        $.ajax({
            method:  "PATCH",
            url:    "/api/headlines",
            data:   articleToSave
        })
        .then(function(data){
            //  If successful, mongoose will send back an object containing a key of "ok" with the value of 1
            //  (Which casts to true)
            if(data.ok){
                //  Run the  initPage function again.  This will reload the entire list of articles
                initPage();
            }
        })
    }

    function handleArticleScrape(){
        //  This function handles the user clicking any "scrape new article" buttons
        $.get("/api/fetch")
            .then(function(data){
                //  If wa are able to successfully scrape the NYTIMES and compare the articles to those
                //  already in our collection, re render the articles on the page
                //  and let the user know how many articles we were able to save
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.mesage + "</h3>")
            })
    }
})