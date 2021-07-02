import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { connect } from "mongoose";
import { BaseRouter } from "./routes/index";
import path from 'path';


const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/media', express.static(path.join(__dirname, 'media')))


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/tamuku";

(async () => {
  try {
    await connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
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
