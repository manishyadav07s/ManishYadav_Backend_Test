import { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMsg("Registered! Please login.");
    } catch (e) {
      setMsg(e.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            type="submit"
          >
            Register
          </button>
        </form>
        {msg && (
          <p className="mt-4 text-center text-sm text-green-600">{msg}</p>
        )}
      </div>
    </div>
    );
}