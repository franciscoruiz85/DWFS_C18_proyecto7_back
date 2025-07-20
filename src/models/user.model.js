const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default: ''
        },
        phone: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ["Administrador", "Usuario"],
            default: "Usuario"
        },
        cart: {
            type: mongoose.Types.ObjectId,
            ref: "Cart",
            default: []
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
