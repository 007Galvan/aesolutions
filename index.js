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

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

// app.use(bodyParser.json); // handle base64 payload

dotenv.config();

conectarDB();

app.use(express.json())
//decodifica la informacion y la convierte en formato json//
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/aesolutions/costumers", routerCostumers);
app.use("/aesolutions/users", routerUsers);
app.use("/aesolutions/activities", routerActivities);
app.use("/aesolutions/summary", routerSummary);


const port = process.env.PORT || 4000;

// app.listen(port, () => {
//     console.log(`escuchando en el puerto ${port}`);
// })

app.listen(4000, '0.0.0.0', () => {
  console.log("API running on port 4000");
});

const job = scheduleJob('0 0 * * * *', checkActivities);
// Handle errors
job.on('error', (error) => {
  console.error('Job error:', error);
});