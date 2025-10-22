import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
});

dealerSchema.methods.getJWT = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    }); 

    return token;
}

export default mongoose.model('Dealer', dealerSchema);