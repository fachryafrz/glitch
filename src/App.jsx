import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      <main>
        <Routes>
          <Route path={`/`} element={<h1>Home</h1>} />
          <Route path={`/detail`} element={<h1>Detail</h1>} />
          <Route path={`/search`} element={<h1>Search</h1>} />
        </Routes>
      </main>

      {/* Footer */}
      <footer></footer>

      {/* Copyright */}
    </Router>
  );
}
