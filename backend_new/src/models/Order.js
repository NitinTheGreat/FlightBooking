import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    flightDetails: {
      flightNumber: String,
      departure: String,
      arrival: String,
      departureTime: Date,
      arrivalTime: Date,
    },
    passengerDetails: {
      name: String,
      email: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order

