const app = require("./app");
const User = require("./models/User.js");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const moment = require("moment");
const axios = require("axios");

const { connectDB } = require("./config/db");
const port = process.env.PORT || 4000;
connectDB();

app.listen(port, () => {
  console.log(`ATMOS Backend server started on port ${port}`);
});

let currencies;
cron.schedule("*/20 * * * * *", async () => {
  console.log(
    "running a task every second",
    moment().format("DD MMM YYYY hh:mm:ss A")
  );

  const apiUrl =
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VlaXc4cUk56m0nKufVY5G50lIf9bhYZEee2bLi6l";

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    currencies = data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const allUsers = await User.find();
  let allAlerts;
  for (let i = 0; i < allUsers.length; i++) {
    let alerts = allUsers[i].alertList;
    for (let j = 0; j < alerts.length; j++) {
      let basecurrency = alerts[j].currencyPair.split("-")[0];
      let chargecurrency = alerts[j].currencyPair.split("-")[1];
      let needvalue = alerts[j].value;
      let valueRightNow = currencies[chargecurrency] / currencies[basecurrency];
      //   console.log("fad", needvalue, " ", parseFloat(needvalue), " ", parseFloat(valueRightNow))
      if (parseFloat(needvalue) <= parseFloat(valueRightNow) && alerts[j].status === false) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          pool: true, // This is the field you need to add
          auth: {
            user: "dush4211@gmail.com",
            pass: "zyippxvsjqmkzdcg",
          },
        });

        const info = {
          from: "dush4211@gmail.com",
          to: `${alerts[j].email}`,
          subject: "currency alert",
          text: `Your ${chargecurrency} currency value hits the desired ${needvalue} value in reference of ${basecurrency}`,
        };

        transporter.sendMail(info, (err, result) => {
          if (err) {
            console.log("Error in sending Mail", err);
          } else {
            console.log("Mail sent successfully", info);
          }
        });

        alerts[j].status = true;
        const updatedAlertList = {
          alertList: alerts,
        };
        const updatedUser = await User.findByIdAndUpdate(
          allUsers[i]._id,
          updatedAlertList,
          {
            new: true,
          }
        );
      }
    }
  }
});
