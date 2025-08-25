import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename : {type:String},
    fileURL : {type:String},
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiryTime: Date,
   downloadCount: { type: Number, default: 0 },

})

const File = mongoose.model("File", fileSchema);
export default File;

