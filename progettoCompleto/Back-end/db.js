//connettiamoci al database
import "dotenv/config"

import mongoose from "mongoose"

export async function connectDB() {
    console.log('Connesso al DB')
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI)
    }
    catch (err) {
        console.log(err)
    }
}