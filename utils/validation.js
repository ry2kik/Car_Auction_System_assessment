import validator from 'validator'

export const validateAuctionData = (req) => {
    const { auctionStatus, startingPrice, startTime, endTime } = req.body;
    if (!auctionStatus || typeof auctionStatus != String || auctionStatus.trim == "" || auctionStatus == undefined)
        return "Auction Status is required and must be a non-empty string";

    if (!startingPrice || typeof startingPrice != Number || startingPrice.trim == "" || startingPrice == undefined)
        return "Stating price is required and must have a price";

    if (typeof startTime != String || typeof endTime != String)
        return "Start and End time must be a non-empty string";
}

