import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

export default mongoose.model('Dealer', dealerSchema);