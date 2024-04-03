import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const communitySchema = new Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    n_propie: {
      type: Number,
    },
    n_inquilinos: {
      type: Number,
    },
    cuota_actual: {
      type: Number,
    },
    ahorro: {
      type: Number,
    },
    fondos_iniciales: {
      type: Number,
    },
    anios: {
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
    gastos: {
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
      type: ObjectId,
      ref: 'User',

    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const communityModel = model('Community', communitySchema);

export default communityModel;
