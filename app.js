const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/subscribe", function (req, res) {
  const fullname = req.body.name;
  const email = req.body.email;
  //  const { js } = req.body;

  const data = {
    members: [
      {
        full_name: fullname,
        email_address: email,
        status: "pending",
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  
// For security purpose my api key and unique key is hidden
  const url = "hidden";
  const options = {
    method: "POST",
    auth: "sourabh: hidden",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/public/success.html");
    } else {
      res.sendFile(__dirname + "/public/failure.html");
    }
    response.on("data", function (data) {
      // console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up and running at port 3000");
});


