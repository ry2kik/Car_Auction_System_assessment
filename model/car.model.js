import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },

    model: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


const carModel = mongoose.model('Car', carSchema);
export default carModel;