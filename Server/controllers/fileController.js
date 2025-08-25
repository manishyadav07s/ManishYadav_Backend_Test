import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";
import sendEmail from "../utils/sendEmail.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "fileshare",
    });

    const expiryTime = new Date(Date.now() + 60 * 60 * 1000);
    const file = await File.create({
      filename: req.file.originalname,
      fileURL: uploaded.secure_url,
      uploadedBy: req.user._id,
      expiryTime,
    });

    const link = `${process.env.BASE_URL}/api/file/download/${file._id}`;


    await sendEmail(req.user.email, link);

    res.json({ message: "File uploaded", link, fileId: file._id, expiryTime });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    if (new Date() > file.expiryTime) {
      return res.status(403).json({ error: "Link expired" });
    }

    file.downloadCount += 1;
    await file.save();

    res.json({ fileURL: file.fileURL, downloadCount: file.downloadCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
