const express = require("express");
const bodyParser = require("body-parser");
const { logRequestStart } = require("./middleware/logger")
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8900;

app.use(cors());

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

console.log("which environment ?", app.get("env"));

// configure bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//register logger middleware
app.use(logRequestStart);

//register api route
require("./routes")(app);

//spin up server
app.listen(PORT, () => {
  console.log("server started on PORT http://localhost:" + PORT);
});
