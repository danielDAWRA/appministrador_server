import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const communitySchema = new Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    propertyCount: {
      type: Number,
    },
    tenantCount: {
      type: Number,
    },
    currentFee: {
      type: Number,
    },
    savings: {
      type: Number,
    },
    initialFunds: {
      type: Number,
    },
    years: {
      type: Number,
    },
    president: {
      name: {
        type: String,
      },
      mobileNumber: {
        type: Number,
      },
    },
    expenses: {
      electricity: {
        type: Number,
      },
      water: {
        type: Number,
      },
      locksmith: {
        type: Number,
      },
      cleaning: {
        type: Number,
      },
      administration: {
        type: Number,
      },
      maintenance: {
        type: Number,
      },
    },
    administrator: {
      type: String,
    },
    image: {
      type: String,
    },
    owners: [
      {
        type: String,
        required: [true, 'At least one owner must be added to the community.'],
      },
    ],
    incidences: [
      {
        type: ObjectId,
        ref: 'Incidence',
      },
    ],
  },
  { timestamps: true },
);

const communityModel = model('Community', communitySchema);

export default communityModel;
