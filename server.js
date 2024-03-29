var express = require("express");

var PORT = process.env.PORT || 7000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
var db = require("./models");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgersController.js");

app.use(routes);
//app.use('/', routes);

//syncing our sequlize models and then starting our express app
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("listenning on http://localhost:" + PORT);
    });
});
