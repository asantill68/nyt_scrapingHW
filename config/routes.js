module.exports = function(router){

    //  This Route renders the homepage
    router.get("/", function(req, res){
        res.render("home");
    });
    //  This Route renders the saved handlebars page
    router.get("/saved", function(req,res){
        res.render("saved");
    })
}