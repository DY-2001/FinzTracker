
# FinzTracker

Set alerts to find out if the desired exchange rate has been hit.User can typically create multiple alerts.
User cab be able to track if the alert has been triggered or not.


## Database Schema


```bash
const TriggerSchema = new mongoose.Schema({
  currencyPair: String,
  email: String,
  status: Boolean,
  value: Number,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
  },
  alertList: [TriggerSchema]
});

const User = mongoose.model("User", userSchema);

```

## API Contracts

### User Registration

```bash
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      alertList: [],
    });

    const savedUser = await user.save();

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

module.exports = register;

```

### Authentication: User Login

```bash
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Email is not found" });

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(500).json({
        success: false,
        message: "Invalid Password! Passwords do not match!",
      });

    // Create and send a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).header("Authorization").send({
      success: true,
      message: "Login Success",
      user: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err,
    });
  }
};

module.exports = login;

```

### Update User Info and Get User Info

```bash
const User = require("../models/User.js");
const mongoose = require('mongoose');

const updateUser = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 
    const updatedAlertList = {
        alertList: req.body.alertList
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedAlertList, {
      new: true, 
    });
    res.status(200).json({
        success: true,
        message: "User Info updated",
        user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 
    
    const user = await User.findById(userId);
    res.status(200).json({
        success: true,
        message: "User Info retrieved",
        user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
}

module.exports = { updateUser, getUserInfo };

```
    
### Design

[See DB Design and how frontend looks](https://docs.google.com/document/d/1VYaPXMkDduayXuSGOH3j6wppw0hMMzHj5yedoIEmywg/edit?usp=sharing)


## Run Locally

Clone the project

```bash
  git clone https://github.com/DY-2001/FinzTracker
```

Go to the project directory

```bash
  cd my-project/BackEnd-FinzTracker
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon server.js
```

For FrontEnd 
```bash
  cd my-project/FrontEnd-FinzTracker/my-app
```
Install dependencies
```bash
  npm install
```

Run
```bash
  npm Start
```
Goto localhost:3000


## Node Packages Used

- nodemailer
- cron (for scheduling)
- axios
- bcrypt
- nodemon

[for more details](https://github.com/DY-2001/FinzTracker)

