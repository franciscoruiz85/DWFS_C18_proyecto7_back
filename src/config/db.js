const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a la DB.');
    } catch (error) {
        console.error('Error al conectar la DB: ',error.message);
        process.exit(1);
    }
}

module.exports = connectDB
