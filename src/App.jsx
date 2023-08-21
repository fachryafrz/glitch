import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      {/* <Navbar /> */}

      <main>
        <h1 className={`sr-only`}>GameCove</h1>
        <Routes>
          <Route path={`/`} element={<Home />} />
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
