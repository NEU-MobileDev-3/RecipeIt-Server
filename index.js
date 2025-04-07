import express from 'express';
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import RecipeRoutes from "./EndPoints/routes.js";
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json({limit: '200mb'}));
app.use(express.json());
app.use(cors());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "recipe-it",
    resave: false,
    saveUninitialized: false,
  };

app.use(session(sessionOptions));

RecipeRoutes(app)

const port = process.env.PORT || 4000

console.log(`🚀 Server is running on port ${port}`)

app.listen(port)