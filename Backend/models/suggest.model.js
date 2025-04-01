import mongoose from "mongoose";

const suggestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
},{ timestamps: true })

export const suggestModel = mongoose.models.suggest || mongoose.model('suggest', suggestSchema)