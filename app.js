const { json } = require("express");
const express = require("express");
const wbm = require("wbm");
const ejs = require("ejs");
const path = require("path");
const jsondata = require("./public/csvjson.json");


const app = express();

const Port = 5000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
let myNumbers = [];
let i = 0;
jsondata.forEach(element => {
  myNumbers [i] = element.No;
  i++;
});
app.post("/sendMessage", (req, res) => {
  let data = req.body.message;
  data.toString();
  console.log(data);
  wbm
    .start()
    .then(async () => {
let myNumbers = [];
      const phones = myNumbers;
      const message = await data;
      console.log(message);
      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => {console.log(err);
    });
  // It will open a browser, return the QR code data as promise and not keep user session
  wbm
    .start({ showBrowser: true, qrCodeData: true, session: false })
    .then(async (qrCodeData) => {
      // console.log(qrCodeData); // show data used to generate QR Code
      await wbm.waitQRCode();
      // waitQRCode() is necessary when qrCodeData is true
      // ...
      console.log("counter success"+counter.success)
      await wbm.end();
    })
    .catch((err) => {
      console.log(err);
      console.log("counter dalse"+counter.faild)
    });
  res.render("sendMessage");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(Port, (req, res) => {
  console.log(`App is running on port ${Port}`);
});
