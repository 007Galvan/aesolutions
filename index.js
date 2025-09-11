import express  from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { scheduleJob } from "node-schedule";
import { checkActivities } from "./controller/activitiesController.js";
import routerCostumers from "./routes/routerCostumers.js"
import routerUsers from "./routes/routerUsers.js"
import routerActivities from "./routes/routerActivities.js";
import routerSummary from "./routes/routerSummary.js";
import conectarDB from "./config/db.js";
// import bodyParser from "body-parser";


const app = express();

// ✅ Define allowed domains (local + production)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173", 
  "https://aesolutions-production.up.railway.app"
];

//  CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(" Bloqueado por CORS:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //  allow all needed methods
  allowedHeaders: ["Content-Type", "Authorization"], // allow common headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests
app.use(express.json())
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "*", // allow your frontend
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all needed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // headers your frontend sends
// }));
// app.options("*", cors()); // allow preflight for all routes


// app.use(bodyParser.json); // handle base64 payload

dotenv.config();

conectarDB();


//decodifica la informacion y la convierte en formato json//
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/aesolutions/costumers", routerCostumers);
app.use("/aesolutions/users", routerUsers);
app.use("/aesolutions/activities", routerActivities);
app.use("/aesolutions/summary", routerSummary);


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`);
})

// app.listen(4000, '0.0.0.0', () => {
//   console.log("API running on port 4000");
// });

const job = scheduleJob('0 6 * * * *', checkActivities);
// Handle errors
job.on('error', (error) => {
  console.error('Job error:', error);
});