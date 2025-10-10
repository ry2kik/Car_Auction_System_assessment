import mongoose from "mongoose";
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    auctionStatus: {
        type: String,
        enum: ["OPEN", "CLOSE"],
        default: "CLOSE",
        required: true,
        trim: true
    },

    startingPrice: {
        type: Number,
        required: true,
        trim: true
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

    carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        unique: true,
        required: true
    }
});

export default mongoose.model('Auction', auctionSchema);