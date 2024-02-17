import app from "./app.js";
import { connectToDataBase } from "./db/connection.js";

//connections and listeners
const PORT = process.env.PORT || 5000
connectToDataBase().then(() => {
    app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
})
.catch((err) => console.log(err));
