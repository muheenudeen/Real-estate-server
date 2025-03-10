import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
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
    },
    ownershipStatus: {
      type: String,
      enum: ["Single", "Joint"], 
    },
    availabilityStatus: {
      type: String,
      enum: ["Ready to move", "Under construction"], 
    },
    ageOfProperty: {
      type: String,
      enum: ["0-1", "1-5", "5-10", "10+"],
    },
    preferredTo: {
      type: String,
      enum: ["Family", "Bachelor", "Anyone"], 
    },
    balconies: {
      type: String,
      default: 0
    },
    furnishingStatus: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
     },
    powerBackup: {
      type: String,
      enum: ["Full", "Partial", "None"], 
    },
    roadAccessibility: {
      type: String,
      enum: ["Heavy vehicle", "Light vehicle", "No vehicle access"],
     },
    totalFloors: {
      type: String,
    },
    floorNo: {
      type: String,
    },
    propertyFacing: {
      type: String
    },
    reservedParking: { 
      type: Boolean,
       default: false },
    openParking: { 
      type: Boolean,
       default: false },
    coveredParking: { 
      type: Boolean,
       default: false },
    waterSource: {
      type: [String],
      enum: ["Municipal Corporation", "Borewell", "24*7 Water"]
    },
    location: {
      state: {
        type: String,
        },
      district: {
        type: String,
        },
      city: {
        type: String,
        },
      locality: {
        type: String,
        },
      zipCode: {
        type: String,
        },
      landmark: {
        type: String
      },
      fullAddress: {
        type: String,
        },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
