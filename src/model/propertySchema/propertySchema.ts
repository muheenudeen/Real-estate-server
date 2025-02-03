import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    image: { type: String, required: true },
    ownershipStatus: { type: String, enum: ["Single", "Joint"], required: true },
    availabilityStatus: { type: String, enum: ["Ready to move", "Under construction"], required: true },
    ageOfProperty: { type: String, enum: ["0-1", "1-5", "5-10", "10+"], },
    preferredTo: { type: String, enum: ["Family", "Bachelor", "Anyone"], required: true },
    balconies: { type: String, default: 0 },
    furnishingStatus: { type: String, enum: ["Furnished", "Semi-Furnished", "Unfurnished"], required: true },
    powerBackup: { type: String, enum: ["Full", "Partial", "None"], required: true },
    roadAccessibility: { type: String, enum: ["Heavy vehicle", "Light vehicle", "No vehicle access"], required: true },
    totalFloors: { type: String, required: true },
    floorNo: { type: String, required: true },
    propertyFacing: { type: String },
    reservedParking: { type: Boolean, default: false },
    openParking: { type: Boolean, default: false },
    coveredParking: { type: Boolean, default: false },
    waterSource: { 
      type: [String], 
      enum: ["Municipal Corporation", "Borewell", "24*7 Water"] 
    },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      locality: { type: String, required: true },
      zipCode: { type: String, required: true },
      landmark: { type: String },
      fullAddress: { type: String, required: true },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true } 
);

export const Property = mongoose.model("Property", propertySchema);
