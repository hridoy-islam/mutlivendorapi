const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const app = express();
var corsOptions = {
  origin: "http://localhost:8080"
};

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/multivendorapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log("Connected to MongoDB..."))
.catch((err) => console.error(err));

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bp.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
app.use(bp.urlencoded({
  extended: false
}));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});