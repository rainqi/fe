require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cons = require("consolidate");
const basicAuth = require('basic-auth-connect');

const middleware = require("./middleware");
const routes = require("./routes");

const app = express();

if(process.env.SERVER_ENV == 'dev'){
    app.use(basicAuth(process.env.SERVER_AUTH_USERNAME, process.env.SERVER_AUTH_PASSWORD));
}
app.use(cors());
app.use(bodyParser.json());
app.engine("html", cons.nunjucks);
app.set("view engine", "html");
app.set("views", "../views");

middleware(app);
routes(app);

app.use("/", express.static("../assets"));

const APP_PORT = process.env.APP_PORT || 5899;

app.listen(APP_PORT, () => {
    console.log(`Listening on http:/localhost:${APP_PORT}`);
});
