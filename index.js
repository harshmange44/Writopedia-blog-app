const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const verificationRoute = require("./routes/verifications");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended:true }
));

app.use(cors());

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("imgFile"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/verification", verificationRoute);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
