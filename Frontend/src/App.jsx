import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display:"flex", gap:12 }}>
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </BrowserRouter>
  );
}
