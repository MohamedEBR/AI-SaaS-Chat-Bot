import { connect, disconnect } from "mongoose";

async function connectToDataBase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (err) {
        console.log("Error")
        throw new Error("Cannot connect to MongoDB")
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch( err) {
        console.log("Error")
        throw new Error("Cannot connect to MongoDB")
    }
}

export {connectToDataBase, disconnectFromDatabase};