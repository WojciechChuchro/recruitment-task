import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import router from "./router";
import cookieParser from "cookie-parser";
import cors from "cors";
export const dbConfig = {
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'database',
};

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.listen(process.env.PORT || 8081, () => {
  console.log(
    `Server is running on  http://localhost:${process.env.PORT || 8081}`
  );
});

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL successfully!");
  }
});

app.use("/api/", router());
