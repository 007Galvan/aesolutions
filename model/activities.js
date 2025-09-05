import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    nameActivity: {
      type: String,
      required: true,
    },
    descriptionActivity: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    notification: {
        type: String,
        required: true,
      },
    // fecha: {
    //   type: Date,
    //   required: true,
    //   default: Date.now(),
    // },
   costumers: {
      type: Array,
      required: true,
    },
    machines: {
        type: Array,
        required: true,
      },
      managers: {
        type: Array,
        required: true,
      },
      datesOfActivity:{
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

const Activity = mongoose.model("activities", activitySchema);

export default Activity;