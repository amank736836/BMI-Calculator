const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.query);
  res.send("Hello World");
});

app.post("/bmi", (req, res) => {

  let obj = req.body;
  let data;
  let bmi = [];
  let flag = true;
  try {
    let bmi_data = fs.readFileSync("bmi.json");
    if (bmi_data != "") {
      bmi = JSON.parse(bmi_data);
    }
    bmi.filter((item) => {
      if(item.name == obj.name && item.age == obj.age
        && item.gender == obj.gender && item.height == obj.height
        && item.weight == obj.weight){
          data = item;
        flag = false;
      }
      return true;
    });
  } catch (err) {
    fs.writeFileSync("bmi.json", JSON.stringify([]));
    bmi = [];
  } finally {
    if(flag){
      
      let height = 0;
      let weight = 0; 
      height = parseFloat(obj.height);
      height = height / 100;
      weight = parseFloat(obj.weight);
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
          return ({ error: 'Invalid height or weight provided' });
      }
      let bmi_data = weight / (height * height);

      let data = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        bmi: bmi_data.toFixed(2),
      };

      bmi.push(data);
      fs.writeFileSync("bmi.json", JSON.stringify(bmi));
    }
  }
  res.send(JSON.stringify(data));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
