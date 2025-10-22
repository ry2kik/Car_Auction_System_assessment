import { validateAuctionData } from "../utils/validation.js";
import Auction from '../model/auction.model.js';
import Dealer from "../model/dealer.model.js";
// import User from '../model/user.model.js';
import Bid from '../model/bid.model.js';
import Car from '../model/car.model.js';

export const createCarController = async (req, res) => {
    try {
        const { make, model, year } = req.body;
        if (!make || !model || !year)
            return res.status(400).json({ message: "Have to fill all the fields" });

        // Car is a Mongoose model; construct it with an object
        const car = new Car({ make, model, year });
        await car.save();
        return res.status(201).json({ message: "Car created successfully", car });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const createAuctionController = async (req, res) => {
    try {
        validateAuctionData(req);
        const { auctionStatus, startingPrice, startTime, endTime, carId } = req.body;
        const auction = new Auction({ auctionStatus, startingPrice, startTime, endTime, carId });
        await auction.save();
        res.status(201).json({ message: 'Auction created successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error in creating auction', error: error.message })
    }
}

export const startAuctionController = async (req, res) => {
    try {
        const { auctionId } = req.params;
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { auctionStatus: "OPEN" },
            { new: true }
        );

        if (!auction) return res.status(400).json({ message: 'Auction not found' });
        res.status(200).json({ message: 'Auction started successfully ', auction });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const createDealerController = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password)
            return res.status(400).json({ message: "All the fields should be filled" });

        const exist = await Dealer.findOne({ email: email });
        if (exist)
            return res.status(400).json({ message: "Dealer already exist" });

        const dealer = new Dealer({ 
            userName, 
            email, 
            password,
            role: role ? "Admin" : "User" 
        });
        await dealer.save();
        return res.status(201).json({ message: "New Dealer created", dealer });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const winnerBidsController = async (req, res) => {
    try {
        const { auctionId } = req.params;
        const highestBid = await Bid.findOne({ auctionId: auctionId })
            .sort({ bidAmount: -1 })
            .populate('dealerId')
            .populate('auctionId');


        if (!highestBid)
            return res.status(400).json({ message: "No bids found for this auction" });

        return res.status(200).json({ message: "Highest bid fetched successfully", bid: highestBid });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const placeBidsController = async (req, res) => {
    try {
    const { bidAmount, auctionId, dealerId } = req.body;
    const auction = await Auction.findById(auctionId);
        if (!auction || auction.auctionStatus != "OPEN")
            return res.status(400).json({ message: "Auction not found or not open" });

    const prevBid = await Bid.findOne({ auctionId: auctionId }).sort({ bidAmount: -1 });
    if (prevBid && bidAmount <= prevBid.bidAmount && bidAmount < auction.startingPrice)
            return res.status(400).json({ message: 'Bid must be greater than the current highest bid' });

        const bid = new Bid({ 
            bidAmount, 
            previousBid: prevBid ? prevBid._id : null,
            timePlaced: Date.now(),
            auctionId, 
            dealerId, 
        });
        await bid.save();

        return res.status(200).json({ message: "Bid placed successfully", bid });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const genarateToken = async (req, res) => {
    try {
        const { userName, role, password } = req.body;
        if (!userName || !role || !password)
            return res.status(400).json({ message: 'All the fields should be filled' });
        
        const dealer = await Dealer.findOne({ userName });
        if (!dealer) 
            return res.status(400).json({ message: "Dealer doesn't exist" });

        if (role == 'Admin' && password == 'Admin') {
            const token = await dealer.getJWT();
            return res.status(200).json({ message: "Token granted successfully", token });
        }

        return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
        return res.status(400).json({ message: 'Error in genarating token ', error: error.message });
    }
}