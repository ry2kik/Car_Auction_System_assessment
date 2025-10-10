import express from 'express'
import { createCarController, createAuctionController, createDealerController, startAuctionController, winnerBidsController, placeBidsController, genarateToken } from '../controller/auction.controller.js';
import userAuth from '../middleware/authentication.js';
const router = express.Router();

router.post('/createCar', createCarController);
router.post('/createDealer', createDealerController);
router.post('/createAuction', userAuth, createAuctionController);
router.patch('/status/:auctionId', userAuth, startAuctionController);
router.get('/:auctionId/winner-bid', userAuth, winnerBidsController);
router.post('/placeBids', userAuth, placeBidsController);
router.post('/token', genarateToken);

export default router;