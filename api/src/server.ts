import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { BaseRouter } from "./routes/index";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/tamuku";

(async () => {
  try {
    await connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(error);
  }
})();
app.get('/test', (req, res) => {
  return res.status(200).json({
    msg: 'TESTING API'
  })
})
app.use("/", BaseRouter);

app.listen(PORT, () =>
  console.log(`SERVER RUNNING AT http://localhost:${PORT}`)
);
