import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // ✅ Fixed spelling
        },
        description: {
            type: String,
            required: true, // ✅ Fixed spelling
        },
        location: {
            type: String,
        },
        bedrooms: {
            type: String,
        },
        bathrooms: {
            type: String,
        },
        image: {
            type: String,
            required: true, 
        },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Ensure this is present

    },
    { timestamps: { createdAt: "created_time", updatedAt: "modified_time" } }
);

export const Property = mongoose.model("property", propertySchema);
