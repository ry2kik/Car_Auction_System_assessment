# Car Auction System

Lightweight Express + Mongoose API for managing vehicle auctions. This repository provides endpoints to create cars and auctions, place bids, and fetch auction winners.

Contents
- `app.js` — application entry point
- `routes/app.routes.js` — route definitions
- `controller/auction.controller.js` — request handlers
- `model/*.js` — Mongoose models for Car, Auction, Bid, Dealer
- `utils/validation.js` — request validation helpers

Prerequisites
- Node.js 18+ (or compatible LTS)
- npm
- MongoDB (local or Atlas)

Quick start
1. Copy `.env.example` to `.env` and set values (PORT and MONGO_URL):

```bash
cp .env.example .env
```

2. Install dependencies and start the server:

```bash
npm install
npm start
```

3. Server will be available at `http://localhost:<PORT>` (default in `.env.example` is 3000).

API endpoints
All routes are mounted under `/api/v1/auction`.

1) Create a car
- Method: POST
- URL: `/api/v1/auction/createCar`
- Body (JSON): `{ "make": "Toyota", "model": "Corolla", "year": "2020" }`
- Success: 201 Created, returns the saved car document.

2) Create an auction
- Method: POST
- URL: `/api/v1/auction/createAuction`
- Body: `{ "auctionStatus": "CLOSED", "startingPrice": 1000, "startTime": "2025-10-10T10:00:00Z", "endTime": "2025-10-10T12:00:00Z", "carId": "<carId>" }`

3) Start an auction
- Method: PATCH
- URL: `/api/v1/auction/status/:auctionId`

4) Place a bid
- Method: POST
- URL: `/api/v1/auction/placeBids`
- Body: `{ "bidAmount": 1500, "auctionId": "<auctionId>", "dealerId": "<dealerId>" }`

5) Get the highest bid for an auction
- Method: GET
- URL: `/api/v1/auction/:auctionId/winner-bid`

Testing with curl (example)

```bash
# create a car
curl -X POST http://localhost:3000/api/v1/auction/createCar \
  -H "Content-Type: application/json" \
  -d '{"make":"Toyota","model":"Camry","year":"2020"}'
```

Common troubleshooting

- Server doesn't start / connection errors:
  - Ensure `MONGO_URL` in `.env` is correct and MongoDB is running.

- 400 responses for missing fields:
  - Check request JSON keys (use `Content-Type: application/json`).

- E11000 duplicate key error for `timePlaced` when placing bids:
  - Cause: a unique index was created on `timePlaced` (likely unintentionally). Documents with `timePlaced: null` will conflict.
  - Fix:
    1) Confirm `timePlaced` in `model/bid.model.js` is defined with `default: Date.now` and not `unique: true`.
    2) Drop the index from your database:

```js
use <your-db-name>
db.bids.dropIndex('timePlaced_1')
```

    3) Restart the server and re-run place bid requests.

If you prefer a small script to drop the index, I can add `scripts/drop-bid-time-index.js` that connects using `MONGO_URL` and drops the index safely.

Contributing
- Open issues or PRs for bugs or feature requests.

License
- ISC

# Car Auction System

Basic Node.js + Express + Mongoose project for a simple car auction API.

## Setup

1. Copy `.env.example` to `.env` and update values if necessary:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start a MongoDB server locally (example using Homebrew-installed MongoDB):

```bash
brew services start mongodb-community
```

4. Start the app:

```bash
npm start
```

## Test the createCar endpoint

POST http://localhost:3000/api/v1/auction/createCar

Headers:
- Content-Type: application/json

Body (JSON):

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": "2020"
}
```

Expected: 201 Created with the created car object.

API Endpoints:

1 . POST /api/v1/auction/createAuction - Creates a new auction.

 

2 . PATCH /api/v1/auction /status/{auctionId} - Starts an auction.

 

3 . GET /api/v1/auction /{auctionId}/winner-bid - Retrieves information about a specific auction highest bid, and the dealer who placed it.

 

4 . POST /api/v1/auction /placeBids - Allows a dealer to place a bid on an auction.

 

5 . POST /api/v1/auction / token- Allows a user to generate token with static username: Admin and static password: Admin and use this generated token to run all api’s.

 

Rest of the details about Data Models, Database Schema are enclosed in given below pdf
