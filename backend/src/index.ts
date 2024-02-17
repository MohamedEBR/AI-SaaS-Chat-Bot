import app from "./app.js";
import { connectToDataBase } from "./db/connection.js";

//connections and listeners
connectToDataBase().then(() => {
    app.listen(5000, () => console.log(`Server is listening at port 5000`))
})
.catch((err) => console.log(err));
