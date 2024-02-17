import express from "express";

const app = express();


//middlewares
app.use(express.json());

//connections and listeners

app.listen(5000, () => console.log(`Server is listening at port 5000`))
