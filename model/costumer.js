import mongoose from "mongoose";

const costumerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // fecha: {
    //   type: Date,
    //   required: true,
    //   default: Date.now(),
    // },
    email: {
      type: String,
      required: true,
    },
    machines: {
      type: Array,
      required: true,
    }
    // veterinario: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Veterinario",
    // },
  },
  {
    timestamps: true,
  }
);

const Costumer = mongoose.model("costumers", costumerSchema);

export default Costumer;
