import mongoose from "mongoose";
const cardanoPriceSchema = mongoose.Schema({
    time_period_start: String,
    time_period_end: String,
    time_open: String,
    time_close: String,
    price_open: Number,
    price_high: Number,
    price_low: Number,
    price_close: Number,
    volume_traded: Number,
    trades_count: Number
})