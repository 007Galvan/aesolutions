import mongoose from "mongoose";

const summarySchema = mongoose.Schema(
  {
    idActivity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    }
},
  {
    timestamps: true,
  }
);

const Summary = mongoose.model("summary", summarySchema);

export default Summary;
