import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerCostumers from "./routes/routerCostumers.js"
import routerUsers from "./routes/routerUsers.js"
import conectarDB from "./config/db.js";


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

dotenv.config();

conectarDB();

app.use(express.json())
//decodifica la informacion y la convierte en formato json//
app.use(express.urlencoded({extended:true}));

app.use("/aesolutions/costumers", routerCostumers)
app.use("/aesolutions/users", routerUsers);


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`);
})