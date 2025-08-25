import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename : {type:String},
    fileUrl : {type:String},
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiryTime: Date,
   downloadCount: { type: Number, default: 0 },

})

export default mongoose.model("File", fileSchema);