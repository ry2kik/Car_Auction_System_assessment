import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    bidAmount: {
        type: Number,
        required: true
    },

    previousBid: {
        type: Schema.Types.ObjectId,
        ref: 'Bid'
    },

    timePlaced: {
        type: Date,
        default: Date.now
    },

    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    },

    dealerId: {
        type: Schema.Types.ObjectId,
        ref: 'Dealer'
    }
});

export default mongoose.model('Bid', bidSchema);