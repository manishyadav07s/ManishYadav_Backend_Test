import express from "express";
import multer from "multer";
import { uploadFile, downloadFile } from "../controllers/fileController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:id", downloadFile);

export default router;
