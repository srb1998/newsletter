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

  const url = "https://us6.api.mailchimp.com/3.0/lists/c07e9782c6";
  const options = {
    method: "POST",
    auth: "sourabh:0b432a8484576e1acb6424b184abc4b2-us6",
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

// api key - 0b432a8484576e1acb6424b184abc4b2-us60b432a8484576e1acb6424b184abc4b2-us6

// unique id - c07e9782c6
