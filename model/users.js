import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
     job:{
        type :String,
        required: true,
     }
     
      // veterinario: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Veterinario",
      // },
},{
    timestamps: true,
  }
);




const User = mongoose.model("users", userSchema);

export default User;