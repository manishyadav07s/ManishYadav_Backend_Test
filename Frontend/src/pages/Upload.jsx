import { useState } from "react";
import api from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Choose a file");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const { data } = await api.post("/file/upload", fd, { headers: { "Content-Type": "multipart/form-data" }});
      setLink(data.link);
      setMsg("Uploaded! Link emailed to you.");
    } catch (e) {
      setMsg(e.response?.data?.error || "Error");
    }
  };

  const openLink = async () => {
    try {
      const id = link.split("/").pop();
      const { data } = await api.get(`/file/download/${id}`);
      window.open(data.fileURL, "_blank");
    } catch (e) {
      setMsg(e.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload a file</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            type="submit"
          >
            Upload
          </button>
        </form>
        {link && (
          <div className="mt-6">
            <p className="text-sm text-gray-700 mb-2">Download Link (expires in 1 hour):</p>
            <code className="block bg-gray-100 p-2 rounded mb-2 break-all">{link}</code>
            <button
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              onClick={openLink}
            >
              Open File
            </button>
          </div>
        )}
        {msg && (
          <p className="mt-4 text-center text-sm text-blue-600">{msg}</p>
        )}
      </div>
    </div>
    );
}