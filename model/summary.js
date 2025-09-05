import mongoose from "mongoose";
import { type } from "os";

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
    },
    signature:{
      type: String,
      required: false,
      default: ''
    }, 
    nameSign: {
      type: String,
      required: false,
      defult: ''
    },
    pdf: {
      title: { type: String },
      pdf: { type: String },
      createdAt: { type: Date, default: Date.now },
    }
},
  {
    timestamps: true,
  }
);

const Summary = mongoose.model("summary", summarySchema);

export default Summary;
